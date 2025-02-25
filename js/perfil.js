import { buscarCiudadano, actualizarCorreo, cerrarSesion, borrarUsuario } from "./api.js"

document.addEventListener("DOMContentLoaded", async () => {

    let correo = document.getElementById("correo");
    let contrasena = document.getElementById("password");
    let actualizar = document.getElementById("actualizar");
    let borrar = document.getElementById("borrar");

    const correoOriginal = await buscarCiudadano(sessionStorage.getItem("idCenso")).then(ciudadano => { return ciudadano[0].email });

    correo.value = correoOriginal;

    correo.addEventListener("input", () => {
        if(correo.value != correoOriginal){
            actualizar.classList.add("actualizar")
            actualizar.classList.remove("disabled");
        } else if(correo.value == correoOriginal){
            actualizar.classList.remove("actualizar")
            actualizar.classList.add("disabled");
        }
    })

    actualizar.addEventListener("click", () => {

        buscarCiudadano(sessionStorage.getItem("idCenso")).then(ciudadano => {
            ciudadano = ciudadano[0]
            if(contrasena.value == ""){
                if(confirm("¿Quieres cambiar el correo electronico?")){
                    actualizarCorreo(ciudadano.idCenso, correo.value).then(datos => {
                        console.log(datos)
                    })
                }
            }
        })

    })

    borrar.addEventListener("click", () => {
        if(confirm("¿Quieres borrar tu cuenta?")){
            
            borrarUsuario(sessionStorage.getItem("idCenso")).then(datos => {
                console.log(datos)
                cerrarSesion()
                window.location.href = "../index.html"
            })
            
        }
    })

    

    
})