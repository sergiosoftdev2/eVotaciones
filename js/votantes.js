import { buscarEleccionesAbiertas, buscarEleccionesFinalizadas } from "./api.js"

document.addEventListener("DOMContentLoaded", () => {

    let eleccionesDisponibles = document.getElementById('eleccionesDisponibles');
    let eleccionesFinalizadas = document.getElementById('eleccionesFinalizadas');
    let menu = document.querySelector("#header");
    


    pantallaInicial();
    sessionStorage.setItem("test", "probando sessionStorage");
    console.log(sessionStorage.getItem("test"));
    

})

async function pantallaInicial(){

    let contenido = document.getElementById('notCentered');

    contenido.innerHTML = `
    
        <h1 class="votantesTitle">Elecciones Disponibles:</h1>
        <div class="" id="eleccionesDisponibles">

        </div>
        <h1 class="votantesTitle">Elecciones Pasadas:</h1>
        <div class="" id="eleccionesFinalizadas">

        </div>

    
    `;
    
    await buscarEleccionesAbiertas().then((elecciones) => {
        

        // CREANDO LAS CARD DE LAS ELECCIONES DISPONIBLES
        elecciones.forEach(eleccion => {

            let parentDiv = document.createElement('div');
            parentDiv.classList.add('eleccion');

            let imagen = document.createElement('img');
            let titulo = document.createElement('h2');

            if(eleccion.tipo == "general"){
                imagen.src = " /eVotaciones/img/bandera.png";
                titulo.textContent = "ELECCIONES GENERALES";
            }else{
                imagen.src = " /eVotaciones/img/comunidades.png";
                titulo.textContent = "ELECCIONES AUTONOMICAS";
            }

            let fechaInicio = document.createElement('p');
            fechaInicio.innerHTML = "<b>Fecha Inicio: </b>" + eleccion.fechaInicio;
            let fechaFin = document.createElement('p');
            fechaFin.innerHTML = "<b>Fecha Fin: </b>" + eleccion.fechaFin;
            let idEleccion = document.createElement('p');
            idEleccion.innerHTML = "<b>ID ELECCION: </b>" + eleccion.idEleccion;

            parentDiv.appendChild(imagen);
            parentDiv.appendChild(titulo);
            parentDiv.appendChild(fechaInicio);
            parentDiv.appendChild(fechaFin);
            parentDiv.appendChild(idEleccion);

            parentDiv.addEventListener('click', () => votarEleccionActiva(eleccion.idEleccion));

            eleccionesDisponibles.appendChild(parentDiv);

        });



    })

    await buscarEleccionesFinalizadas().then((elecciones) => {
        
        // CREANDO LAS CARD DE LAS ELECCIONES DISPONIBLES
        elecciones.forEach(eleccion => {

            let parentDiv = document.createElement('div');
            parentDiv.classList.add('eleccion');

            let titulo = document.createElement('h2');
            let imagen = document.createElement('img');

            if(eleccion.tipo == "general"){
                imagen.src = " ../img/bandera.png";
                titulo.textContent = "ELECCIONES GENERALES";
            }else{
                imagen.src = " ../img/comunidades.png";
                titulo.textContent = "ELECCIONES AUTONOMICAS";
            }

            
            let fechaInicio = document.createElement('p');
            fechaInicio.innerHTML = "<b>Fecha Inicio: </b>" + eleccion.fechaInicio;
            let fechaFin = document.createElement('p');
            fechaFin.innerHTML = "<b>Fecha Fin: </b>" + eleccion.fechaFin;
            let idEleccion = document.createElement('p');
            idEleccion.innerHTML = "<b>ID ELECCION: </b>" + eleccion.idEleccion;

            parentDiv.appendChild(imagen);
            parentDiv.appendChild(titulo);
            parentDiv.appendChild(fechaInicio);
            parentDiv.appendChild(fechaFin);
            parentDiv.appendChild(idEleccion);

            parentDiv.addEventListener('click', () => mostrarResultadoEleccion(eleccion.idEleccion));

            eleccionesFinalizadas.appendChild(parentDiv);

        });

    })
}

function votarEleccionActiva(idEleccion){
    
    // BORRANDO CONTENIDO ANTERIOR
    let contenido = document.getElementById('notCentered');
    contenido.innerHTML = '<button class="back" id="back"><img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png">Atrás</button>'

    // TITULO RESULTADOS ELECCION
    let titulo = document.createElement('h2');
    titulo.textContent = "VOTAR ELECCION";
    titulo.classList.add('votantesTitle');
    contenido.appendChild(titulo);

    volverAtras()

}

function mostrarResultadoEleccion(idEleccion){

    // BORRANDO CONTENIDO ANTERIOR
    let contenido = document.getElementById('notCentered');
    contenido.innerHTML = '<button class="back" id="back"><img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png">Atrás</button>'

    let titulo = document.createElement('h2');
    titulo.textContent = "RESULTADOS ELECCION";
    titulo.classList.add('votantesTitle');
    contenido.appendChild(titulo);

    volverAtras()

    // CHART JS
    graficoDonut(contenido);


}

function graficoDonut(contenido){

    let canvasParent = document.createElement('div');
    canvasParent.classList.add('canvasParent');
    

    const canvas = document.createElement('canvas');
    canvas.id = 'myDonutChart';
    canvasParent.appendChild(canvas);
    contenido.appendChild(canvasParent);

    const ctx = document.getElementById('myDonutChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['PSOE', 'PP', 'CS', 'VOX', 'Unidas Podemos'],
            datasets: [{
                data: [12, 19, 3, 5, 2],
                backgroundColor: ['#c81d11', '#1d498b', '#f34d00', '#57ba33', '#732a66']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

}

function volverAtras(contenido){
    let back = document.getElementById('back');
    back.addEventListener('click', () => {
        pantallaInicial()
    })
}