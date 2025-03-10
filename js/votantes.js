import { 
    
    buscarEleccionesAbiertas, buscarEleccionesFinalizadas, buscarPartidos, buscarUsuarioVotado, 
    votosPorPartidoEleccion, insertarUsuarioHaVotado, insertarVotoGenerales, votosPorLocalidadEleccion, 
    buscarPartido, comprobarSesion, enviarCorreo, buscarCiudadano, buscarDNICandidato, 
    insertarVotoAutonomicas, buscarCandidato, buscarLocalidad, buscarCandidatosAutonomicasPartido, buscarUsuario,
    buscarCandidatosAutonomicas, obtenerEscanosLocalidad

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

        if(elecciones.message == false){
            eleccionesFinalizadas.innerHTML += "<p>No hay elecciones pasadas :(</p>"
            return
        }
        
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

            if(eleccion.tipo == "general"){
                parentDiv.addEventListener('click', () => mostrarResultadoEleccion(eleccion.idEleccion));
            }else{
                parentDiv.addEventListener('click', () => mostrarResultadoEleccionAutonomica(eleccion.idEleccion));
            }

            eleccionesFinalizadas.appendChild(parentDiv);

        });

    })
}

async function votarEleccionActivaGenerales(idEleccion){
    
    // BORRANDO CONTENIDO ANTERIOR
    let contenido = document.getElementById('notCentered');
    contenido.innerHTML = '<button class="back" id="back"><img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png">Atrás</button>'

    // TITULO RESULTADOS ELECCION
    let titulo = document.createElement('h2');
    titulo.textContent = "VOTAR ELECCION";
    titulo.classList.add('votantesTitle');
    contenido.appendChild(titulo);

    let localidadUsuario = await buscarCiudadano(sessionStorage.getItem("idCenso")).then(localidad => {
        return localidad[0].idLocalidad;
    })

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
                    insertarVotoGenerales(idEleccion, partido.idPartido, localidadUsuario).then(data => {
                        console.log(data)
                    })

                    // E INSERTAMOS COMO QUE EL USUARIO HA VOTADO EN LAS ELECCIONES
                    insertarUsuarioHaVotado(idEleccion, sessionStorage.getItem('idUsuario')).then(() => {
                        if (idCenso) {
                            buscarCiudadano(idCenso).then(data => {
                                enviarCorreo(data[0].email, data[0].nombre, "Votación Elecciones", "Su voto se ha registrado correctamente")
                                window.location.href = "/eVotaciones/vistas/votantes.html";
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
        console.log(data)
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

    let localidadUsuario = await buscarCiudadano(sessionStorage.getItem("idCenso")).then(localidad => {
        return localidad[0].idLocalidad;
    })

    contenido.innerHTML += formularioVoto;

    let partidosContainer = document.createElement('div');
    partidosContainer.classList.add('partidosContainer');
    contenido.appendChild(partidosContainer);

    (async () => {

        if(candidatos.message == false){
            contenido.innerHTML += "<p>No hay candidatos activos en tu localidad :(</p>"
            return
        }

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

                partido.addEventListener('click', () => votarPartido(candidato.idPartido))
    
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

                infoContainer.appendChild(candidatoTexto);

            }
        }
    })();
    
    function votarPartido(idPartido){
        if(confirm("¿Estás seguro de que quieres votar a este candidato?")){
            insertarVotoAutonomicas(idEleccion, idPartido, localidadUsuario).then(data => {
                insertarUsuarioHaVotado(idEleccion, sessionStorage.getItem("idUsuario")).then(data => {
                    alert("Voto registrado correctamente");
                    if (idCenso) {
                        buscarCiudadano(idCenso).then(data => {
                            enviarCorreo(data[0].email, data[0].nombre, "Votación Elecciones", "Su voto se ha registrado correctamente")
                            window.location.href = "/eVotaciones/vistas/votantes.html";
                        });
                    } else {
                        console.error("ID Censo no encontrado en sessionStorage");
                    }
                })
            })
        }
    }

    // BOTON PARA VOLVER ATRAS
    volverAtras()

}

async function mostrarResultadoEleccion(idEleccion) {

    let contenido = document.getElementById('notCentered');
    contenido.innerHTML = `
        <button class="back" id="back"><img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png">Atrás</button>
        <h2 class="votantesTitle">RESULTADOS ELECCION</h2>
        <div class="buscar" id="buscar">
            <h3>Filtrar por localidad:</h3>
            <select id="localidadSelect">
                <option selected value="0"><b>Todas las localidades</b></option>
            </select>
        </div>
        <div class="partidosEleccionPadre" id="partidosEleccionPadre">
    `;

    volverAtras();

    let partidosPadre = document.getElementById('partidosEleccionPadre');


    // EL SELECT DE LOCALIDADES
    let localidadSelect = document.getElementById('localidadSelect');
    let localidadesSet = new Set();
    
    let partidosLocalidades = await votosPorLocalidadEleccion(idEleccion).then(async votos => {
        votos.forEach(voto => {
            localidadesSet.add(voto.idLocalidad);
        });
    })

    localidadesSet.forEach(async localidad => {
        await buscarLocalidad(localidad).then((localidadNombre) =>{
            let option = document.createElement('option');
            option.value = localidad;
            option.textContent = localidadNombre;
            localidadSelect.appendChild(option);
        });
    
    })


    contenido.addEventListener("change", async (event) => {
        if (event.target.id === 'localidadSelect') {
            const nuevaLocalidad = event.target.value;
            if (nuevaLocalidad) {
                mostrarVotosPorLocalidad(nuevaLocalidad)
            }
        }
    })

    votosPorPartidoEleccion(idEleccion).then(async votos => {

        partidosPadre.innerHTML = "";

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

        mostrarRes(partidosConDetalles)

        contenido.appendChild(partidosPadre);
        graficoDonut(contenido, votos);
    });

    function mostrarVotosPorLocalidad(idLocalidad){
        votosPorPartidoEleccion(idEleccion, idLocalidad).then(async votos => {

            partidosPadre.innerHTML = "";

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
    
            mostrarRes(partidosConDetalles)
            graficoDonut(contenido, votos);
        });
    }


    function mostrarRes(partidosConDetalles){
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
    }

}

async function mostrarResultadoEleccionAutonomica(idEleccion) {

    let contenido = document.getElementById('notCentered');
    let localidadesSet = new Set();

    let localidadUsuario = await buscarCiudadano(sessionStorage.getItem("idCenso")).then(localidad => {
        return localidad[0].idLocalidad;
    })

    let partidosLocalidades = await votosPorLocalidadEleccion(idEleccion).then(async votos => {
        votos.forEach(voto => {
            localidadesSet.add(voto.idLocalidad);
        });
    })

    contenido.innerHTML = `
        <button class="back" id="back"><img src="https://cdn-icons-png.flaticon.com/512/3114/3114883.png">Atrás</button>
        <h2 class="votantesTitle">RESULTADOS ELECCION</h2>
        <div class="buscar" id="buscar">
            <h3>Localidad:</h3>
            <select id="localidadSelect">
                <option disabled selected>Localidades</option>
            </select>
        </div>
        <div id="votosPorPartidoContainer" class="partidosContainer">
            <!-- AQUI VAN LOS INSERT DE LOS CANDIDATOS CON SUS VOTOS -->
        </div>
    `;

    contenido.addEventListener("change", async (event) => {
        if (event.target.id === 'localidadSelect') {
            const nuevaLocalidad = event.target.value;
            if (nuevaLocalidad) {
                mostrarRes(idEleccion, nuevaLocalidad);
            }
        }
    })

    let localidadSelect = document.getElementById('localidadSelect');
    localidadesSet.forEach(async localidad => {
        await buscarLocalidad(localidad).then((localidadNombre) =>{
            let option = document.createElement('option');
            option.value = localidad;
            option.textContent = localidadNombre;
            localidadSelect.appendChild(option);
        });
    
    })

    mostrarRes(idEleccion, localidadUsuario);

    async function mostrarRes(idEleccion, idLocalidadChange){

        let escanosTotalesLocalidad = await obtenerEscanosLocalidad(idLocalidadChange).then(escanos => {
            return escanos[0].escanos;
        });

        let votosPorPartidoContainer = document.getElementById('votosPorPartidoContainer');
        votosPorPartidoContainer.innerHTML = "";
        
        let votosPorPartidoLocalidad = [];
        let stats = [];
        let votosTotales = 0;

        votosPorLocalidadEleccion(idEleccion, localidadUsuario).then(async votos => {

            // RELLENAMOS LOS VOTOS POR PARTIDO Y LOS AGRUPAMOS POR LOCALIDAD
            for(const voto of votos){
                if(voto.idLocalidad == idLocalidadChange){
                    votosPorPartidoLocalidad.push(voto);
                    votosTotales = votosTotales + voto.num_votos;
                }
            };
            
            for(const voto of votosPorPartidoLocalidad){

                let datosPartido = await buscarPartido(voto.idPartido);

                // Crear elementos HTML
                let partido = document.createElement('div');
                partido.classList.add('partidoAutonomicas');
                partido.dataset.id = voto.idPartido;

                let imageContainerAutonomicas = document.createElement('div');
                imageContainerAutonomicas.classList.add('imgContainerAutonomicas');
                
                let imageLogo = document.createElement('img');
                imageLogo.src = datosPartido[0].logo;

                let votosTexto = document.createElement('h3');
                votosTexto.textContent = `${voto.num_votos} votos`;
                votosTexto.style = "margin: 0; font-size: 1.2rem;";

                let escanosTotales = document.createElement('h3');
                escanosTotales.textContent = `${voto.num_votos*escanosTotalesLocalidad/votosTotales} Escaños`;
                escanosTotales.style = "margin: 0; font-size: 1.2rem;";

                let candidatosAutonomicasContainer = document.createElement('div');
                candidatosAutonomicasContainer.classList.add('candidatosAutonomicasContainer');
                
                let infoContainer = document.createElement('div');
                infoContainer.classList.add('infoContainer');
                
                let partidoTitle = document.createElement('h3');
                partidoTitle.textContent = datosPartido[0].nombre;

                imageContainerAutonomicas.appendChild(imageLogo);
                infoContainer.appendChild(partidoTitle);
                infoContainer.appendChild(escanosTotales);
                infoContainer.appendChild(votosTexto);

                let candidatos = await buscarCandidatosAutonomicasPartido(idEleccion, idLocalidadChange, voto.idPartido);

                for (const candidato of candidatos) {
                    
                    console.log(candidato);

                    let datosCandidato = await buscarDNICandidato(candidato.idUsuario);
                    let candidatoTexto = document.createElement('p');
                    if(candidato.numeroCandidato == 1 && votosPorPartidoLocalidad.indexOf(voto) == 0){
                        candidatoTexto.innerHTML = `<b>Alcalde/Alcaldesa</b>: ${datosCandidato[0].nombre} ${datosCandidato[0].apellido}`;
                    }else{
                        candidatoTexto.textContent = `${datosCandidato[0].nombre} ${datosCandidato[0].apellido}`;
                    }
                    
                    infoContainer.appendChild(candidatoTexto);
                }


                
                partido.appendChild(imageContainerAutonomicas);
                partido.appendChild(infoContainer);
                votosPorPartidoContainer.appendChild(partido);

                // ES PARA EL GRAFICO
                stats.push({
                    idPartido: voto.idPartido,
                    total_votos: voto.num_votos
                });

            }

            graficoDonut(contenido, stats);
            volverAtras()
    
        });

    }

}

let chartInstance = null;

function graficoDonut(contenido, votos) {

    if (chartInstance) {
        chartInstance.destroy();
    }

    setTimeout(() => {
        let canvasParent = contenido.querySelector('.canvasParent');
        let canvas;
        
        if (!canvasParent) {

            canvasParent = document.createElement('div');
            canvasParent.classList.add('canvasParent');
            
            canvas = document.createElement('canvas');
            canvas.id = 'myChart';
            
            canvasParent.appendChild(canvas);
            contenido.appendChild(canvasParent);
        } else {
            canvas = canvasParent.querySelector('canvas');
        }

        const ctx = canvas.getContext('2d');
        Chart.register(ChartDataLabels);

        chartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    label: 'Votos',
                    data: [],
                    backgroundColor: [],
                    borderWidth: 1,
                    hoverOffset: 40
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    tooltip: {
                        enabled: true,
                        padding: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        bodyFont: { size: 14 },
                        callbacks: {
                            title: tooltipItems => tooltipItems[0].label,
                            label: context => `${context.parsed} votos`
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 25,
                            boxWidth: 10,
                            font: { size: 14 },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                layout: {
                    padding: { bottom: 25 }
                }
            }
        });

        votos.forEach(async voto => {
            let partido = await buscarPartido(voto.idPartido);
            if (!partido || partido.length === 0) return;

            let imagen = new Image();
            imagen.crossOrigin = 'Anonymous'; 
            imagen.src = partido[0].logo;
            imagen.dataset.id = voto.idPartido;

            imagen.onload = function () {
                const colorThief = new ColorThief();
                let color = colorThief.getColor(imagen);
                const colorRGB = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                
                chartInstance.data.datasets[0].backgroundColor.push(colorRGB);
                chartInstance.data.labels.push(partido[0].siglas);
                chartInstance.data.datasets[0].data.push(voto.total_votos);
                chartInstance.update();
            };
        });
        
        return chartInstance;
    }, 500);

}

function volverAtras(){
    let back = document.getElementById('back');
    back.addEventListener('click', () => {
        pantallaInicial()
    })
}