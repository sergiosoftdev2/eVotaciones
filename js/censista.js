import {

    obtenerComunidades, obtenerLocalidades, buscarCiudadano,
    borrarCiudadano, actualizarCiudadano, insertarCiudadano,
    buscarLocalidad, buscarCiudadanosPorComunidad,
    buscarCiudadanosPorLocalidad, obtenerLocalidadesComunidad

} from "./api.js"

document.addEventListener('DOMContentLoaded', () => {

    let comunidades = document.getElementById('comunidades');
    let localidades = document.getElementById('localidadesComunidad');
    const censista = document.getElementById('busquedaCiudadanos');
    const contentInsert = document.getElementById('contentInsert');

    if(sessionStorage.getItem('rol') != 'censista'){
        window.location.href = "/eVotaciones/vistas/login.html";
    }else if (sessionStorage.getItem('rol') == 'censista') {
        
        let modal = document.getElementById('modal');
        let cerrarModal = document.getElementById('cerrarModal');

        cerrarModal.addEventListener('click', () => {
            modal.classList.add("noVisible")
        });
        modal.classList.add("noVisible")

        const insertarCiudadano = document.getElementById('insertarCiudadano');
        insertarCiudadano.addEventListener('click', () => {
            modalCiudadano();
        });

        mostrarCenso()

        // PARA BUSCAR LAS COMUNIDADES
        obtenerComunidades().then(response => {
            response.forEach(comunidad => {
                let comunidadOption = document.createElement('option');
                comunidadOption.value = comunidad.idComunidad;
                comunidadOption.textContent = comunidad.nombre;
                comunidades.appendChild(comunidadOption);
            });
        })

        // PARA BUSCAR LAS LOCALIDADES POR COMUNIDAD
        comunidades.addEventListener('change', async () => {

            if (comunidades.value == "") {
                localidades.setAttribute("disabled", "disabled");
                localidades.innerHTML = "";
                contentInsert.innerHTML = "";
                mostrarCenso()
                return;
            }else{
                let ciudadanosComunidad = buscarCiudadanosPorComunidad(comunidades.value);
                ciudadanosComunidad.then(ciudadanos => {
                    contentInsert.innerHTML = "";
                    if(ciudadanos.length > 0){
                        ciudadanos.forEach(ciudadano => {
                            crearInterfaz(ciudadano);
                        });
                    }else{
                        let noCiudadanos = document.createElement('p');
                        noCiudadanos.textContent = "No hay ciudadanos en esta localidad";
                        contentInsert.appendChild(noCiudadanos);
                    }
                })
            }

            localidades.innerHTML = "";
            let comunidadSeleccionada = comunidades.value;
            let misLocalidades = await obtenerLocalidadesComunidad(comunidadSeleccionada);

            localidades.removeAttribute("disabled");

            misLocalidades.forEach(localidad => {
                let localidadOption = document.createElement('option');
                localidadOption.value = localidad.idLocalidad;
                localidadOption.textContent = localidad.nombre;
                localidades.appendChild(localidadOption);
            });
        });

        // PARA BUSCAR LOS CIUDADANOS POR LOCALIDAD
        localidades.addEventListener('change', () => {
            let localidadSeleccionada = localidades.value;
            let misCiudadanosLocalidad = buscarCiudadanosPorLocalidad(localidadSeleccionada);
            misCiudadanosLocalidad.then(ciudadanos => {
                contentInsert.innerHTML = "";
                if(ciudadanos.length > 0){
                    ciudadanos.forEach(ciudadano => {
                        crearInterfaz(ciudadano);
                    });
                }else{
                    let noCiudadanos = document.createElement('p');
                    noCiudadanos.textContent = "No hay ciudadanos en esta localidad";
                    contentInsert.appendChild(noCiudadanos);
                }
            });
        });

    }

});

function mostrarCenso(){
    fetch("../api/SELECT/censo.php", {
        method: 'POST',
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        return response.json();
    }).then(async datos => {

        for (let index = 0; index < datos.length; index++) {
            await new Promise(resolve => {
                setTimeout(() => {
                    crearInterfaz(datos[index]);
                    resolve();
                }, 1 * index);
            });
        }

    }).catch(error => {
        console.log(error);
    });
}

async function crearInterfaz(element){

    const censista = document.getElementById('busquedaCiudadanos');
    const contentInsert = document.getElementById('contentInsert');

    let crearDivPadre = document.createElement('div');
    crearDivPadre.classList.add('ciudadano');

    let idCenso = document.createElement('p');
    idCenso.textContent = element.idCenso;

    let dni = document.createElement('p');
    dni.textContent = element.dni;

    let nombre = document.createElement('p');
    nombre.textContent = element.nombre;

    let apellidos = document.createElement('p');
    apellidos.textContent = element.apellido;

    let email = document.createElement('p');
    email.textContent = element.email;
    email.classList.add("email");

    let fecha = document.createElement('p');
    fecha.textContent = element.fechaNacimiento;

    let idLocalidad = document.createElement('p');
    idLocalidad.textContent = await buscarLocalidad(element.idLocalidad);
    idLocalidad.classList.add("localidad");

    crearDivPadre.appendChild(idCenso);
    crearDivPadre.appendChild(dni);
    crearDivPadre.appendChild(nombre);
    crearDivPadre.appendChild(apellidos);
    crearDivPadre.appendChild(email);
    crearDivPadre.appendChild(fecha);
    crearDivPadre.appendChild(idLocalidad);


    crearDivPadre.dataset.idcenso = element.idCenso;
    contentInsert.appendChild(crearDivPadre);

    crearDivPadre.addEventListener('click', () => {
        modalCiudadano(element.idCenso);
    });
    
}

async function modalCiudadano(idCenso){

    let modal = document.getElementById('modal');
    let modalContent = document.getElementById('modalContent');
    let listaLocalidades = document.getElementById('localidades');
    let anadirCiudadano = document.getElementById('anadirCiudadano');
    let borrarCiudadanoButton = document.getElementById('borrarCiudadano');
    let actualizarCiudadanoButton = document.getElementById('actualizarCiudadano');

    let misLocalidades = obtenerLocalidades().then(datos => {
        datos.forEach(element => {
            let nombreLocalidad = document.createElement('option');
            nombreLocalidad.textContent = element.nombre;
            nombreLocalidad.value = element.idLocalidad;
            nombreLocalidad.classList.add("localidad");
            localidades.appendChild(nombreLocalidad);
        });
    })
    let miCiudadano = await buscarCiudadano(idCenso);

    modal.classList.remove("noVisible")
    modalContent.style.marginBottom = "0px";

    if(idCenso != undefined){
        
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let dni = document.getElementById('dni');
        let email = document.getElementById('email');
        let fecha = document.getElementById('fecha');
        let localidad = document.getElementById('localidades');

        dni.setAttribute("disabled", true);
        dni.style.backgroundColor = "#AAA";
        nombre.value = miCiudadano.nombre;
        apellido.value = miCiudadano.apellido;
        dni.value = miCiudadano.dni;
        email.value = miCiudadano.email;
        fecha.value = miCiudadano.fechaNacimiento;
        localidad.value = miCiudadano.idLocalidad;

        anadirCiudadano.style.display = "none";
        borrarCiudadanoButton.style.display = "block";
        actualizarCiudadanoButton.style.display = "block";

        borrarCiudadanoButton.addEventListener('click', async () => {
            
            if(nombre.value == "" || apellido.value == "" || dni.value == "" || email.value == "" || fecha.value == "" || localidad.value == ""){
                alert("Todos los campos son obligatorios");
                return;
            }
            
            let borrado = await borrarCiudadano(idCenso);
            if(borrado.success){
                alert("Ciudadano borrado correctamente");
                window.location.reload()
            }
        })

        actualizarCiudadanoButton.addEventListener('click', async () => {

            if(nombre.value == "" || apellido.value == "" || dni.value == "" || email.value == "" || fecha.value == "" || localidad.value == ""){
                alert("Todos los campos son obligatorios");
                return;
            }

            let actualizado = await actualizarCiudadano(idCenso, dni.value, nombre.value, apellido.value, email.value, fecha.value, localidad.value);
            if(actualizado.success){
                alert("Ciudadano actualizado correctamente");
                window.location.reload()
            }
        });
        

        
    }else{

        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let dni = document.getElementById('dni');
        let email = document.getElementById('email');
        let fecha = document.getElementById('fecha');
        let localidad = document.getElementById('localidades');

        dni.removeAttribute("disabled");
        dni.style.backgroundColor = "#FFF";

        nombre.value = ""
        apellido.value = "";
        dni.value = "";
        email.value = "";
        fecha.value = "";
        localidad.value = ""

        anadirCiudadano.style.display = "block";
        borrarCiudadanoButton.style.display = "none";
        actualizarCiudadanoButton.style.display = "none";

        anadirCiudadano.addEventListener('click', () => {

            if(nombre.value == "" || apellido.value == "" || dni.value == "" || email.value == "" || fecha.value == "" || localidad.value == ""){
                alert("Todos los campos son obligatorios");
                return;
            }
            
            insertarCiudadano(dni.value, nombre.value, apellido.value, email.value, fecha.value, localidad.value).then(data => {
                console.log(data);
            });
            
        });
    }

}