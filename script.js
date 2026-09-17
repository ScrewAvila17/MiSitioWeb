/* =========================================
   MENSAJE DE BIENVENIDA
========================================= */

window.addEventListener("load", function() {

    console.log("Bienvenido al sitio web de Aaron Avila");

});


/* =========================================
   BOTÓN CONOCERME
========================================= */

function saludar() {

    alert(
        "¡Hola! Gracias por visitar mi sitio personal. " +
        "Aquí podrás conocer un poco más sobre mí, mis intereses y mis proyectos."
    );

}


/* =========================================
   FECHA Y HORA
========================================= */

function actualizarFechaHora() {

    const ahora = new Date();

    const fecha = ahora.toLocaleDateString("es-MX");

    const hora = ahora.toLocaleTimeString("es-MX");

    const elemento = document.getElementById("fechaHora");

    const footer = document.getElementById("horaFooter");

    if (elemento) {

        elemento.innerHTML =
            "<strong>Fecha y hora actual:</strong> " +
            fecha + " - " + hora;

    }

    if (footer) {

        footer.innerHTML =
            "Fecha y hora: " + fecha + " - " + hora;

    }

}

actualizarFechaHora();

setInterval(actualizarFechaHora, 1000);


/* =========================================
   MODO OSCURO
========================================= */

function cambiarModo() {

    document.body.classList.toggle("oscuro");

    const boton = document.getElementById("modoBtn");

    if (document.body.classList.contains("oscuro")) {

        boton.innerHTML = "☀️ Modo claro";

    } else {

        boton.innerHTML = "🌙 Modo oscuro";

    }

}


/* =========================================
   GALERÍA AMPLIADA
========================================= */

function abrirImagen(imagen) {

    const modal = document.getElementById("modalImagen");

    const imagenGrande =
        document.getElementById("imagenGrande");

    imagenGrande.src = imagen.src;

    imagenGrande.alt = imagen.alt;

    modal.style.display = "flex";

}


function cerrarImagen() {

    document.getElementById("modalImagen").style.display = "none";

}


/* =========================================
   BOTÓN VOLVER ARRIBA
========================================= */

window.addEventListener("scroll", function() {

    const boton =
        document.getElementById("arribaBtn");

    if (window.scrollY > 400) {

        boton.style.display = "block";

    } else {

        boton.style.display = "none";

    }

});


function volverArriba() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   FORMULARIO DE CONTACTO
========================================= */

function enviarFormulario(event) {

    event.preventDefault();

    const nombre =
        document.getElementById("nombre").value;

    alert(
        "¡Gracias, " + nombre +
        "! Tu mensaje fue recibido correctamente."
    );

    document.getElementById(
        "formularioContacto"
    ).reset();

}
