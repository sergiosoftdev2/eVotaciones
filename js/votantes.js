import { buscarEleccionesAbiertas, buscarEleccionesFinalizadas } from "./api.js"

document.addEventListener("DOMContentLoaded", () => {

    let eleccionesDisponibles = document.getElementById('eleccionesDisponibles');
    let eleccionesFinalizadas = document.getElementById('eleccionesFinalizadas');


    buscarEleccionesAbiertas().then((elecciones) => {
        

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

            eleccionesDisponibles.appendChild(parentDiv);

        });



    })

    buscarEleccionesFinalizadas().then((elecciones) => {
        
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

            eleccionesFinalizadas.appendChild(parentDiv);

        });

    })

})