/* =========================================
   GALAXIA INTERACTIVA
========================================= */

const canvas =
    document.getElementById("galaxyCanvas");

const ctx =
    canvas.getContext("2d");

let estrellas = [];

let mouseX = 0;
let mouseY = 0;

let ancho;
let alto;


/* =========================================
   CONFIGURACIÓN
========================================= */

function cambiarTamaño() {

    ancho = window.innerWidth;
    alto = window.innerHeight;

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        ancho * dpr;

    canvas.height =
        alto * dpr;

    canvas.style.width =
        ancho + "px";

    canvas.style.height =
        alto + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    crearEstrellas();
}


/* =========================================
   CREAR ESTRELLAS
========================================= */

function crearEstrellas() {

    estrellas = [];

    const cantidad =
        ancho < 768 ? 100 : 220;

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        estrellas.push({

            x:
                Math.random() * ancho,

            y:
                Math.random() * alto,

            z:
                Math.random(),

            tamaño:
                Math.random() * 2 + 0.5,

            velocidad:
                Math.random() * 0.5 + 0.1,

            brillo:
                Math.random(),

            fase:
                Math.random() * Math.PI * 2

        });

    }

}


/* =========================================
   MOVIMIENTO DEL MOUSE
========================================= */

window.addEventListener(
    "mousemove",
    function (evento) {

        mouseX =
            (evento.clientX / ancho) - 0.5;

        mouseY =
            (evento.clientY / alto) - 0.5;

    }
);


/* =========================================
   DIBUJAR GALAXIA
========================================= */

function dibujarGalaxia() {

    ctx.clearRect(
        0,
        0,
        ancho,
        alto
    );


    /* Fondo */

    const fondo =
        ctx.createRadialGradient(
            ancho / 2,
            alto / 2,
            0,
            ancho / 2,
            alto / 2,
            Math.max(ancho, alto)
        );


    fondo.addColorStop(
        0,
        "#161b52"
    );

    fondo.addColorStop(
        0.45,
        "#080b2c"
    );

    fondo.addColorStop(
        1,
        "#01020c"
    );


    ctx.fillStyle =
        fondo;

    ctx.fillRect(
        0,
        0,
        ancho,
        alto
    );


    /* Nebulosa central */

    const nebulosa =
        ctx.createRadialGradient(
            ancho / 2,
            alto / 2,
            0,
            ancho / 2,
            alto / 2,
            Math.min(ancho, alto) * 0.5
        );


    nebulosa.addColorStop(
        0,
        "rgba(100, 40, 255, 0.15)"
    );

    nebulosa.addColorStop(
        0.4,
        "rgba(0, 180, 255, 0.07)"
    );

    nebulosa.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
    );


    ctx.fillStyle =
        nebulosa;

    ctx.fillRect(
        0,
        0,
        ancho,
        alto
    );


    /* Estrellas */

    estrellas.forEach(
        function (estrella) {

            estrella.y -=
                estrella.velocidad;

            if (
                estrella.y < -10
            ) {

                estrella.y =
                    alto + 10;

                estrella.x =
                    Math.random() * ancho;
            }


            /*
             * Efecto de profundidad
             * producido por el movimiento
             * del mouse.
             */

            const movimientoX =
                mouseX *
                estrella.z *
                30;

            const movimientoY =
                mouseY *
                estrella.z *
                20;


            const x =
                estrella.x +
                movimientoX;

            const y =
                estrella.y +
                movimientoY;


            /* Parpadeo */

            estrella.fase += 0.02;

            const parpadeo =
                0.65 +
                Math.sin(
                    estrella.fase
                ) * 0.35;


            const tamaño =
                estrella.tamaño *
                (0.5 + estrella.z);


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                tamaño,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${parpadeo}
                )`;


            ctx.fill();


            /*
             * Estrellas grandes
             */

            if (
                estrella.z > 0.75
            ) {

                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    tamaño * 3,
                    0,
                    Math.PI * 2
                );


                const brillo =
                    ctx.createRadialGradient(
                        x,
                        y,
                        0,
                        x,
                        y,
                        tamaño * 3
                    );


                brillo.addColorStop(
                    0,
                    "rgba(100, 220, 255, 0.4)"
                );

                brillo.addColorStop(
                    1,
                    "rgba(100, 220, 255, 0)"
                );


                ctx.fillStyle =
                    brillo;

                ctx.fill();

            }

        }
    );


    /* =====================================
       LÍNEAS ENTRE ESTRELLAS CERCANAS
    ===================================== */

    for (
        let i = 0;
        i < estrellas.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < estrellas.length;
            j++
        ) {

            const estrella1 =
                estrellas[i];

            const estrella2 =
                estrellas[j];


            const x1 =
                estrella1.x +
                mouseX *
                estrella1.z *
                30;

            const y1 =
                estrella1.y +
                mouseY *
                estrella1.z *
                20;


            const x2 =
                estrella2.x +
                mouseX *
                estrella2.z *
                30;

            const y2 =
                estrella2.y +
                mouseY *
                estrella2.z *
                20;


            const distanciaX =
                x1 - x2;

            const distanciaY =
                y1 - y2;


            const distancia =
                Math.sqrt(
                    distanciaX *
                    distanciaX +
                    distanciaY *
                    distanciaY
                );


            if (
                distancia < 110
            ) {

                const opacidad =
                    (1 -
                    distancia / 110) *
                    0.12;


                ctx.beginPath();

                ctx.moveTo(
                    x1,
                    y1
                );

                ctx.lineTo(
                    x2,
                    y2
                );


                ctx.strokeStyle =
                    `rgba(
                        80,
                        180,
                        255,
                        ${opacidad}
                    )`;


                ctx.lineWidth =
                    0.5;

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(
        dibujarGalaxia
    );

}


/* =========================================
   INICIAR GALAXIA
========================================= */

window.addEventListener(
    "resize",
    cambiarTamaño
);

cambiarTamaño();

dibujarGalaxia();


/* =========================================
   MENSAJE DE BIENVENIDA
========================================= */

window.addEventListener(
    "load",
    function () {

        console.log(
            "Bienvenido al sitio web de Aaron Avila"
        );

    }
);


/* =========================================
   BOTÓN CONOCERME
========================================= */

function saludar() {

    alert(
        "¡Hola! Gracias por visitar mi sitio personal. " +
        "Aquí podrás conocer un poco más sobre mí, " +
        "mis intereses y mis proyectos."
    );

}


/* =========================================
   FECHA Y HORA
========================================= */

function actualizarFechaHora() {

    const ahora =
        new Date();


    const fecha =
        ahora.toLocaleDateString(
            "es-MX"
        );


    const hora =
        ahora.toLocaleTimeString(
            "es-MX"
        );


    const elemento =
        document.getElementById(
            "fechaHora"
        );


    const footer =
        document.getElementById(
            "horaFooter"
        );


    if (elemento) {

        elemento.innerHTML =
            "<strong>Fecha y hora actual:</strong> " +
            fecha +
            " - " +
            hora;

    }


    if (footer) {

        footer.innerHTML =
            "Fecha y hora: " +
            fecha +
            " - " +
            hora;

    }

}


actualizarFechaHora();


setInterval(
    actualizarFechaHora,
    1000
);


/* =========================================
   MODO CLARO / OSCURO
========================================= */

function cambiarModo() {

    document.body.classList.toggle(
        "claro"
    );


    const boton =
        document.getElementById(
            "modoBtn"
        );


    if (
        document.body.classList.contains(
            "claro"
        )
    ) {

        boton.innerHTML =
            "🌌 Modo galaxia";

    } else {

        boton.innerHTML =
            "☀️ Modo claro";

    }

}


/* =========================================
   GALERÍA
========================================= */

function abrirImagen(imagen) {

    const modal =
        document.getElementById(
            "modalImagen"
        );


    const imagenGrande =
        document.getElementById(
            "imagenGrande"
        );


    imagenGrande.src =
        imagen.src;


    imagenGrande.alt =
        imagen.alt;


    modal.style.display =
        "flex";

}


function cerrarImagen() {

    document.getElementById(
        "modalImagen"
    ).style.display =
        "none";

}


/* =========================================
   BOTÓN VOLVER ARRIBA
========================================= */

window.addEventListener(
    "scroll",
    function () {

        const boton =
            document.getElementById(
                "arribaBtn"
            );


        if (
            window.scrollY > 400
        ) {

            boton.style.display =
                "block";

        } else {

            boton.style.display =
                "none";

        }

    }
);


function volverArriba() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   FORMULARIO
========================================= */

function enviarFormulario(event) {

    event.preventDefault();


    const nombre =
        document.getElementById(
            "nombre"
        ).value;


    alert(
        "¡Gracias, " +
        nombre +
        "! Tu mensaje fue recibido correctamente."
    );


    document.getElementById(
        "formularioContacto"
    ).reset();

}
