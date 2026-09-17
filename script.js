function saludar() {

    alert("¡Hola! Gracias por visitar mi sitio web.");

}

function actualizarFecha() {

    const ahora = new Date();

    document.getElementById("fecha").textContent =
        ahora.toLocaleString("es-MX");

}

actualizarFecha();

setInterval(actualizarFecha, 1000);
