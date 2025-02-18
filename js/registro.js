
import { buscarUsuario, comprobarPersona } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    let registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', registrarse);
    }
});


async function registrarse(event){

    event.preventDefault()
    
    let dni = document.getElementById('dni');
    let contrasena = document.getElementById('contrasena');

    const formData = new FormData();

    let idCenso = await comprobarPersona(dni.value);
    
    // COMPROBACION DE SI EL USUARIO ESTA REGISTRADO
    let busquedaUsuario = await buscarUsuario(idCenso.idCenso);
    if(busquedaUsuario.length > 0){
        alert('Este usuario ya está registrado');
        return;
    }
    
    formData.append('dni', idCenso.idCenso);
    formData.append('contrasena', contrasena.value);

    
    
    
    if(idCenso.ok == false){
        alert('No estás en el censo');
        return;
    }else{
        
        fetch("../api/registro.php", {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        })
        .then(datos => {
            console.log(datos);
            window.location.href = './login.html';
        })
        .catch(error => {
            console.log(error);
        });
    }

    

}