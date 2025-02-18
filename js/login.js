import { comprobarPersona ,anadirSesion, cerrarSesion } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {

    let cerrarSesionButton = document.getElementById("cerrarSesion");
    let loginForm = document.getElementById('loginForm');

    if(cerrarSesionButton){
        cerrarSesionButton.addEventListener('click', cerrarSesion);
    }

    
    if (loginForm) {
        loginForm.addEventListener('submit', iniciarSesion);
    }
    

})

async function iniciarSesion(event){
    
    event.preventDefault()

    let dni = document.getElementById('dni').value;
    let contrasena = document.getElementById('contrasena');

    const formData = new FormData();
    let idCenso = await comprobarPersona(dni);

    formData.append('idCenso', idCenso.idCenso);
    formData.append('contrasena', contrasena.value);

    if(idCenso.ok == false){
        alert('No estás en el censo');
        return;
    }else{
        
        fetch("../api/login.php", {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        })
        .then(datos => {
            if(datos.success){
                datos = datos.datos[0]
                cerrarSesion()
                anadirSesion(datos.idUsuario, idCenso.idCenso, datos.rol);
                if(datos.rol == 'administrador'){
                    window.location.href = "/eVotaciones/vistas/administrador.html";
                }else if(datos.rol == 'votante'){
                    window.location.href = "/eVotaciones/vistas/votantes.html";
                }else if(datos.rol == "censista"){
                    window.location.href = "/eVotaciones/vistas/censista.html";
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    }


}