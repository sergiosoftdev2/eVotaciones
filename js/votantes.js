import { 
    
    buscarEleccionesAbiertas, buscarEleccionesFinalizadas, buscarPartidos, buscarUsuarioVotado, 
    votosPorPartidoEleccion, insertarUsuarioHaVotado, insertarVotoGenerales, votosPorLocalidadEleccion, 
    buscarPartido, comprobarSesion, enviarCorreo,
    buscarCiudadano,
    buscarCandidatosAutonomicas,
    buscarDNICandidato,
    insertarVotoAutonomicas
} from "./api.js"

const idCenso = sessionStorage.getItem("idCenso");

document.addEventListener("DOMContentLoaded", () => {

    if(!comprobarSesion()){
        window.location.href = "/eVotaciones/index.html";
    }

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

                let imageContainer = document.createElement('div');
                imageContainer.classList.add('imgContainerEleccion');

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

                imageContainer.appendChild(imagen);
                parentDiv.appendChild(imageContainer);
                parentDiv.appendChild(titulo);
                parentDiv.appendChild(fechaInicio);
                parentDiv.appendChild(fechaFin);
                parentDiv.appendChild(idEleccion);

                if(eleccion.tipo == "general"){
                    parentDiv.addEventListener('click', () => votarEleccionActivaGenerales(eleccion.idEleccion));
                }else{
                    parentDiv.addEventListener('click', () => votarEleccionActivaAutonomicas(eleccion.idEleccion));
                }
                

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
            let imageContainerElecciones = document.createElement('div');
            imageContainerElecciones.classList.add('imgContainerEleccion');

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

            imageContainerElecciones.appendChild(imagen);
            parentDiv.appendChild(imageContainerElecciones);
            parentDiv.appendChild(titulo);
            parentDiv.appendChild(fechaInicio);
            parentDiv.appendChild(fechaFin);
            parentDiv.appendChild(idEleccion);

            parentDiv.addEventListener('click', () => mostrarResultadoEleccion(eleccion.idEleccion));

            eleccionesFinalizadas.appendChild(parentDiv);

        });

    })
}

function votarEleccionActivaGenerales(idEleccion){
    
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
                        console.log(data)
                    })

                    // E INSERTAMOS COMO QUE EL USUARIO HA VOTADO EN LAS ELECCIONES
                    insertarUsuarioHaVotado(idEleccion, sessionStorage.getItem('idUsuario')).then(data => {
                        if (idCenso) {
                            buscarCiudadano(idCenso).then(data => {
                                enviarCorreo(data[0].email, data[0].nombre, "Votación Elecciones", "Su voto se ha registrado correctamente").then(mensaje => {
                                    window.location.href = "/eVotaciones/vistas/votantes.html";
                                });
                            });
                        } else {
                            console.error("ID Censo no encontrado en sessionStorage");
                        }
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

async function votarEleccionActivaAutonomicas(idEleccion){

    let idLocalidadUsuario;

    await buscarCiudadano(sessionStorage.getItem("idCenso")).then(data => {
        idLocalidadUsuario = data[0].idLocalidad;
    })

    let candidatos = await buscarCandidatosAutonomicas(idEleccion, idLocalidadUsuario).then(data => {
        return data;
    })
    
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

    let partidosContainer = document.createElement('div');
    partidosContainer.classList.add('partidosContainer');
    contenido.appendChild(partidosContainer);

    (async () => {
        for (const candidato of candidatos) {
    
            let datosPartido = await buscarPartido(candidato.idPartido);
            let datosCandidato = await buscarDNICandidato(candidato.idUsuario);
    
            let existeDivPartido = document.querySelector(`div[data-id="${candidato.idPartido}"]`);
    
            if (!existeDivPartido) {
                let partido = document.createElement('div');
                partido.classList.add('partidoAutonomicas');
                partido.dataset.id = candidato.idPartido;
    
                let imageContainerAutonomicas = document.createElement('div');
                imageContainerAutonomicas.classList.add('imgContainerAutonomicas');
    
                let imageLogo = document.createElement('img');
                imageLogo.src = datosPartido[0].logo;
    
                let candidatosAutonomicasContainer = document.createElement('div');
                candidatosAutonomicasContainer.classList.add('candidatosAutonomicasContainer');
    
                let infoContainer = document.createElement('div');
                infoContainer.classList.add('infoContainer');

                let partidoTitle = document.createElement('h3');
                partidoTitle.textContent = datosPartido[0].nombre;
    
                let candidatoTexto = document.createElement('p');
                candidatoTexto.textContent = datosCandidato[0].nombre + " " + datosCandidato[0].apellido;

                candidatoTexto.addEventListener('click', () => votarCandidato(candidato))
    
                imageContainerAutonomicas.appendChild(imageLogo);
                
                infoContainer.appendChild(partidoTitle);
                infoContainer.appendChild(candidatoTexto);
                
                partido.appendChild(imageContainerAutonomicas);
                partido.appendChild(infoContainer);
                
                partidosContainer.appendChild(partido);
            }else{

                let partido = document.querySelector(`div[data-id="${candidato.idPartido}"]`);
                let infoContainer = partido.querySelector('.infoContainer');

                let candidatoTexto = document.createElement('p');
                candidatoTexto.textContent = datosCandidato[0].nombre + " " + datosCandidato[0].apellido;

                candidatoTexto.addEventListener('click', () => votarCandidato(candidato))

                infoContainer.appendChild(candidatoTexto);

            }
        }
    })();
    
    function votarCandidato(candidato){
        if(confirm("¿Estás seguro de que quieres votar a este candidato?")){
            insertarVotoAutonomicas(idEleccion, candidato.idPartido, candidato.idLocalidad, candidato.idCandidato).then(data => {
                insertarUsuarioHaVotado(idEleccion, sessionStorage.getItem("idUsuario")).then(data => {
                    alert("Voto registrado correctamente");
                    window.location.reload();
                })
            })
        }
    }

    // BOTON PARA VOLVER ATRAS
    volverAtras()

}

async function mostrarResultadoEleccion(idEleccion) {

    let contenido = document.getElementById('notCentered');
    contenido.innerHTML = '<button class="back" id="back"><img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png">Atrás</button>';

    let titulo = document.createElement('h2');
    titulo.textContent = "RESULTADOS ELECCION";
    titulo.classList.add('votantesTitle');
    contenido.appendChild(titulo);

    volverAtras();

    let partidosPadre = document.createElement('div');
    partidosPadre.classList.add('partidosEleccionPadre');

    votosPorPartidoEleccion(idEleccion).then(async votos => {

        const partidosConDetalles = await Promise.all(
            votos.map(async votosPartido => {
                const partido = await buscarPartido(votosPartido.idPartido);
                return {
                    ...votosPartido,
                    nombre: partido[0].nombre,
                    siglas: partido[0].siglas,
                    logo: partido[0].logo
                };
            })
        );

        partidosConDetalles.forEach(partido => {
            let parentDiv = document.createElement('div');
            parentDiv.classList.add('partidoEleccion');

            let imageContainer = document.createElement('div');
            imageContainer.classList.add('imgContainer');

            let nombrePartido = document.createElement('h3');
            nombrePartido.textContent = partido.nombre;

            let siglasPartido = document.createElement('p');
            siglasPartido.textContent = partido.siglas;

            let votosMostrar = document.createElement('p');
            votosMostrar.textContent = partido.total_votos + " votos";

            let imagenPartido = document.createElement('img');
            imagenPartido.src = partido.logo;
            imagenPartido.dataset.id = partido.idPartido;

            imageContainer.appendChild(imagenPartido);
            parentDiv.appendChild(imageContainer);
            parentDiv.appendChild(nombrePartido);
            parentDiv.appendChild(siglasPartido);
            parentDiv.appendChild(votosMostrar);

            partidosPadre.appendChild(parentDiv);
        });

        contenido.appendChild(partidosPadre);
        graficoDonut(contenido, votos);
    });
}

async function mostrarResultadoEleccionAutonomica(idEleccion) {

    let contenido = document.getElementById('notCentered');
    contenido.innerHTML = '<button class="back" id="back"><img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png">Atrás</button>';

    let titulo = document.createElement('h2');
    titulo.textContent = "RESULTADOS ELECCION";
    titulo.classList.add('votantesTitle');
    contenido.appendChild(titulo);

    volverAtras();

    let partidosPadre = document.createElement('div');
    partidosPadre.classList.add('partidosEleccionPadre');

    votosPorPartidoEleccion(idEleccion).then(async votos => {

        const partidosConDetalles = await Promise.all(
            votos.map(async votosPartido => {
                const partido = await buscarPartido(votosPartido.idPartido);
                return {
                    ...votosPartido,
                    nombre: partido[0].nombre,
                    siglas: partido[0].siglas,
                    logo: partido[0].logo
                };
            })
        );

        partidosConDetalles.forEach(partido => {
            let parentDiv = document.createElement('div');
            parentDiv.classList.add('partidoEleccion');

            let imageContainer = document.createElement('div');
            imageContainer.classList.add('imgContainer');

            let nombrePartido = document.createElement('h3');
            nombrePartido.textContent = partido.nombre;

            let siglasPartido = document.createElement('p');
            siglasPartido.textContent = partido.siglas;

            let votosMostrar = document.createElement('p');
            votosMostrar.textContent = partido.total_votos + " votos";

            let imagenPartido = document.createElement('img');
            imagenPartido.src = partido.logo;
            imagenPartido.dataset.id = partido.idPartido;

            imageContainer.appendChild(imagenPartido);
            parentDiv.appendChild(imageContainer);
            parentDiv.appendChild(nombrePartido);
            parentDiv.appendChild(siglasPartido);
            parentDiv.appendChild(votosMostrar);

            partidosPadre.appendChild(parentDiv);
        });

        contenido.appendChild(partidosPadre);
        graficoDonut(contenido, votos);
    });
}

function graficoDonut(contenido, votos) {
    let canvasParent = document.createElement('div');
    canvasParent.classList.add('canvasParent');

    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';

    canvasParent.appendChild(canvas);
    contenido.appendChild(canvasParent);

    const ctx = document.getElementById('myChart').getContext('2d');
    Chart.register(ChartDataLabels);

    let chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Votos',
                    data: [],
                    backgroundColor: [],
                    borderWidth: 1,
                    hoverOffset: 40
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // 🔹 Desactiva la relación de aspecto
            plugins: {
                tooltip: {
                    enabled: true,
                    padding: 50,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    bodyFont: {
                        size: 14
                    },
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            return context.parsed + ' votos';
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    title: { display: true, padding: 5 },
                    labels: {
                        padding: 25,
                        boxWidth: 10,
                        font: {
                            size: 14  // Tamaño de fuente más grande
                        },
                        usePointStyle: true,  // Usa estilos de punto en lugar de rectángulos
                        pointStyle: 'circle'  // Forma de los puntos de la leyenda
                    },
                    margin: 30  // Margen adicional alrededor de toda la leyenda
                }
            },
            layout: {
                padding: {
                    bottom: 30 // Add padding at the bottom
                }
            }
        }
    });

    // Rest of your function remains the same
    votos.forEach(async voto => {
        await buscarPartido(voto.idPartido).then(partido => {
            // Your existing code
            let imagen = document.querySelector(`img[data-id="${voto.idPartido}"]`);

            // ColorThief code...
            const colorThief = new ColorThief();

            if (imagen.complete) {
                let color = colorThief.getColor(imagen);
                const colorRGB = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                chart.data.datasets[0].backgroundColor.push(colorRGB);
            } else {
                imagen.addEventListener('load', function() {
                    colorThief.getColor(imagen);
                });
            }

            const partidoSiglas = partido[0].siglas;
            const votosPartido = voto.total_votos;

            chart.data.labels.push(partidoSiglas);
            chart.data.datasets[0].data.push(votosPartido);

            chart.update();
        });
    });
}

function volverAtras(){
    let back = document.getElementById('back');
    back.addEventListener('click', () => {
        pantallaInicial()
    })
}