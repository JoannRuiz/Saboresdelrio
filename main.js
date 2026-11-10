/* Sabores del Río — Interacciones */
(function () {
  "use strict";

  /* 1. Menú adaptable (hamburguesa) */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("menuPrincipal");

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  });

  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });

  /* 2. Filtro de platos */
  var chips = document.querySelectorAll(".chip");
  var cards = document.querySelectorAll("#cardsGrid .card");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      cards.forEach(function (card) {
        card.hidden = !(filter === "todos" || card.getAttribute("data-category") === filter);
      });
    });
  });

  /* 3. Acordeón (sección desplegable) */
  document.querySelectorAll(".acc-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });

  /* 4. Validación del formulario de reservas */
  var form = document.getElementById("formReserva");
  var msg = document.getElementById("formMsg");
  var fecha = document.getElementById("fecha");

  // La fecha mínima es hoy
  var hoy = new Date();
  var iso = hoy.getFullYear() + "-" +
    String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
    String(hoy.getDate()).padStart(2, "0");
  fecha.min = iso;

  function setError(inputId, errId, text) {
    var field = document.getElementById(inputId).closest(".field");
    document.getElementById(errId).textContent = text;
    field.classList.toggle("has-error", Boolean(text));
    return !text;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.textContent = "";

    var nombre = document.getElementById("nombre").value.trim();
    var correo = document.getElementById("correo").value.trim();
    var personas = document.getElementById("personas").value;

    var ok = true;
    ok = setError("nombre", "errNombre", nombre.length < 3 ? "Escribe tu nombre completo." : "") && ok;
    ok = setError("correo", "errCorreo", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) ? "" : "Ingresa un correo válido.") && ok;
    ok = setError("fecha", "errFecha", !fecha.value || fecha.value < iso ? "Elige una fecha desde hoy." : "") && ok;
    ok = setError("personas", "errPersonas", personas ? "" : "Selecciona el número de personas.") && ok;

    if (ok) {
      msg.textContent = "¡Gracias, " + nombre.split(" ")[0] + "! Recibimos tu reserva para " + personas + " persona(s).";
      form.reset();
    }
  });
})();
