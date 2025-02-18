document.addEventListener("DOMContentLoaded", function() {

    let mainTitle = document.getElementById('mainTitle');
    adminMenuShow(mainTitle);

});


async function candidatos(mainTitle){

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

export async function actualizarPartidoPolitico(idPartido, nombre, siglas){
    let formData = new FormData();
    formData.append('idPartido', idPartido);
    formData.append('nombre', nombre);
    formData.append('siglas', siglas);

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

export async function insertarPartidoPolitico(nombre, siglas){
    let formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('siglas', siglas);

    fetch("../api/INSERT/insertarPartido.php", {
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