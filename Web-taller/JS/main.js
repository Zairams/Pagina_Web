// ========================================
// 1. MODE FOSC I MODE CLAR
// ========================================

// Seleccionem el botó del tema i el cos de la pàgina
const btnTheme = document.querySelector("#btn-theme");
const body = document.querySelector("body");

// Comprovem que els elements existeixen
console.log(btnTheme);
console.log(body);

// Quan fem clic en el botó, canviem el tema
btnTheme.addEventListener("click", function() {

    // Activa o desactiva la classe del mode fosc
    body.classList.toggle("dark-mode");

    // Comprovem quin mode està activat
    if (body.classList.contains("dark-mode")) {

        // Si està activat el mode fosc, oferim el mode clar
        btnTheme.textContent = "☀️ Mode Clar";

    } else {

        // Si està activat el mode clar, oferim el mode fosc
        btnTheme.textContent = "🌙 Mode Fosc";
    }
});


// ========================================
// 2. SELECCIONEM EL FORMULARI
// ========================================

// Busquem el formulari de la pàgina
const form = document.querySelector("form");

// Seleccionem els camps que necessitem comprovar
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const telefono = document.querySelector("#telefono");
const tipo = document.querySelector("#tipo");
const problema = document.querySelector("#problema");
const privacidad = document.querySelector("#privacidad");

// Seleccionem el grup d'opcions d'assistència
const grupAssistencia = document.querySelector(".grup-assistencia");

// Seleccionem tots els botons d'opció
const opcionsAssistencia = document.querySelectorAll(
    'input[name="asistencia"]'
);


// ========================================
// 3. FUNCIÓ PER A LLEVAR ELS ERRORS
// ========================================

// Aquesta funció elimina els errors d'una comprovació anterior
function netejarErrors() {

    // Busquem el missatge d'error anterior
    const missatgeAnterior = document.querySelector("#missatge-error");

    // Si existeix, l'eliminem
    if (missatgeAnterior) {
        missatgeAnterior.remove();
    }

    // Llevar les vores roges dels camps de text
    nombre.style.border = "";
    email.style.border = "";
    telefono.style.border = "";
    tipo.style.border = "";
    problema.style.border = "";

    // Restablir la vora del grup d'assistència
    grupAssistencia.style.border = "";

    // Llevar el contorn roig de la casella de privacitat
    privacidad.style.outline = "";
}


// ========================================
// 4. COMPROVEM EL FORMULARI
// ========================================

// Aquesta funció s'executa quan enviem el formulari
form.addEventListener("submit", function(event) {

    // Evitem que la pàgina es recarregue automàticament
    event.preventDefault();

    // Eliminem els errors de l'intent anterior
    netejarErrors();

    // Creem una llista per a guardar els errors
    let errors = [];


    // ------------------------------------
    // 4.1. COMPROVAR EL NOM
    // ------------------------------------

    // trim() elimina els espais del principi i del final
    if (nombre.value.trim() === "") {

        // Marquem el camp en roig
        nombre.style.border = "2px solid red";

        // Guardem l'error
        errors.push("Has d'escriure el teu nom.");
    }


    // ------------------------------------
    // 4.2. COMPROVAR EL CORREU
    // ------------------------------------

    // Primer comprovem si el correu està buit
    if (email.value.trim() === "") {

        email.style.border = "2px solid red";

        errors.push("Has d'escriure el teu correu electrònic.");

    } else if (
        !email.value.includes("@") ||
        !email.value.includes(".")
    ) {

        // Si no està buit, comprovem que continga @ i un punt
        email.style.border = "2px solid red";

        errors.push("El correu ha de contindre @ i un punt.");
    }


    // ------------------------------------
    // 4.3. COMPROVAR EL DISPOSITIU
    // ------------------------------------

    // Si el valor és buit, no s'ha seleccionat cap dispositiu
    if (tipo.value === "") {

        tipo.style.border = "2px solid red";

        errors.push("Has de seleccionar un dispositiu.");
    }


    // ------------------------------------
    // 4.4. COMPROVAR LA DESCRIPCIÓ
    // ------------------------------------

    if (problema.value.trim() === "") {

        problema.style.border = "2px solid red";

        errors.push("Has de descriure el problema.");
    }


    // ------------------------------------
    // 4.5. COMPROVAR EL TIPUS D'ASSISTÈNCIA
    // ------------------------------------

    // Busquem si hi ha alguna opció seleccionada
    let assistenciaSeleccionada = false;

    // Recorrem les opcions d'assistència
    opcionsAssistencia.forEach(function(opcio) {

        // Si alguna està marcada, guardem true
        if (opcio.checked) {
            assistenciaSeleccionada = true;
        }
    });

    // Si no hi ha cap opció marcada, mostrem un error
    if (!assistenciaSeleccionada) {

        grupAssistencia.style.border = "2px solid red";

        errors.push("Has de seleccionar un tipus d'assistència.");
    }


    // ------------------------------------
    // 4.6. COMPROVAR LA PRIVACITAT
    // ------------------------------------

    // checked indica si la casella està marcada
    if (!privacidad.checked) {

        // Marquem la casella amb un contorn roig
        privacidad.style.outline = "2px solid red";

        errors.push("Has d'acceptar el tractament de les dades.");
    }


    // ====================================
    // 5. MOSTRAR ELS ERRORS
    // ====================================

    // Si la llista conté algun error...
    if (errors.length > 0) {

        // Creem un paràgraf per als missatges
        const missatge = document.createElement("p");

        // Li assignem un identificador
        missatge.id = "missatge-error";

        // Unim tots els errors en un únic missatge
        missatge.textContent = errors.join(" ");

        // Posem el text de color roig, sense caixa ni fons
        missatge.style.color = "red";

        // Deixem una mica d'espai damunt del missatge
        missatge.style.marginTop = "15px";

        // Afegim el missatge al final del formulari
        form.appendChild(missatge);

        // Aturem la funció perquè hi ha errors
        return;
    }


    // ====================================
    // 6. SI TOT ÉS CORRECTE
    // ====================================

    // Mostrem un avís de confirmació
    alert("Formulari enviat correctament!");

    // Encara no s'envien les dades a cap servidor.
});


// ========================================
// 7. BOTÓ PER A ESBORRAR EL FORMULARI
// ========================================

// Quan es restableix el formulari...
form.addEventListener("reset", function() {

    // Eliminem els missatges i les vores roges
    netejarErrors();
});