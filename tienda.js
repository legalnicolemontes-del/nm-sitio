/* Piezas compartidas por la tienda (index.html) y el carrito (carrito.html).
   El contenido (precios, variedades) está en contenido.js. */
(function () {
  var NM = window.NM, CF = NM.cafe, T = window.NMT = {};
  T.CF = CF;
  T.VARIETIES = CF.variedades;
  T.SIZES = [16, 250, 500];
  T.SIZE_NAME = { 16: "Sachet", 250: "Media libra", 500: "1 libra" };
  T.GRINDS = [
    { id: "grano", label: "En grano (entero)", short: "En grano", tip: "Lo muelo yo en casa, justo antes de preparar." },
    { id: "gruesa", label: "Molienda gruesa", short: "Molienda gruesa", tip: "Prensa francesa y cold brew." },
    { id: "media", label: "Molienda media", short: "Molienda media", tip: "Filtrado: V60, Chemex y cafetera de goteo." },
    { id: "media-fina", label: "Molienda media-fina", short: "Molienda media-fina", tip: "Moka o cafetera italiana." },
    { id: "fina", label: "Molienda fina", short: "Molienda fina", tip: "Espresso." },
    { id: "extrafina", label: "Molienda extrafina", short: "Molienda extrafina", tip: "Café turco." },
    { id: "recomendar", label: "No sé, recomiéndenme", short: "Que me recomienden la molienda", tip: "Cuéntanos cómo lo preparas y te orientamos." }
  ];

  T.$ = function (id) { return document.getElementById(id); };
  T.cop = function (n) { return "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
  T.esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  T.el = function (tag, attrs, html) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  };
  T.cap = function (s) { s = s.trim(); return s.charAt(0).toUpperCase() + s.slice(1); };
  T.varBy = function (id) { return T.VARIETIES.filter(function (v) { return v.id === id; })[0]; };
  // "na" = productos que no se muelen (la aromática en sobre); no aparece en la lista de moliendas
  T.NO_MOLIENDA = { id: "na", label: "Sin molienda", short: "Sin molienda", tip: "" };
  T.grindBy = function (id) { return id === "na" ? T.NO_MOLIENDA : T.GRINDS.filter(function (g) { return g.id === id; })[0]; };
  T.esInfusion = function (v) { return v.tipo === "infusion"; };
  T.priceOf = function (v, size) { return (v.precios || CF.precios)[size]; };
  // Solo los tamaños que tienen precio para esa variedad (el Pacamara se vende únicamente en 500 g)
  T.sizesOf = function (v) { return T.SIZES.filter(function (s) { return T.priceOf(v, s); }); };
  T.waLink = function (text) { return "https://wa.me/" + NM.contacto.whatsapp + "?text=" + encodeURIComponent(text); };

  // ---- Carrito (se guarda en el navegador y lo comparten las dos páginas) ----
  T.loadCart = function () {
    var cart = [];
    try {
      JSON.parse(localStorage.getItem("ml-cart") || "[]").forEach(function (it) {
        var v = T.varBy(it.v);
        if (v && T.sizesOf(v).indexOf(it.size) > -1 && T.grindBy(it.g) && it.q >= 1) cart.push({ v: it.v, size: it.size, g: it.g, q: Math.min(it.q | 0, 99) });
      });
    } catch (e) { cart = []; }
    return cart;
  };
  T.saveCart = function (cart) { try { localStorage.setItem("ml-cart", JSON.stringify(cart)); } catch (e) {} };
  T.lineTotal = function (it) { return T.priceOf(T.varBy(it.v), it.size) * it.q; };
  T.cartTotal = function (cart) { return cart.reduce(function (a, it) { return a + T.lineTotal(it); }, 0); };
  T.cartCount = function (cart) { return cart.reduce(function (a, it) { return a + it.q; }, 0); };

  // ---- Mensaje de WhatsApp que se arma solo mientras se llena un formulario ----
  T.composer = function (cfg) {
    var link = T.$(cfg.link), copyBtn = T.$(cfg.copy), status = T.$(cfg.status), box = T.$(cfg.preview);
    function render() {
      var text = cfg.build(), dis = cfg.disabled ? cfg.disabled() : false;
      box.textContent = text;
      link.classList.toggle("is-disabled", dis);
      link.setAttribute("aria-disabled", String(dis));
      link.href = dis ? "#" : T.waLink(text);
      return text;
    }
    T.$(cfg.form).addEventListener("input", function () { status.textContent = ""; render(); });
    T.$(cfg.form).addEventListener("change", function () { status.textContent = ""; render(); });
    T.$(cfg.form).addEventListener("submit", function (e) { e.preventDefault(); });
    link.addEventListener("click", function (e) { if (cfg.disabled && cfg.disabled()) e.preventDefault(); });
    copyBtn.addEventListener("click", function () {
      var text = render();
      var fail = function () {
        var r = document.createRange(); r.selectNodeContents(box);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        status.textContent = "No se pudo copiar solo. El mensaje quedó seleccionado: cópialo con tu teclado o manteniendo presionado.";
      };
      try { navigator.clipboard.writeText(text).then(function () { status.textContent = "Mensaje copiado. Pégalo en WhatsApp."; }, fail); }
      catch (e) { fail(); }
    });
    return render;
  };
})();
