import { 
    obtenerLocalidades, buscarPartidos, actualizarPartidoPolitico, 
    borrarPartidoPolitico, insertarPartidoPolitico, buscarCandidatos,
    actualizarCandidato, borrarCandidato, insertarCandidato, buscarUsuarios,  
    buscarCiudadano, buscarLocalidad, buscarPartido, buscarElecciones,
    insertarEleccion, borrarEleccion, actualizarEleccion,
    buscarUsuariosNoCandidatos
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
                <h2>Numero de Candidato</h2>
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
                <h2>Numero de Candidato</h2>
                <select id="numeroCandidatoSelect">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <div class="buttonModalSide">
                    <button id="anadirCiudadano">Añadir Candidato</button>
                    <button id="borrarCiudadano">Borrar</button>
                    <button id="actualizarCiudadano">Modificar</button>
                </div>
            </div>
        </div>
    `;

    let contentInsert = document.getElementById('contentInsert');
    let insertarCandidatoBtn = document.getElementById('insertarCandidato');
    let cerrarModal = document.getElementById('cerrarModal');
    let modal = document.getElementById('modal');
    let back = document.getElementById('back');

    // OBTENIENDO LOS PARAMETROS DEL MODAL
    let idUsuarioInput = document.getElementById('idUsuario');
    let numeroCandidatoSelect = document.getElementById('numeroCandidatoSelect');
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

    insertarCandidatoBtn.addEventListener("click", () => {
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

        anadirCandidatoBtn.replaceWith(anadirCandidatoBtn.cloneNode(true));
        anadirCandidatoBtn = document.getElementById("anadirCiudadano"); // Reasignar el nuevo botón sin eventos previos

        anadirCandidatoBtn.addEventListener("click", async () => {
            let idUsuario = idUsuarioInput.value;
            let idPartido = partidoSelect.value;
            let idLocalidad = localidadesSelect.value;
            let numeroCandidato = numeroCandidatoSelect.value;

            if (!idUsuario || !idPartido || !idLocalidad) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            let nuevoCandidato = await insertarCandidato(idUsuario, idPartido, idLocalidad, numeroCandidato).then(data => {
                return data;
            });

            setTimeout(() => {
                modal.classList.add("noVisible");
                candidatos(mainTitle)
            }, 250);

        });
    });

    cerrarModal.addEventListener("click", () => {
        modal.classList.add('noVisible');
    });

    back.addEventListener("click", () => {
        adminMenuShow(mainTitle);
    });

    async function crearInterfazCandidatos(candidato) {

        let nombrePartido = await buscarPartido(candidato.idPartido).then(data => {
            return data;
        });

        let nombreLocalidad = await buscarLocalidad(candidato.idLocalidad).then(data => {
            return data;
        });

        let elementoPadre = document.createElement('div');
        elementoPadre.dataset.id = candidato.idCandidato;
        elementoPadre.classList.add('ciudadano');

        let idCandidato = document.createElement('p');
        idCandidato.textContent = candidato.idCandidato;

        let numeroCandidato = document.createElement('p');
        numeroCandidato.textContent = candidato.numeroCandidato;

        let idUsuario = document.createElement('p');
        idUsuario.textContent = candidato.idUsuario;

        let partido = document.createElement('p');
        partido.textContent = nombrePartido; // Asumiendo que tienes el nombre del partido en los datos

        let localidad = document.createElement('p');
        localidad.textContent = nombreLocalidad; // Asumiendo que tienes el nombre de la localidad

        elementoPadre.appendChild(idCandidato);
        elementoPadre.appendChild(idUsuario);
        elementoPadre.appendChild(partido);
        elementoPadre.appendChild(localidad);
        elementoPadre.appendChild(numeroCandidato);
        contentInsert.appendChild(elementoPadre);

        elementoPadre.addEventListener("click", () => {

            partidoSelect.innerHTML = "";
            localidadesSelect.innerHTML = "";
            idUsuarioInput.innerHTML = "";

            cargarPartidos(partidoSelect);
            cargarLocalidades(localidadesSelect);
            cargarUsuarios(idUsuarioInput).then(() => {
                modal.classList.remove('noVisible');
                idUsuarioInput.value = candidato.idUsuario;
                partidoSelect.value = candidato.idPartido;
                localidadesSelect.value = candidato.idLocalidad;
            });

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
                let actualizado = await actualizarCandidato(candidato.idCandidato, idUsuarioInput.value, partidoSelect.value, localidadesSelect.value, numeroCandidatoSelect.value);
                if (actualizado.success) {
                    alert("Candidato actualizado correctamente");
                    modal.classList.add("noVisible");
                    contentInsert.innerHTML = "";
                    let candidatosActualizados = await buscarCandidatos();
                    candidatosActualizados.forEach(candidato => crearInterfazCandidatos(candidato));
                }
            });

            anadirCandidatoBtn.addEventListener("click", async () => {

                let idUsuario = idUsuarioInput.value;
                let idPartido = partidoSelect.value;
                let idLocalidad = localidadesSelect.value;

                if (!idUsuario || !idPartido || !idLocalidad) {
                    alert('Por favor, completa todos los campos.');
                    return;
                }

                let nuevoCandidato = await insertarCandidato(idUsuario, idPartido, idLocalidad);

            })

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

    let modalContainer = document.getElementById('modalContainer');

    mainTitle.innerHTML = `
        <button class="back" id="back">Atrás</button>

        <div class="busquedaCiudadanos" id="busquedaCiudadanos">
                <div class="ciudadano" id="preFix">
                    <h2>idEleccion</h2>
                    <h2>Tipo</h2>
                    <h2>Estado</h2>
                    <h2>Fecha Inicio</h2>
                    <h2>Fecha Fin</h2>
                </div>
                <div class="contentInsert" id="contentInsert"></div>
            </div>
            <div class="actionButtons">
                <button id="insertarCiudadano" class="anadirCiudadano">Insertar</button>
            </div>
        </div>
    `

    modalContainer.innerHTML = `
        <div id="modal" class="noVisible">
            <button id="cerrarModal" class="closeButton"><img src="../img/cross.svg" alt=""></button>
            <div class="ciudadanoModal" id="modalContent">
                <div style="display: flex; gap: 30px;">
                    <div style="width: 50%;">
                        <h2>Tipo</h2>
                        <select id="tipo">
                            <option value="autonomica">Autonómica</option>
                            <option value="general">General</option>
                        </select>
                    </div>
                    <div style="width: 50%;">
                        <h2>Estado</h2>
                        <select id="estado">
                            <option value="abierta">Abierta</option>
                            <option value="cerrada">Cerrada</option>
                            <option value="finalizada">Finalizada</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 30px;">
                    <div style="width: 50%;">
                        <h2>Fecha Inicio</h2>
                        <input type="date" id="fechainicio" autocomplete="off">
                    </div>
                    <div style="width: 50%;">
                        <h2>Fecha Fin</h2>
                        <input type="date" id="fechafin" autocomplete="off">
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

    let insertarEleccionBtn = document.getElementById('insertarCiudadano');
    let back = document.getElementById('back');
    let contentInsert = document.getElementById('contentInsert');
    let modal = document.getElementById('modal');
    let cerrarModal = document.getElementById('cerrarModal');
    let anadirEleccionBtn = document.getElementById('anadirCiudadano');
    let borrarEleccionBtn = document.getElementById('borrarCiudadano');
    let actualizarEleccionBtn = document.getElementById('actualizarCiudadano');
    let fechaInicioModal = document.getElementById('fechainicio');
    let fechaFinModal = document.getElementById('fechafin');
    let tipoModal = document.getElementById('tipo');
    let estadoModal = document.getElementById('estado');

    crearInterfazElecciones()


    insertarEleccionBtn.addEventListener("click", () => {

        fechaInicioModal.value = "";
        fechaFinModal.value = "";
        tipoModal.value = "";
        estadoModal.value = "";

        modal.classList.remove("noVisible");
        borrarEleccionBtn.style.display = "none";
        actualizarEleccionBtn.style.display = "none";
        anadirEleccionBtn.style.display = "block";

        anadirEleccionBtn.addEventListener("click", async () => {

            let tipo = document.getElementById('tipo').value;
            let estado = document.getElementById('estado').value;
            let fechaInicio = document.getElementById('fechainicio').value;
            let fechafin = document.getElementById('fechafin').value;

            console.log(tipo, estado, fechaInicio, fechafin)

            if(!tipo || !estado || !fechaInicio || !fechafin){
                alert('Por favor, completa todos los campos.');
                return;
            }

            insertarEleccion(tipo, estado, fechaInicio, fechafin);

            setTimeout(() => {
                modal.classList.add("noVisible");
                crearInterfazElecciones();
            }, 250);

        })

    })
    
    // PARA VOLVER AL MENU DE ADMINISTRADOR
    back.addEventListener("click", () => {
        adminMenuShow(mainTitle);
    });

    // PARA CERRAR EL MODAL
    cerrarModal.addEventListener("click", () => {
        modal.classList.add('noVisible');
    });

    async function crearInterfazElecciones(){
        
        contentInsert.innerHTML = ""

        let elecciones = await buscarElecciones().then(data => {
            return data;
        });

        if(elecciones.length > 0){

            elecciones.forEach(eleccion => {

                let elementoPadre = document.createElement('div');
                elementoPadre.dataset.id = eleccion.idEleccion;
                elementoPadre.classList.add('ciudadano');
                
                let idEleccion = document.createElement('p');
                idEleccion.textContent = eleccion.idEleccion;
    
                let tipo = document.createElement('p');
                tipo.textContent = eleccion.tipo;
    
                let estado = document.createElement('p');
                estado.textContent = eleccion.estado;
    
                let fechaInicio = document.createElement('p');
                fechaInicio.textContent = eleccion.fechaInicio;
    
                let fechaFin = document.createElement('p');
                fechaFin.textContent = eleccion.fechaFin;
    
                elementoPadre.appendChild(idEleccion);
                elementoPadre.appendChild(tipo);
                elementoPadre.appendChild(estado);
                elementoPadre.appendChild(fechaInicio);
                elementoPadre.appendChild(fechaFin);

                elementoPadre.addEventListener("click", () => {

                    tipoModal.value = eleccion.tipo;
                    estadoModal.value = eleccion.estado;
                    fechaInicioModal.value = eleccion.fechaInicio;
                    fechaFinModal.value = eleccion.fechaFin;

                    borrarEleccionBtn.style.display = "block";
                    actualizarEleccionBtn.style.display = "block";
                    anadirEleccionBtn.style.display = "none";

                    modal.classList.remove('noVisible');

                    // BORRAR ELECCION
                    borrarEleccionBtn.addEventListener("click", () => {
                        borrarEleccion(eleccion.idEleccion);
                        setTimeout(() => {
                            modal.classList.add("noVisible");
                            crearInterfazElecciones();
                        }, 250);
                    })

                    // ACTUALIZAR ELECCION
                    actualizarEleccionBtn.addEventListener("click", () => {
                        actualizarEleccion(eleccion.idEleccion, tipoModal.value, estadoModal.value, fechaInicioModal.value, fechaFinModal.value);
                        setTimeout(() => {
                            modal.classList.add("noVisible");
                            crearInterfazElecciones();
                        }, 250);
                    })

                });
    
                contentInsert.appendChild(elementoPadre);
    
            })

        }else{
            contentInsert.innerHTML = `<p>No hay elecciones :(</p>`;
        }

    }

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