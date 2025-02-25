import { 
    obtenerLocalidades, buscarPartidos, actualizarPartidoPolitico, 
    borrarPartidoPolitico, insertarPartidoPolitico, buscarCandidatos,
    actualizarCandidato, borrarCandidato, insertarCandidato, buscarUsuarios,  
    buscarCiudadano, buscarLocalidad, buscarPartido, buscarElecciones,
    insertarEleccion, borrarEleccion, actualizarEleccion,
    buscarUsuariosNoCandidatos,
    buscarEleccionesFinalizadas
} from "./api.js";

document.addEventListener("DOMContentLoaded", function() {

    let mainTitle = document.getElementById('mainTitle');
    
    if(sessionStorage.getItem("rol") == "administrador"){
        adminMenuShow(mainTitle);
    }else{
        window.location.href = "/eVotaciones/vistas/login.html";
    }

    

});


async function candidatos(mainTitle) {
    let modalContainer = document.getElementById('modalContainer');
    mainTitle.classList.add("adminPanel");

    mainTitle.innerHTML = `
        
        
        <div class="actionButtons">
            <button class="back" id="back"><img src="/eVotaciones/img/back.svg">Atrás</button>
            <button id="insertarCandidato"><img src="/eVotaciones/img/plus.svg">Insertar</button> 
        </div>
        
        <div class="busquedaCiudadanos" id="busquedaCiudadanos">
            <div class="ciudadano" id="preFix">
                <h2>idCandidato</h2>
                <h2>idUsuario</h2>
                <h2>Partido</h2>
                <h2>Localidad</h2>
                <h2>Numero de Candidato</h2>
                <h2>Eleccion Asociada</h2>
            </div>
            <div class="contentInsert" id="contentInsert"></div>
        </div>
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
                <div style="display: flex; gap: 30px;">
                    <div style="width: 50%;">
                        <h2>Numero de Candidato</h2>
                        <select id="numeroCandidatoSelect">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div style="width: 50%;">
                        <h2>Elección Asociada</h2>
                        <select id="eleccionAsociada"></select> </div>
                </div>
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
    let eleccionAsociada = document.getElementById('eleccionAsociada')
    let numeroCandidatoSelect = document.getElementById('numeroCandidatoSelect');
    let partidoSelect = document.getElementById('partidoSelect');
    let localidadesSelect = document.getElementById('localidadesSelect');
    let anadirCandidatoBtn = document.getElementById('anadirCiudadano');
    let borrarCandidatoBtn = document.getElementById('borrarCiudadano');
    let actualizarCandidatoBtn = document.getElementById('actualizarCiudadano');


    let candidatosData = await buscarCandidatos();
    if (candidatosData.length > 0) {
        contentInsert.innerHTML = ''; // Limpia el contenido antes de agregar nuevos elementos
        
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
        idUsuarioInput.innerHTML = ""
        localidadesSelect.value = '';

        // Carga los partidos en el select
        cargarPartidos(partidoSelect);
        cargarLocalidades(localidadesSelect);
        cargarUsuarios(idUsuarioInput);
        cargarElecciones(eleccionAsociada)


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
            let eleccionAsociadaValue = eleccionAsociada.value;

            if (!idUsuario || !idPartido || !idLocalidad || !eleccionAsociadaValue) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            let nuevoCandidato = await insertarCandidato(idUsuario, idPartido, idLocalidad, numeroCandidato, eleccionAsociadaValue).then(data => {
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
            return data[0].logo;
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

        let eleccionAsociadaContainer = document.createElement('p');
        eleccionAsociadaContainer.textContent = candidato.eleccionAsociada;

        let idUsuario = document.createElement('p');
        idUsuario.textContent = candidato.idUsuario;

        let partido = document.createElement('img');
        partido.src = nombrePartido; // Asumiendo que tienes el nombre del partido en los datos

        let localidad = document.createElement('p');
        localidad.textContent = nombreLocalidad; // Asumiendo que tienes el nombre de la localidad

        elementoPadre.appendChild(idCandidato);
        elementoPadre.appendChild(idUsuario);
        elementoPadre.appendChild(partido);
        elementoPadre.appendChild(localidad);
        elementoPadre.appendChild(numeroCandidato);
        elementoPadre.appendChild(eleccionAsociadaContainer);
        contentInsert.appendChild(elementoPadre);

        elementoPadre.addEventListener("click", () => {

            modal.classList.remove("noVisible");

            partidoSelect.innerHTML = "";
            localidadesSelect.innerHTML = "";
            idUsuarioInput.innerHTML = "";

            cargarPartidos(partidoSelect).then(() => {
                partidoSelect.value = candidato.idPartido;
            });
            cargarLocalidades(localidadesSelect).then(() => {
                localidadesSelect.value = candidato.idLocalidad;
            });

            cargarElecciones().then(() => {
                eleccionAsociada.value = candidato.eleccionAsociada;
            });

            idUsuarioInput.innerHTML = `<option>${candidato.idUsuario}</option>`;
            numeroCandidatoSelect.value = candidato.numeroCandidato;

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
        let selectElement = document.getElementById("idUsuario"); // Get the existing select

        // Clear existing options (important!)
        selectElement.innerHTML = "";

        let usuarios = await buscarUsuariosNoCandidatos().then(async data => {

            data.forEach(async usuario => {
                let miCiudadano = await buscarCiudadano(usuario.idCenso).then(ciudadano => {  
                    return ciudadano[0];
                });

                let option = document.createElement('option');
                option.value = usuario.idUsuario;
                option.text = `${miCiudadano.nombre} ${miCiudadano.apellido} - ${miCiudadano.dni}`;

                selectElement.appendChild(option);

            })
        });
    }
     
    async function cargarElecciones(){
        let eleccionAsociada = document.getElementById('eleccionAsociada');
        eleccionAsociada.innerHTML = "";

        let elecciones = await buscarElecciones().then(data => {
            data.forEach(eleccion => {
                let option = document.createElement('option');
                option.value = eleccion.idEleccion;
                option.text = eleccion.idEleccion;
                eleccionAsociada.appendChild(option);
            })
        });
    }
    
}

async function elecciones(mainTitle){

    let modalContainer = document.getElementById('modalContainer');

    mainTitle.classList.add("adminPanel");

    mainTitle.innerHTML = `

        <div class="actionButtons">
            <button class="back" id="back"><img src="/eVotaciones/img/back.svg">Atrás</button>
            <button id="insertarCiudadano"><img src="/eVotaciones/img/plus.svg">Insertar</button> 
        </div>

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
                            <option value="cerrada">Cerrada</option>
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

            if(!tipo || !estado || !fechaInicio || !fechafin){
                alert('Por favor, completa todos los campos.');
                return;
            }

            insertarEleccion(tipo, estado, fechaInicio, fechafin);
            modal.classList.add('noVisible');
            crearInterfazElecciones()

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

        let elecciones = await buscarElecciones().then(data => {
            return data;
        });

        contentInsert.innerHTML = ""

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

    mainTitle.classList.add("adminPanel");

    mainTitle.innerHTML = `

        <div class="actionButtons">
            <button class="back" id="back"><img src="/eVotaciones/img/back.svg">Atrás</button>
            <button id="insertarPartido"><img src="/eVotaciones/img/plus.svg">Insertar</button> 
        </div>

        <div class="busquedaCiudadanos" id="busquedaCiudadanos">
            <div class="ciudadano" id="preFix">
                <h2>idPartido</h2>
                <h2>Nombre</h2>
                <h2>Siglas</h2>
                <h2>Logo</h2>
            </div>
            <div class="contentInsert" id="contentInsert"></div>
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
                <h2><em>Logo*</em></h2>
                <input type="text" id="logoPartido" autocomplete="off" placeholder="URL del logo">
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
    let buscarPartidosPoliticos = await buscarPartidos().then(async (data) => { 
        contentInsert.innerHTML = ''; // Limpia el contenido antes de agregar nuevos elementos
        
        data.forEach(partido => {
            crearInterfazPartidos(partido);
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
        let logoPartido = document.getElementById('logoPartido');

        siglasPartido.value = '';
        nombrePartido.value = '';
        logoPartido.value = '';
        

        anadirPartido.addEventListener("click", async () => {
            
            let siglas = siglasPartido.value;
            let nombre = nombrePartido.value;
            let logo = logoPartido.value;
            
            if(siglas.trim() === '' || nombre.trim() === '') {
                alert('Por favor, completa todos los campos.');
                return;
            }else{
                insertarPartidoPolitico(nombre, siglas, logo).then(data => {
                    if(data.success == false){
                        alert("El Partido Político ya existe");
                    }
                });
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

        let logoPartido = document.createElement('img');
        logoPartido.src = element.logo;
        
        elementoPadre.appendChild(idPartido);
        elementoPadre.appendChild(nombrePartido);
        elementoPadre.appendChild(siglasPartido);
        elementoPadre.appendChild(logoPartido);

        // EVENTO PARA PODER ACTUALIZAR Y BORRAR
        elementoPadre.addEventListener("click", () => {

            modal.classList.remove('noVisible');

            let nombre = document.getElementById('nombrePartido');
            let siglas = document.getElementById('siglasPartido');
            let logo = document.getElementById('logoPartido');

            borrarPartido.style.display = 'block';
            actualizarPartido.style.display = 'block';
            anadirPartido.style.display = 'none';

            siglas.value = element.siglas;
            nombre.value = element.nombre;
            logo.value = element.logo;

            borrarPartido.addEventListener("click", () => {
                if(confirm("¿Quieres eliminar este partido político?")){
                    borrarPartidoPolitico(element.idPartido)
                    setTimeout(() => {
                        partidos(mainTitle)
                    }, 250);
                }else{
                    return;
                }
            })

            actualizarPartido.addEventListener("click", () => {
                if(confirm("¿Quieres actualizar este partido político?")){
                    actualizarPartidoPolitico(element.idPartido, nombre.value, siglas.value, logo.value)
                    setTimeout(() => {
                        partidos(mainTitle)
                    }, 250);
                }
            })

        })

        contentInsert.appendChild(elementoPadre);

    }
}

async function escrutinios(mainTitle){

    let modalContainer = document.getElementById('modalContainer');

    mainTitle.classList.add("adminPanel");

    mainTitle.innerHTML = `

        <div class="actionButtons">
            <button class="back" id="back"><img src="/eVotaciones/img/back.svg">Atrás</button>
        </div>

        <div class="busquedaCiudadanos" id="busquedaCiudadanos">
                <div class="ciudadano" id="preFix">
                    <h2>idEleccion</h2>
                    <h2>Tipo</h2>
                    <h2>Estado</h2>
                </div>
                <div class="contentInsert" id="contentInsert"></div>
            </div>
        </div>
    `

    modalContainer.innerHTML = `
        <div id="modal" class="noVisible">
            <button id="cerrarModal" class="closeButton"><img src="../img/cross.svg" alt=""></button>
            <div class="ciudadanoModal" id="modalContent">
                <h2>Estado</h2>
                    <select id="estado">
                        <option value="cerrada">Cerrada</option>
                        <option value="abierta">Abierta</option>
                        <option value="finalizada">Finalizada</option>
                    </select>
                <div class="buttonModalSide">
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
    
    // PARA VOLVER AL MENU DE ADMINISTRADOR
    back.addEventListener("click", () => {
        adminMenuShow(mainTitle);
    });

    // PARA CERRAR EL MODAL
    cerrarModal.addEventListener("click", () => {
        modal.classList.add('noVisible');
    });
    
    async function crearInterfazElecciones() {
        let elecciones = await buscarElecciones().then(data => {
            return data;
        });

        contentInsert.innerHTML = "";

        if (elecciones.length > 0) {
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

                elementoPadre.appendChild(idEleccion);
                elementoPadre.appendChild(tipo);
                elementoPadre.appendChild(estado);

                elementoPadre.addEventListener("click", () => {
                    estadoModal.value = eleccion.estado;
                    actualizarEleccionBtn.style.display = "block";
                    actualizarEleccionBtn.style.width = "100%"

                    modal.classList.remove('noVisible');

                    // ACTUALIZAR ELECCION
                    actualizarEleccionBtn.onclick = () => {
                        actualizarEleccion(eleccion.idEleccion, eleccion.tipo, estadoModal.value, eleccion.fechaInicio, eleccion.fechaFin);
                        setTimeout(() => {
                            modal.classList.add("noVisible");
                            crearInterfazElecciones();
                        }, 250);
                    };
                });

                contentInsert.appendChild(elementoPadre);
            });
        } else {
            contentInsert.innerHTML = `<p>No hay elecciones :(</p>`;
        }
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

    mainTitle.classList.remove("adminPanel");

    let gestionCandidaatos = document.getElementById('gestionCandidatos');
    let gestionPartidos = document.getElementById('gestionPartidos');
    let gestionEscrutinios = document.getElementById('gestionEscrutinios');
    let gestionElecciones = document.getElementById('gestionElecciones');

    gestionCandidaatos.addEventListener("click", function() {
        candidatos(mainTitle);
    });

    gestionPartidos.addEventListener("click", function() {
        partidos(mainTitle);
    });

    gestionElecciones.addEventListener("click", function() {
        elecciones(mainTitle);
    });

    gestionEscrutinios.addEventListener("click", function() {
        escrutinios(mainTitle);
    });

}