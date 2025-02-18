document.addEventListener("DOMContentLoaded", function() {

    let mainTitle = document.getElementById('mainTitle');
    adminMenuShow(mainTitle);
});


function candidatos(mainTitle){

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

function partidos(mainTitle){
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
                <button id="insertarCiudadano" class="anadirCiudadano">Insertar</button>
            </div>
        </div>

    `

    let back = document.getElementById('back');
    back.addEventListener("click", () => {
        adminMenuShow(mainTitle);
    });
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

}