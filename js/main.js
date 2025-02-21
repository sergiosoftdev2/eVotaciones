document.addEventListener("DOMContentLoaded", () => {

    let menu = document.querySelector("#menu");
    let rol = sessionStorage.getItem("rol");

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