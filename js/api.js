export async function buscarPartidos() {
    try {
        const response = await fetch("../api/SELECT/buscarPartidos.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }
}

export async function buscarPartido(idPartido) {
    let formData = new FormData();
    formData.append('idPartido', idPartido);

    try {
        const response = await fetch("../api/SELECT/buscarPartido.php", {
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
        return "";
    }
}

export async function borrarPartidoPolitico(idPartido) {
    let formData = new FormData();
    formData.append('partido', idPartido);

    try {
        const response = await fetch("../api/DELETE/borrarPartido.php", {
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

export async function actualizarPartidoPolitico(idPartido, nombre, siglas, logo){
    let formData = new FormData();
    formData.append('idPartido', idPartido);
    formData.append('nombre', nombre);
    formData.append('siglas', siglas);
    formData.append('logo', logo);

    console.log(nombre, siglas)

    try {
        const response = await fetch("../api/UPDATE/actualizarPartido.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        console.log(datos)
        return datos;
    
    } catch (error) {
        console.log(error);
    }

}

export async function insertarPartidoPolitico(nombre, siglas, logo) {
    let formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('siglas', siglas);
    formData.append('logo', logo);

    try {
        const response = await fetch("../api/INSERT/insertarPartido.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const datos = await response.json();
        return datos;
    } catch (error) {
        console.error("Error en la petición:", error);
        return { success: false, error: error.message };
    }
}


export async function buscarCandidatos() {
    try {
        const response = await fetch("../api/SELECT/buscarCandidatos.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }

}

export async function borrarCandidato(idCandidato) {
    let formData = new FormData();
    formData.append('candidato', idCandidato);

    try {
        const response = await fetch("../api/DELETE/borrarCandidato.php", {
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

export async function actualizarCandidato(idCandidato, idUsuario, idPartido, idLocalidad, numeroCandidato, eleccionAsociada){
    let formData = new FormData();
    formData.append('idPartido', idPartido);
    formData.append('idCandidato', idCandidato);
    formData.append('idUsuario', idUsuario);
    formData.append('idLocalidad', idLocalidad);
    formData.append('numeroCandidato', numeroCandidato);
    formData.append('eleccionAsociada', eleccionAsociada);

    try {
        const response = await fetch("../api/UPDATE/actualizarCandidato.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        console.log(datos)
        return datos;
    
    } catch (error) {
        console.log(error);
    }

}

export async function insertarCandidato(idUsuario, idPartido, idLocalidad, numeroCandidato, eleccionAsociada){

    console.log(idUsuario, idPartido, idLocalidad, numeroCandidato, eleccionAsociada)

    let formData = new FormData();
    formData.append('idUsuario', idUsuario);
    formData.append('idPartido', idPartido);
    formData.append('idLocalidad', idLocalidad);
    formData.append('eleccionAsociada', eleccionAsociada);
    formData.append('numeroCandidato', numeroCandidato);

    fetch("../api/INSERT/insertarCandidato.php", {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        return response.json();
    }).then(datos => {
        return datos;
    }).catch(error => {
        console.log(error);
    });

}

export async function buscarLocalidad(idLocalidad) {
    let formData = new FormData();
    formData.append('idLocalidad', idLocalidad);

    try {
        const response = await fetch("../api/SELECT/buscarLocalidad.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos[0].nombre;

    } catch (error) {
        console.log(error);
        return "";
    }
}

export async function obtenerLocalidades(){

    try {
        const response = await fetch("../api/SELECT/buscarLocalidades.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }


}

export async function insertarCiudadano(dni, nombre, apellido, email, fechaNacimiento, idLocalidad){
    let formData = new FormData();
    formData.append('dni', dni);
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('fecha', fechaNacimiento);
    formData.append('localidad', idLocalidad);

    fetch("../api/INSERT/insertarCiudadano.php", {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        return response.json();
    }).then(datos => {
        if(datos.success){
            window.location.reload()
        }
    }).catch(error => {
        console.log(error);
    });

}

export async function actualizarCiudadano(idCenso, dni, nombre, apellido, email, fechaNacimiento, idLocalidad){
    
    let formData = new FormData();
    formData.append('idCenso', idCenso);
    formData.append('dni', dni);
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('fechaNacimiento', fechaNacimiento);
    formData.append('idLocalidad', idLocalidad);
    try {
        const response = await fetch("../api/UPDATE/actualizarCiudadano.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        console.log(datos)
        return datos;
        window.location.reload()
    
    } catch (error) {
        console.log(error);
    }

}

export async function borrarCiudadano(idCenso){
    let formData = new FormData();
    formData.append('idCenso', idCenso);

    try {
        const response = await fetch("../api/DELETE/borrarCiudadano.php", {
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

export async function buscarCiudadano(idCenso) {
    let formData = new FormData();
    formData.append('idCenso', idCenso);

    try {
        const response = await fetch("../api/SELECT/buscarCiudadano.php", {
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
        return null;
    }
}

export async function obtenerComunidades() {
    try {
        const response = await fetch("../api/SELECT/buscarComunidades.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function obtenerLocalidadesComunidad(idComunidad){

    let formData = new FormData();
    formData.append('comunidad', idComunidad);

    try {
        const response = await fetch("../api/SELECT/buscarLocalidadComunidad.php", {
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
        return "";
    }
}

export async function buscarCiudadanosPorLocalidad(idLocalidad){
    let formData = new FormData();
    formData.append('localidad', idLocalidad);
    try {
        const response = await fetch("../api/SELECT/buscarCiudadanosLocalidad.php", {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const datos = await response.json();
        return datos;


    }catch (error) {
        console.log(error);
        return [];
    }
}

export async function buscarCiudadanosPorComunidad(idComunidad){
    let formData = new FormData();
    formData.append('comunidad', idComunidad);
    try {
        const response = await fetch("../api/SELECT/buscarCiudadanosComunidad.php", {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const datos = await response.json();
        return datos;

    }catch (error) {
        console.log(error);
        return [];
    }

}

export function comprobarSesion(){
    if(sessionStorage.getItem('idUsuario')){
        return true
    }else{
        return false
    }
}

export function anadirSesion(idUsuario, idCenso, rol){
    try {
        sessionStorage.setItem('idUsuario', idUsuario);
        sessionStorage.setItem('idCenso', idCenso);
        sessionStorage.setItem('rol', rol);
        console.log("Sesión guardada:", {
            idUsuario: sessionStorage.getItem('idUsuario'),
            idCenso: sessionStorage.getItem('idCenso'),
            rol: sessionStorage.getItem('rol')
        });
    } catch (error) {
        console.error("Error al guardar sesión:", error);
    }
}

export function cerrarSesion(){
    sessionStorage.removeItem('idUsuario');
    sessionStorage.removeItem('idCenso');
    sessionStorage.removeItem('rol');
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
            idCenso: datos || 0,
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

export async function buscarUsuarios(){

    try {
        const response = await fetch("../api/SELECT/buscarUsuarios.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }

}

export async function buscarDNICandidato(idUsuario){
    let formData = new FormData();
    formData.append('idUsuario', idUsuario);

    try {
        const response = await fetch("../api/SELECT/buscarDNICandidato.php", {
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

export async function buscarCandidato(idCandidato){
    let formData = new FormData();
    formData.append('idCandidato', idCandidato);

    try {
        const response = await fetch("../api/SELECT/buscarCandidato.php", {
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

export async function buscarElecciones() {

    try {
        const response = await fetch("../api/SELECT/buscarElecciones.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }

}

export async function insertarEleccion(tipo, estado, fechainicio, fechafin){
    let formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('estado', estado);
    formData.append('fechainicio', fechainicio);
    formData.append('fechafin', fechafin);

    fetch("../api/INSERT/insertarEleccion.php", {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        return response.json();
    }).then(datos => {
        return datos;
    }).catch(error => {
        console.log(error);
    });

}

export async function borrarEleccion(idEleccion){
    let formData = new FormData();
    formData.append('idEleccion', idEleccion);

    try {
        const response = await fetch("../api/DELETE/borrarEleccion.php", {
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

export async function actualizarEleccion(idEleccion, tipo, estado, fechaInicio, fechaFin){
    
    let formData = new FormData();
    formData.append('idEleccion', idEleccion);
    formData.append('tipo', tipo);
    formData.append('estado', estado);
    formData.append('fechaInicio', fechaInicio);
    formData.append('fechaFin', fechaFin);

    try {
        const response = await fetch("../api/UPDATE/actualizarEleccion.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        console.log(datos)
        return datos;
    
    } catch (error) {
        console.log(error);
    }

}

export async function buscarUsuariosNoCandidatos(){
    try {
        const response = await fetch("../api/SELECT/buscarUsuariosNoCandidatos.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }
}

export async function buscarEleccionesAbiertas(){

    try {
        const response = await fetch("../api/SELECT/buscarEleccionesAbiertas.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }

}

export async function buscarEleccionesFinalizadas(){

    try {
        const response = await fetch("../api/SELECT/buscarEleccionesFinalizadas.php", {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }

}

export async function buscarUsuarioVotado(idUsuario, idEleccion){

    let formData = new FormData();
    formData.append('idUsuario', idUsuario);
    formData.append('idEleccion', idEleccion);

    try {
        const response = await fetch("../api/SELECT/buscarEleccionesUsuarioVotado.php", {
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

export async function insertarUsuarioHaVotado(idEleccion, idUsuario){

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);
    formData.append('idUsuario', idUsuario);

    try {
        const response = await fetch("../api/INSERT/insertarUsuarioHaVotado.php", {
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

export async function insertarVotoGenerales(idEleccion, idPartido, idLocalidad){

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);
    formData.append('idPartido', idPartido);

    if(idLocalidad == undefined){
        idLocalidad = 0;
    }

    formData.append('idLocalidad', idLocalidad);

    try {
        const response = await fetch("../api/INSERT/insertarVotoGenerales.php", {
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

export async function insertarVotoAutonomicas(idEleccion, idPartido, idLocalidad){

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);
    formData.append('idPartido', idPartido);
    formData.append('idLocalidad', idLocalidad);

    try {
        const response = await fetch("../api/INSERT/insertarVotoGenerales.php", {
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

export async function buscarVotosEleccion(idEleccion){

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);

    try {
        const response = await fetch("../api/SELECT/buscarVotosEleccion.php", {
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

export async function votosPorLocalidadEleccion(idEleccion) {

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);

    try {
        const response = await fetch("../api/SELECT/votosPorLocalidad.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }

}

export async function votosPorPartidoEleccion(idEleccion, idLocalidad) {

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);

    if(idLocalidad){
        console.log(idLocalidad)
        formData.append('idLocalidad', idLocalidad);
    }

    try {
        const response = await fetch("../api/SELECT/votosPorPartido.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }

}

export async function votosPorCandidato(idEleccion, idLocalidad) {

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);
    formData.append('idLocalidad', idLocalidad);

    try {
        const response = await fetch("../api/SELECT/votosPorCandidato.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = await response.json();
        return datos; // Retorna los datos aquí, dentro de la función asíncrona

    } catch (error) {
        console.error("Error en buscarPartidos:", error); // Usa console.error para errores
        return null; // O un valor que indique un error, como un array vacío []
    }

}

export async function enviarCorreo(emailDestinatario, nombreDestinatario, asunto, mensaje) {
    let formData = new FormData();
    formData.append('emailDestinatario', emailDestinatario);
    formData.append('nombreDestinatario', nombreDestinatario);
    formData.append('asunto', asunto);
    formData.append('mensaje', mensaje);

    try {
        const response = await fetch("../api/correo.php", {
            method: 'POST',
            body: formData
        });

        // Log the response text to inspect the content
        const text = await response.text();
        console.log("Response text:", text);

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const datos = JSON.parse(text);  // Manually parse the response
        return datos;

    } catch (error) {
        console.log("Error:", error);
    }
}

export async function actualizarCorreo(idCenso, email){
    let formData = new FormData();
    formData.append('idCenso', idCenso);
    formData.append('mail', email);

    try {
        const response = await fetch("../api/UPDATE/actualizarEmail.php", {
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

export async function borrarUsuario(idCenso) {
    let formData = new FormData();
    formData.append('idCenso', idCenso);

    try {
        const response = await fetch("../api/DELETE/borrarUsuario.php", {
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

export async function buscarCandidatosAutonomicasPartido(idEleccion, idLocalidad, idPartido){

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);
    formData.append('idLocalidad', idLocalidad);
    formData.append('idPartido', idPartido);

    try {
        const response = await fetch("../api/SELECT/buscarCandidatosAutonomicasPartido.php", {
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

export async function buscarCandidatosAutonomicas(idEleccion, idLocalidad){

    let formData = new FormData();
    formData.append('idEleccion', idEleccion);
    formData.append('idLocalidad', idLocalidad);

    try {
        const response = await fetch("../api/SELECT/buscarCandidatosAutonomicas.php", {
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

export async function buscarEscanos(){
    let formData = new FormData();
    try {
        const response = await fetch("../api/SELECT/buscarEscanos.php", {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const datos = await response.json();
        return datos;
    }catch (error) {
        console.log(error);
        return false;
    }
}

export async function insertarEscano(idLocalidad, numeroEscanos) {
    let formData = new FormData();
    formData.append('idLocalidad', idLocalidad);
    formData.append('numeroEscanos', numeroEscanos);
    try {
        const response = await fetch("../api/INSERT/insertarEscano.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const datos = await response.json();
        return datos;
    } catch (error) {
        console.error("Error en la petición:", error);
        return { success: false, error: error.message };
    }
}

export async function borrarEscano(idLocalidad){
    let formData = new FormData();
    formData.append('idLocalidad', idLocalidad);
    try {
        const response = await fetch("../api/DELETE/borrarEscano.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const datos = await response.json();
        return datos;
    }catch (error) {
        console.log(error);
    }
}

export async function actualizarEscanos(idLocalidad, numeroEscanos){
    let formData = new FormData();
    formData.append('idLocalidad', idLocalidad);
    formData.append('numeroEscanos', numeroEscanos);

    try {
        const response = await fetch("../api/UPDATE/actualizarEscano.php", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const datos = await response.json();
        return datos;
    }catch (error) {
        console.log(error);
    }
}

export async function buscarLocalidadesEscanos(){
    let formData = new FormData();
    try {
        const response = await fetch("../api/SELECT/buscarLocalidadesEscanos.php", {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const datos = await response.json();
        return datos;
    }catch (error) {
        console.log(error);
        return false;
    }
}



export async function obtenerEscanosComunidad(idComunidad){
    let formData = new FormData();
    formData.append('comunidad', idComunidad);
    try {
        const response = await fetch("../api/SELECT/buscarEscanosComunidad.php", {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const datos = await response.json();
        return datos;

    }catch (error) {
        console.log(error);
        return [];
    }

}

export async function obtenerEscanosLocalidad(idLocalidad){
    let formData = new FormData();
    formData.append('idLocalidad', idLocalidad);
    try {
        const response = await fetch("../api/SELECT/buscarEscanosLocalidad.php", {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const datos = await response.json();
        return datos;

    }catch (error) {
        console.log(error);
        return [];
    }

}

export async function obtenerAlcalde(idLocalidad, idEleccion, idPartido){
    let formData = new FormData();
    formData.append('idLocalidad', idLocalidad);
    formData.append('idEleccion', idEleccion);
    formData.append('idPartido', idPartido);

    console.log(idLocalidad, idEleccion, idPartido);

    try {
        const response = await fetch("../api/SELECT/buscarAlcalde.php", {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const datos = await response.json();
        return datos;

    }catch (error) {
        console.log(error);
        return [];
    }
}