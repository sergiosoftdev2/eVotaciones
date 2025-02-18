
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

export async function comprobarPersona(dni) {
    let respuesta = {
        idCenso: 0,
        ok: false
    };

    const formData = new FormData();
    formData.append('dni', dni);

    try {
        const response = await fetch("../api/SELECT/buscarCiudadanoDNI.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        respuesta = {
            idCenso: datos[0].idCenso || 0,
            ok: true
        };

    } catch (error) {
        console.log(error);
    }

    return respuesta;
}

export async function buscarUsuario(idCenso){

    let formData = new FormData();
    formData.append('idCenso', idCenso);

    try {
        const response = await fetch("../api/SELECT/buscarUsuario.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos;

    } catch (error) {
        console.log(error);
    }

}