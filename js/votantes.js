import { 
    
    buscarEleccionesAbiertas, buscarEleccionesFinalizadas, buscarPartidos, buscarUsuarioVotado, 
    votosPorPartidoEleccion, insertarUsuarioHaVotado, insertarVotoGenerales, votosPorLocalidadEleccion, 
    buscarPartido
} 
    from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
    


    pantallaInicial();
    

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

    let eleccionesDisponibles = document.getElementById('eleccionesDisponibles');
    let eleccionesFinalizadas = document.getElementById('eleccionesFinalizadas');
    let menu = document.querySelector("#header");
    
    await buscarEleccionesAbiertas().then((elecciones) => {

        if(elecciones == false){ 
            eleccionesDisponibles.innerHTML = `
                <p>No hay elecciones disponibles</p>
            `
            return
        }

        // CREANDO LAS CARD DE LAS ELECCIONES DISPONIBLES
        elecciones.forEach(async eleccion => {

            let haVotado = await buscarUsuarioVotado(sessionStorage.getItem("idUsuario"), eleccion.idEleccion).then(data => {
                return data;
            })

            if(haVotado.state == false){
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
            }else{
                return;
            }

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

    let formularioVoto = `
    
        <div class="partidosAVotar" id="partidosAVotar">
        
        </div>
    
    `

    contenido.innerHTML += formularioVoto;

    buscarPartidos().then(partidos => {
        partidos.forEach(partido => {

            let option = document.createElement('div');
            option.classList.add('partido');
            
            let siglas = document.createElement('h3');
            siglas.textContent = partido.siglas;

            let nombre = document.createElement('p');
            nombre.textContent = partido.nombre;

            let imgContainer = document.createElement('div');
            imgContainer.classList.add('imgContainer');

            let imagen = document.createElement('img');
            imagen.src = partido.logo;

            imgContainer.appendChild(imagen);

            option.appendChild(imgContainer);
            option.appendChild(siglas);
            option.appendChild(nombre);

            option.addEventListener("click", () => {
                if(confirm("¿Estas seguro de que quieres votar a " + partido.nombre + "?")){
                    alert("Voto realizado con exito");
                    
                    // INSERTAMOS EL VOTO EN LA TABLA VOTOS
                    insertarVotoGenerales(idEleccion, partido.idPartido).then(data => {
                    })

                    // E INSERTAMOS COMO QUE EL USUARIO HA VOTADO EN LAS ELECCIONES
                    insertarUsuarioHaVotado(idEleccion, sessionStorage.getItem('idUsuario')).then(data => {
                        window.location.href = "/eVotaciones/vistas/votantes.html";
                    });

                }
            })

            let select = document.getElementById('partidosAVotar');
            select.appendChild(option);

        })
    })


    // BOTON PARA VOLVER ATRAS
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

    votosPorLocalidadEleccion(idEleccion).then(votos => {
        console.log(votos)
    })

    let partidosPadre = document.createElement('div');
    partidosPadre.classList.add('partidosEleccionPadre');

    votosPorPartidoEleccion(idEleccion).then(votos => {

        console.log(votos)

        votos.forEach(votosPartido => {

            buscarPartido(votosPartido.idPartido).then(partido => {

                let nombre = partido[0].nombre;
                let siglas = partido[0].siglas;
                let logo = partido[0].logo;
                let votosPartidoPolitico = votosPartido.total_votos;
            
                let parentDiv = document.createElement('div');
                parentDiv.classList.add('partidoEleccion');

                let nombrePartido = document.createElement('h3');
                nombrePartido.textContent = nombre;

                let siglasPartido = document.createElement('p');
                siglasPartido.textContent = siglas;

                let votosMostrar = document.createElement('p');
                votosMostrar.textContent = votosPartidoPolitico + " votos";

                let imagenPartido = document.createElement('img');
                imagenPartido.src = logo;

                parentDiv.appendChild(imagenPartido);
                parentDiv.appendChild(nombrePartido);
                parentDiv.appendChild(siglasPartido);
                parentDiv.appendChild(votosMostrar);

                let notCentered = document.getElementById('notCentered');
                partidosPadre.appendChild(parentDiv);
            
            })
        })

        contenido.appendChild(partidosPadre);

    })

    // CHART JS
    // graficoDonut(contenido);


}

function graficoDonut(contenido){

    let canvasParent = document.createElement('div');
    canvasParent.classList.add('canvasParent');

    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvasParent.appendChild(canvas);
    contenido.appendChild(canvasParent);

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Localidad 1', 'Localidad 2', 'Localidad 3', 'Localidad 4'], // Localidades
            datasets: [
                {
                    label: 'Partido A', // Nombre del partido A
                    data: [10, 15, 30, 4000], // Votos del partido A
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de las barras
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Partido B', // Nombre del partido B
                    data: [20, 25, 35, 40], // Votos del partido B
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de las barras
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

}

function volverAtras(){
    let back = document.getElementById('back');
    back.addEventListener('click', () => {
        pantallaInicial()
    })
}