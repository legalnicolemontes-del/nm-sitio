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
    w.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
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
