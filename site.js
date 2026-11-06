/* Encabezado con menú de tres barras, pie de página y datos de contacto.
   No necesitas editar este archivo: el contenido está en contenido.js */
(function () {
  var NM = window.NM || {}, CF = NM.cafe || {}, C = NM.contacto || {};
  var page = document.body.getAttribute("data-page") || "inicio";
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var cop = function (n) { return "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
  var wa = function (text) { return "https://wa.me/" + C.whatsapp + (text ? "?text=" + encodeURIComponent(text) : ""); };
  window.NM_wa = wa;
  var inicio = page === "inicio";
  var home = inicio ? "" : "index.html"; // en otras páginas, los enlaces vuelven a la página principal

  var desde = function (v) {
    var p = v.precios || CF.precios || {}, a = Object.keys(p).map(function (k) { return p[k]; }).filter(Boolean);
    return a.length ? Math.min.apply(null, a) : 0;
  };
  var redes = function (clase) {
    var s = [];
    [["instagram", "Instagram"], ["tiktok", "TikTok"], ["facebook", "Facebook"]].forEach(function (r) {
      if (C[r[0]]) s.push('<a' + (clase ? ' class="' + clase + '"' : "") + ' href="' + esc(C[r[0]]) + '" target="_blank" rel="noopener">' + r[1] + "</a>");
    });
    return s;
  };

  /* ---------- Encabezado: tres barras + marca + carrito ---------- */
  var h = $("site-header");
  if (h) h.innerHTML = '<header class="top"><div class="wrap">' +
    '<button class="burger" id="burger" type="button" aria-label="Abrir el menú" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>' +
    '<a class="brand" href="index.html" aria-label="' + esc(NM.marca.nombre) + ', inicio"><img src="img/nm-simbolo-claro.webp" alt="" width="93" height="40">' +
    '<span class="brand-name">' + esc(NM.marca.nombre) + "<small>" + esc(NM.marca.lema) + "</small></span></a>" +
    (page === "carrito"
      ? '<a class="btn btn-gold" href="index.html#tienda">Seguir comprando</a>'
      : '<a class="btn btn-gold" href="carrito.html" id="hdr-cart" aria-label="Ver carrito">Carrito <span id="hdr-count">0</span></a>') +
    "</div></header>";

  /* ---------- Menú lateral: variedades, aromática y secciones ---------- */
  // Cada producto de la tienda es un enlace que lo abre en la tienda. Los cafés y las infusiones van en grupos distintos.
  var producto = function (v) {
    var thumb = v.foto ? '<img src="' + esc(v.foto.src) + '" alt="" width="44" height="44" loading="lazy" decoding="async">' : '<span class="thumb-vacio"></span>';
    var precio = desde(v), info;
    if (v.tipo === "infusion") info = [v.presentacion, precio ? "desde " + cop(precio) : "Consulta el precio"].filter(Boolean).join(" · ");
    else info = (v.puntaje ? v.puntaje + " puntos · " : "") + "desde " + cop(precio);
    return '<li><a href="' + (inicio ? "#tienda" : "index.html?v=" + encodeURIComponent(v.id) + "#tienda") + '" data-variety="' + esc(v.id) + '">' + thumb +
      "<span><b>" + esc(v.nombre) + "</b><small>" + esc(info) + "</small></span></a></li>";
  };
  var todos = CF.variedades || [];
  var cafes = todos.filter(function (v) { return v.tipo !== "infusion"; }).map(producto).join("");
  var otros = todos.filter(function (v) { return v.tipo === "infusion"; }).map(producto).join("");
  var tambien = otros ? '<p class="drawer-h">También tenemos</p><ul class="drawer-list">' + otros + "</ul>" : "";
  var M = CF.metodos, pronto = [];
  if (M) pronto.push('<li><a href="' + home + '#metodos"><span class="thumb-metodo" aria-hidden="true"></span>' +
    "<span><b>" + esc(M.titulo) + "</b><small>" + esc(M.etiqueta || "") + "</small></span></a></li>");
  var aroma = tambien + (pronto.length ? '<p class="drawer-h">Y muy pronto</p><ul class="drawer-list">' + pronto.join("") + "</ul>" : "");
  var enlaces = [["#elegir", "Cómo elegir mi café"], ["#proceso", "Del cafetal a tu taza"], ["#molienda", "Molienda"], ["#negociar", "Compras al por mayor"],
    ["#nosotros", "Quiénes somos"], ["#dudas", "Preguntas frecuentes"]].map(function (l) { return '<li><a href="' + home + l[0] + '">' + l[1] + "</a></li>"; }).join("");
  var d = document.createElement("div");
  d.innerHTML = '<div class="drawer-overlay" id="drawer-overlay" hidden></div>' +
    '<aside class="drawer" id="drawer" aria-label="Menú del sitio">' +
    '<div class="drawer-head"><span>Menú</span><button class="drawer-x" id="drawer-x" type="button" aria-label="Cerrar el menú">×</button></div>' +
    '<nav><p class="drawer-h">Nuestros cafés</p><ul class="drawer-list">' + cafes + "</ul>" + aroma +
    '<p class="drawer-h">Explora</p><ul class="drawer-links">' + enlaces + '<li><a href="carrito.html">Mi carrito</a></li></ul></nav>' +
    '<div class="drawer-foot"><a class="btn btn-gold btn-wide" href="' + wa("Hola, quisiera más información sobre el café.") + '" target="_blank" rel="noopener">Escribir por WhatsApp</a>' +
    '<p class="drawer-redes">' + redes().join(" · ") + "</p></div></aside>";
  while (d.firstChild) document.body.insertBefore(d.firstChild, document.body.firstChild.nextSibling);

  var burger = $("burger"), drawer = $("drawer"), overlay = $("drawer-overlay");
  function abrir() {
    drawer.classList.add("open"); overlay.hidden = false; document.body.classList.add("menu-abierto");
    burger.setAttribute("aria-expanded", "true"); burger.setAttribute("aria-label", "Cerrar el menú");
    setTimeout(function () { $("drawer-x").focus(); }, 30);
  }
  function cerrar(devolverFoco) {
    drawer.classList.remove("open"); overlay.hidden = true; document.body.classList.remove("menu-abierto");
    burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Abrir el menú");
    if (devolverFoco) burger.focus();
  }
  burger.addEventListener("click", function () { drawer.classList.contains("open") ? cerrar(true) : abrir(); });
  $("drawer-x").addEventListener("click", function () { cerrar(true); });
  overlay.addEventListener("click", function () { cerrar(true); });
  drawer.addEventListener("click", function (e) { if (e.target.closest("a")) cerrar(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("open")) cerrar(true); });

  /* ---------- Botón flotante de WhatsApp (solo en la página principal) ---------- */
  if (inicio) {
    var w = document.createElement("a");
    w.className = "wa-float"; w.href = wa("Hola, quisiera más información sobre el café."); w.target = "_blank"; w.rel = "noopener";
    w.setAttribute("aria-label", "Escribir por WhatsApp");
    w.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-7l-5 4v-4H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm3 5.500v1.500h8V8.500H8zm0 3.500v1.500h5.500V12H8z"/></svg>';
    document.body.appendChild(w);
  }

  /* ---------- Pie de página ---------- */
  var f = $("site-footer");
  if (f) {
    var soc = redes();
    f.innerHTML = '<footer class="band foot"><div class="wrap">' +
      '<div><img src="img/nm-logo-claro.webp" alt="Logo de ' + esc(NM.marca.nombre) + '" width="190" height="113"><p style="margin-top:12px">' + esc(NM.marca.ciudad) + "</p></div>" +
      '<div><p class="head">Contacto</p><p class="nums">' + (C.telefonos || []).map(esc).join("<br>") + "</p>" +
      (C.email ? '<p><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></p>" : "") + (soc.length ? "<p>" + soc.join(" · ") + "</p>" : "") + "</div>" +
      '<div><p class="head">Tienda</p><p><a href="' + home + '#tienda">Elegir mi café</a><br><a href="' + home + '#negociar">Compras al por mayor</a><br><a href="carrito.html">Mi carrito</a></p></div>' +
      '</div><div class="wrap"><p class="copy">© ' + new Date().getFullYear() + " " + esc(NM.marca.nombre) + ". Todos los derechos reservados.</p></div></footer>";
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-tels]"), function (e) { e.textContent = (C.telefonos || []).join(" o "); });
})();
