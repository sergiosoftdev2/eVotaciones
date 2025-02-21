import { cerrarSesion } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {

    let menu = document.querySelector("#menu");
    let rol = sessionStorage.getItem("rol");
    let login = document.getElementById("login");
    let register = document.getElementById("registro");

    if(sessionStorage.getItem("idUsuario")){
        login.style.display = "none";
        register.style.display = "none";
        let logout = document.createElement("a");
        logout.innerText = "Cerrar Sesion";
        logout.href = "/eVotaciones/vistas/login.html";
        menu.appendChild(logout);
        logout.addEventListener("click", () => cerrarSesion());
    }

    if(rol == "administrador"){
        let adminPanel = document.createElement("a");
        adminPanel.innerText = "Panel de Administrador";
        adminPanel.href = "/eVotaciones/vistas/administrador.html";
        let votantePanel = document.createElement("a");
        votantePanel.innerText = "Panel de Votante";
        votantePanel.href = "/eVotaciones/vistas/votantes.html";
        menu.appendChild(votantePanel);
        menu.appendChild(adminPanel);
    } else if(rol == "votante"){
        let votantePanel = document.createElement("a");
        votantePanel.innerText = "Panel de Votante";
        votantePanel.href = "/eVotaciones/vistas/votantes.html";
        menu.appendChild(votantePanel);
    } else if (rol == "censista"){
        let censistaPanel = document.createElement("a");
        censistaPanel.innerText = "Panel de Censista";
        let votantePanel = document.createElement("a");
        votantePanel.innerText = "Panel de Votante";
        votantePanel.href = "/eVotaciones/vistas/votantes.html";
        menu.appendChild(votantePanel);
        censistaPanel.href = "/eVotaciones/vistas/censista.html";
        menu.appendChild(censistaPanel);
    }

})