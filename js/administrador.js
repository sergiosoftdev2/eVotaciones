import { 
    obtenerLocalidades, buscarPartidos, actualizarPartidoPolitico, 
    borrarPartidoPolitico, insertarPartidoPolitico, buscarCandidatos,
    actualizarCandidato, borrarCandidato, insertarCandidato, buscarUsuarios,  
    buscarCiudadano
} from "./api.js";

document.addEventListener("DOMContentLoaded", function() {

    let mainTitle = document.getElementById('mainTitle');
    adminMenuShow(mainTitle);

});


async function candidatos(mainTitle) {
    let modalContainer = document.getElementById('modalContainer');

    mainTitle.innerHTML = `
        <button class="back" id="back">Atrás</button>
        <div class="busquedaCiudadanos" id="busquedaCiudadanos">
            <div class="ciudadano" id="preFix">
                <h2>idCandidato</h2>
                <h2>idUsuario</h2>
                <h2>Partido</h2>
                <h2>Localidad</h2>
            </div>
            <div class="contentInsert" id="contentInsert"></div>
        </div>
        <div class="actionButtons">
            <button id="insertarCandidato" class="anadirCiudadano">Insertar</button> </div>
    `;

    modalContainer.innerHTML = `
        <div id="modal" class="noVisible">
            <button id="cerrarModal" class="closeButton"><img src="../img/cross.svg" alt=""></button>
            <div class="ciudadanoModal" id="modalContent">
                <div style="display: flex; gap: 30px;">
                    <div style="width: 50%;">
                        <h2>idUsuario</h2>
                        <select id="idUsuario"></select>
                    </div>
                    <div style="width: 50%;">
                        <h2>Partido Político</h2>
                        <select id="partidoSelect"></select> </div>
                </div>
                <h2>Localidad</h2>
                <select id="localidadesSelect"></select>
                <div class="buttonModalSide">
                    <button id="anadirCiudadano">Añadir Candidato</button>
                    <button id="borrarCiudadano">Borrar</button>
                    <button id="actualizarCiudadano">Modificar</button>
                </div>
            </div>
        </div>
    `;

    let contentInsert = document.getElementById('contentInsert');
    let insertarCandidato = document.getElementById('insertarCandidato');
    let cerrarModal = document.getElementById('cerrarModal');
    let modal = document.getElementById('modal');
    let back = document.getElementById('back');

    // Obtén los elementos del modal *DESPUÉS* de insertarlo en el DOM
    let idUsuarioInput = document.getElementById('idUsuario');
    let partidoSelect = document.getElementById('partidoSelect');
    let localidadesSelect = document.getElementById('localidadesSelect');
    let anadirCandidatoBtn = document.getElementById('anadirCiudadano');
    let borrarCandidatoBtn = document.getElementById('borrarCiudadano');
    let actualizarCandidatoBtn = document.getElementById('actualizarCiudadano');


    let candidatosData = await buscarCandidatos();
    if (candidatosData.length > 0) {
        candidatosData.forEach(candidato => {
            crearInterfazCandidatos(candidato);
        });
    } else {
        contentInsert.innerHTML = `<p>No hay candidatos :(</p>`;
    }

    insertarCandidato.addEventListener("click", () => {
        modal.classList.remove("noVisible");
        // Restablecer valores del modal
        idUsuarioInput.value = '';
        partidoSelect.value = '';
        localidadesSelect.value = '';

        // Carga los partidos en el select
        cargarPartidos(partidoSelect);
        cargarLocalidades(localidadesSelect);
        cargarUsuarios(idUsuarioInput);

        anadirCandidatoBtn.style.display = "block";
        borrarCandidatoBtn.style.display = "none";
        actualizarCandidatoBtn.style.display = "none";

        anadirCandidatoBtn.addEventListener("click", async () => {
            let idUsuario = idUsuarioInput.value;
            let idPartido = partidoSelect.value;
            let idLocalidad = localidadesSelect.value;

            if (!idUsuario || !idPartido || !idLocalidad) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            let nuevoCandidato = await insertarCandidato(idUsuario, idPartido, idLocalidad);
            if (nuevoCandidato.success) { // Asumiendo que tu respuesta JSON tiene una propiedad 'success'
                modal.classList.add("noVisible");
                contentInsert.innerHTML = ""; // Limpia la lista y vuelve a cargar los candidatos
                let candidatosActualizados = await buscarCandidatos();
                candidatosActualizados.forEach(candidato => crearInterfazCandidatos(candidato));
            } else {
                alert("Error al insertar candidato. Verifica los datos.");
            }
        });
    });

    cerrarModal.addEventListener("click", () => {
        modal.classList.add('noVisible');
    });

    back.addEventListener("click", () => {
        adminMenuShow(mainTitle);
    });

    function crearInterfazCandidatos(candidato) {
        let elementoPadre = document.createElement('div');
        elementoPadre.dataset.id = candidato.idCandidato;
        elementoPadre.classList.add('ciudadano');

        let idCandidato = document.createElement('p');
        idCandidato.textContent = candidato.idCandidato;

        let idUsuario = document.createElement('p');
        idUsuario.textContent = candidato.idUsuario;

        let partido = document.createElement('p');
        partido.textContent = candidato.nombrePartido; // Asumiendo que tienes el nombre del partido en los datos

        let localidad = document.createElement('p');
        localidad.textContent = candidato.nombreLocalidad; // Asumiendo que tienes el nombre de la localidad

        elementoPadre.appendChild(idCandidato);
        elementoPadre.appendChild(idUsuario);
        elementoPadre.appendChild(partido);
        elementoPadre.appendChild(localidad);
        contentInsert.appendChild(elementoPadre);

        elementoPadre.addEventListener("click", () => {
            modal.classList.remove('noVisible');
            idUsuarioInput.value = candidato.idUsuario;
            partidoSelect.value = candidato.idPartido;
            localidadesSelect.value = candidato.idLocalidad;

            anadirCandidatoBtn.style.display = "none";
            borrarCandidatoBtn.style.display = "block";
            actualizarCandidatoBtn.style.display = "block";

            borrarCandidatoBtn.addEventListener("click", async () => {
                let borrado = await borrarCandidato(candidato.idCandidato);
                if (borrado.success) {
                    alert("Candidato borrado correctamente");
                    modal.classList.add("noVisible");
                    contentInsert.innerHTML = "";
                    let candidatosActualizados = await buscarCandidatos();
                    candidatosActualizados.forEach(candidato => crearInterfazCandidatos(candidato));
                }
            });

            actualizarCandidatoBtn.addEventListener("click", async () => {
                let actualizado = await actualizarCandidato(candidato.idCandidato, idUsuarioInput.value, partidoSelect.value, localidadesSelect.value);
                if (actualizado.success) {
                    alert("Candidato actualizado correctamente");
                    modal.classList.add("noVisible");
                    contentInsert.innerHTML = "";
                    let candidatosActualizados = await buscarCandidatos();
                    candidatosActualizados.forEach(candidato => crearInterfazCandidatos(candidato));
                }
            });
        });
    }

    async function cargarPartidos(selectElement) {
        let partidos = await buscarPartidos();
        partidos.forEach(partido => {
            let option = document.createElement('option');
            option.value = partido.idPartido;
            option.text = partido.nombre;
            selectElement.appendChild(option);
        });
    }

    async function cargarLocalidades(selectElement) {
        let localidades = await obtenerLocalidades();
        localidades.forEach(localidad => {
            let option = document.createElement('option');
            option.value = localidad.idLocalidad;
            option.text = localidad.nombre;
            selectElement.appendChild(option);
        });
    }

    async function cargarUsuarios() {
        let usuarios = await buscarUsuarios();
        usuarios.forEach(usuario => {
            let option = document.createElement('option');
            option.value = usuario.idUsuario;
            option.text = usuario.nombre;
            usuariosSelect.appendChild(option);
        });
    }

    async function cargarUsuarios(usuariosSelect) {
        let usuarios = await buscarUsuarios();
        for (const usuario of usuarios) {
            let miCiudadano = await buscarCiudadano(usuario.idCenso);
            if (miCiudadano && miCiudadano.length > 0) {
                let option = document.createElement('option');
                option.value = usuario.idUsuario;
                option.text = miCiudadano[0].dni;
                usuariosSelect.appendChild(option);
            } else {
                console.error('No se encontraron datos para el usuario:', usuario);
            }
        }
    }    
    
}


async function escrutinios(mainTitle){
    mainTitle.innerHTML = `
    
        <button class="back" id="back">Atrás</button>

        <div class="busquedaCiudadanos" id="busquedaCiudadanos">
                <div class="ciudadano" id="preFix">
                    <h2>idCandidato</h2>
                    <h2>idUsuario</h2>
                    <h2>Partido</h2>
                    <h2>Localidad</h2>
                </div>
                <div class="contentInsert" id="contentInsert"></div>
            </div>
            <div class="actionButtons">
                <button id="insertarCiudadano" class="anadirCiudadano">Insertar</button>
            </div>
        </div>
    
    `

    let back = document.getElementById('back');
    back.addEventListener("click", () => {
        adminMenuShow(mainTitle);
    });
}

async function elecciones(mainTitle){
    mainTitle.innerHTML = `
    
        <button class="back" id="back">Atrás</button>

        <div class="busquedaCiudadanos" id="busquedaCiudadanos">
                <div class="ciudadano" id="preFix">
                    <h2>idCandidato</h2>
                    <h2>idUsuario</h2>
                    <h2>Partido</h2>
                    <h2>Localidad</h2>
                </div>
                <div class="contentInsert" id="contentInsert"></div>
            </div>
            <div class="actionButtons">
                <button id="insertarCiudadano" class="anadirCiudadano">Insertar</button>
            </div>
        </div>
    
    `

    let back = document.getElementById('back');
    back.addEventListener("click", () => {
        adminMenuShow(mainTitle);
    });
}

async function partidos(mainTitle){

    let modalContainer = document.getElementById('modalContainer');

    mainTitle.innerHTML = `
        <button class="back" id="back">Atrás</button>
        <div class="busquedaCiudadanos" id="busquedaCiudadanos">
            <div class="ciudadano" id="preFix">
                <h2>idPartido</h2>
                <h2>Nombre</h2>
                <h2>Siglas</h2>
            </div>
            <div class="contentInsert" id="contentInsert"></div>
        </div>
        <div class="actionButtons">
            <button id="insertarPartido" class="anadirCiudadano">Insertar</button>
        </div>
    `;

    modalContainer.innerHTML = `
        <div id="modal" class="noVisible">
            <button id="cerrarModal" class="closeButton"><img src="../img/cross.svg" alt=""></button>
            <div class="ciudadanoModal" id="modalContent">
                <div style="display: flex; gap: 30px;">
                    <div style="width: 50%;">
                        <h2>Siglas</h2>
                        <input type="text" id="siglasPartido" autocomplete="off">
                    </div>
                    <div style="width: 50%;">
                        <h2>Nombre</h2>
                        <input type="text" id="nombrePartido" autocomplete="off">
                    </div>
                </div>
                <div class="buttonModalSide">
                    <button id="anadirCiudadano">Añadir Partido</button>
                    <button id="borrarCiudadano">Borrar</button>
                    <button id="actualizarCiudadano">Modificar</button>
                </div>
            </div>
        </div>
    `;

    // Obtén los elementos *DESPUÉS* de que se han añadido al DOM:
    let borrarPartido = document.getElementById('borrarCiudadano');
    let actualizarPartido = document.getElementById('actualizarCiudadano');
    let anadirPartido = document.getElementById('anadirCiudadano');
    let insertarPartido = document.getElementById('insertarPartido');
    let modal = document.getElementById('modal');
    let cerrarModal = document.getElementById('cerrarModal');
    let contentInsert = document.getElementById('contentInsert'); // Obtén contentInsert aquí también
    let back = document.getElementById('back');

    // BUSQUEDA Y MUESTRA DE LOS DATOS EN PANTALLA
    let buscarPartidosPoliticos = await buscarPartidos().then(data => {
        contentInsert.innerHTML = ''; // Limpia el contenido antes de agregar nuevos elementos
        data.forEach(element => {
            crearInterfazPartidos(element)
        });
    });
    
    // ABRE EL MODAL PARA INSERTAR UN NUEVO PARTIDO
    insertarPartido.addEventListener("click", () => {

        let anadirPartido = document.getElementById('anadirCiudadano');

        anadirPartido.style.display = 'block';
        borrarPartido.style.display = 'none';
        actualizarPartido.style.display = 'none';

        modal.classList.remove('noVisible');

        let siglasPartido = document.getElementById('siglasPartido');
        let nombrePartido = document.getElementById('nombrePartido');

        siglasPartido.value = '';
        nombrePartido.value = '';
        

        anadirPartido.addEventListener("click", async () => {
            
            let siglas = siglasPartido.value;
            let nombre = nombrePartido.value;
            
            if(siglas.trim() === '' || nombre.trim() === '') {
                alert('Por favor, completa todos los campos.');
                return;
            }else{
                insertarPartidoPolitico(nombre, siglas);
                setTimeout(() => {
                    partidos(mainTitle);
                }, 250);
            }
            
        })

    })

    // BOTON DE CIERRE DEL MODAL
    cerrarModal.addEventListener("click", () => {
        modal.classList.add('noVisible');
    })

    // BOTON PARA VOLVER AL MENU DE ADMINISTRADOR
    back.addEventListener("click", () => {
        adminMenuShow(mainTitle);
    });

    function crearInterfazPartidos(element){

        let elementoPadre = document.createElement('div');

        elementoPadre.dataset.id = element.idPartido;
        elementoPadre.classList.add('ciudadano');

        let idPartido = document.createElement('p');
        idPartido.innerHTML = element.idPartido;

        let nombrePartido = document.createElement('p');
        nombrePartido.innerHTML = element.nombre;

        let siglasPartido = document.createElement('p');
        siglasPartido.innerHTML = element.siglas;
        
        elementoPadre.appendChild(idPartido);
        elementoPadre.appendChild(nombrePartido);
        elementoPadre.appendChild(siglasPartido);

        // EVENTO PARA PODER ACTUALIZAR Y BORRAR
        elementoPadre.addEventListener("click", () => {

            modal.classList.remove('noVisible');

            let nombre = document.getElementById('nombrePartido');
            let siglas = document.getElementById('siglasPartido');

            borrarPartido.style.display = 'block';
            actualizarPartido.style.display = 'block';
            anadirPartido.style.display = 'none';

            siglas.value = element.siglas;
            nombre.value = element.nombre;

            borrarPartido.addEventListener("click", () => {
                borrarPartidoPolitico(element.idPartido)
                setTimeout(() => {
                    partidos(mainTitle)
                }, 250);
            })

            actualizarPartido.addEventListener("click", () => {
                actualizarPartidoPolitico(element.idPartido, nombre.value, siglas.value)
                setTimeout(() => {
                    partidos(mainTitle)
                }, 250);
            })

        })

        contentInsert.appendChild(elementoPadre);

    }
}

function adminMenuShow(mainTitle){

    mainTitle.innerHTML = `
        <h1>Panel de administrador</h1>
        <div class="admin">
            <div id="gestionCandidatos" class="adminPanels">
                <h2>Candidatos</h2>
            </div>
            <div id="gestionPartidos" class="adminPanels">
                <h2>Partidos</h2>
            </div>
            <div id="gestionElecciones" class="adminPanels">
                <h2>Elecciones</h2>
            </div>
            <div id="gestionEscrutinios" class="adminPanels">
                <h2>Escrutinios</h2>
            </div>
        </div>
    `

    let gestionCandidaatos = document.getElementById('gestionCandidatos');
    let gestionPartidos = document.getElementById('gestionPartidos');
    let gestionElecciones = document.getElementById('gestionElecciones');
    let gestionEscrutinios = document.getElementById('gestionEscrutinios');

    gestionCandidaatos.addEventListener("click", function() {
        candidatos(mainTitle);
    });

    gestionPartidos.addEventListener("click", function() {
        partidos(mainTitle);
    });

    gestionEscrutinios.addEventListener("click", function() {
        escrutinios(mainTitle);
    });

    gestionElecciones.addEventListener("click", function() {
        elecciones(mainTitle);
    });

}