/* Tienda de café: elegir variedad, ver su foto y su ficha de cata, y agregar al carrito.
   El carrito y el pago están en carrito.html. Precios y variedades: contenido.js */
(function () {
  var T = window.NMT, CF = T.CF;
  var $ = T.$, cop = T.cop, esc = T.esc, el = T.el, cap = T.cap;
  var varBy = T.varBy, grindBy = T.grindBy, priceOf = T.priceOf, sizesOf = T.sizesOf, waLink = T.waLink;
  var VARIETIES = T.VARIETIES, GRINDS = T.GRINDS;

  // ---- Estado ----
  var cur = { v: VARIETIES[0].id, size: 500, grind: "grano", qty: 1 };
  var cart = T.loadCart();
  // Llegar desde otra página con ?v=id abre esa variedad
  var pv = /[?&]v=([^&#]+)/.exec(location.search);
  if (pv && varBy(decodeURIComponent(pv[1]))) cur.v = decodeURIComponent(pv[1]);
  // Elegir un café en el menú de tres barras
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-variety]"); if (!a) return;
    var v = varBy(a.getAttribute("data-variety"));
    if (v) { cur.v = v.id; renderAll(); }
  });

  // ---- Carrito: contador del encabezado y botón flotante ----
  function renderBadge() {
    var n = T.cartCount(cart), fab = $("fab");
    if ($("hdr-count")) $("hdr-count").textContent = n;
    if (!fab) return;
    fab.hidden = n === 0;
    fab.textContent = "Ver carrito · " + n + (n === 1 ? " bolsa" : " bolsas") + " · " + cop(T.cartTotal(cart));
  }

  // ---- Selector de variedades ----
  var vpick = $("vpick");
  function renderPick() {
    vpick.innerHTML = "";
    VARIETIES.forEach(function (v) {
      var b = el("button", { type: "button", "class": "vbtn", "aria-pressed": String(v.id === cur.v), "data-v": v.id },
        (v.foto ? '<img class="vthumb" src="' + esc(v.foto.src) + '" alt="" width="36" height="36" decoding="async">' : "") +
        "<span>" + esc(v.nombre) + "</span>" + (v.puntaje ? ' <span class="vs">' + v.puntaje + "</span>" : ""));
      b.addEventListener("click", function () { cur.v = v.id; renderAll(); });
      vpick.appendChild(b);
    });
  }

  // ---- Foto y ficha de cata ----
  function fotoHtml(v) {
    var f = v.foto;
    if (!f) return "";
    return '<img class="ficha-img" src="' + esc(f.src) + '" alt="' + esc(f.alt) + '" width="' + f.w + '" height="' + f.h +
      '" decoding="async" style="object-fit:' + (f.fit || "cover") + ";object-position:" + esc(f.pos || "50% 50%") + '">';
  }
  function renderFicha() {
    var v = varBy(cur.v), box = $("ficha");
    if (!v.puntaje && !v.sabor) {
      var msg = "Hola, quiero conocer la ficha de cata de la variedad " + v.nombre + " de Montaña Luminosa.";
      box.innerHTML = fotoHtml(v) + '<div><p class="tag">Ficha de cata</p><h3>' + esc(v.nombre) + "</h3></div>" +
        '<div class="ficha-wait"><p>Estamos preparando la ficha de cata de esta variedad. Pídela por WhatsApp y te la enviamos junto con la disponibilidad del lote.</p>' +
        '<a class="btn btn-solid btn-sm" target="_blank" rel="noopener" href="' + waLink(msg) + '">Pedir la ficha por WhatsApp</a></div>';
      return;
    }
    var pct = v.puntaje ? Math.max(0, Math.min(100, (v.puntaje - 80) / 20 * 100)) : 0;
    var notes = (v.sabor || "").split(",").filter(function (s) { return s.trim(); }).map(function (s) { return '<span class="note">' + esc(cap(s)) + "</span>"; }).join("");
    var rows = [["Proceso", v.proceso], ["Aroma", v.aroma], ["Sabor", v.sabor], ["Acidez", v.acidez], ["Cuerpo", v.cuerpo], ["Altura", v.altura], ["Origen", v.origen], ["Marca", v.marca]]
      .filter(function (r) { return r[1]; })
      .map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
    var top = '<div class="ficha-top"><div><p class="tag">Ficha de cata</p><h3>' + esc(v.nombre) + "</h3></div>" +
      (v.puntaje ? '<div class="ficha-score"><b>' + v.puntaje + "</b><span>puntos en taza sobre 100</span></div>" : "") + "</div>";
    var scale = v.puntaje
      ? '<div class="scale" role="img" aria-label="Escala de 80 a 100 puntos. Este café está en ' + v.puntaje + '."><div class="scale-spec"></div>' +
        '<div class="scale-mark" style="left:' + pct + '%"><span>' + v.puntaje + "</span></div>" +
        '<span class="tick" style="left:0%">80</span><span class="tick" style="left:25%">85</span><span class="tick" style="left:50%">90</span>' +
        '<span class="tick" style="left:75%">95</span><span class="tick" style="left:100%">100</span>' +
        '<span class="scale-note">Desde 80 puntos es café de especialidad</span></div>'
      : '<p class="note-small">El puntaje en taza de esta variedad aún no está publicado. <a target="_blank" rel="noopener" href="' +
        waLink("Hola, quiero saber el puntaje en taza del " + v.nombre + ".") + '">Pregúntalo por WhatsApp</a>.</p>';
    box.innerHTML = fotoHtml(v) + top + (notes ? '<div class="notes" aria-label="Notas de sabor">' + notes + "</div>" : "") + scale +
      (rows ? '<dl class="attrs">' + rows + "</dl>" : "");
  }

  // ---- Compra ----
  var sizesBox = $("sizes"), molSel = $("molienda-sel"), qtyIn = $("qty");
  GRINDS.forEach(function (g) { molSel.appendChild(el("option", { value: g.id }, esc(g.label))); });
  function renderBuy() {
    var v = varBy(cur.v), sizes = sizesOf(v);
    if (sizes.indexOf(cur.size) < 0) cur.size = sizes[sizes.length - 1];
    $("buy-title").textContent = v.nombre;
    sizesBox.innerHTML = "";
    sizes.forEach(function (s) {
      var lab = el("label", { "class": "sz" },
        '<input type="radio" name="size" value="' + s + '"' + (s === cur.size ? " checked" : "") + "><b>" + s + " g</b><small>" + T.SIZE_NAME[s] + "</small><span>" + cop(priceOf(v, s)) + "</span>");
      lab.querySelector("input").addEventListener("change", function () { cur.size = s; renderBuy(); });
      sizesBox.appendChild(lab);
    });
    $("size-note").textContent = cur.size === 500 ? "La bolsa de 500 g es biodegradable, a base de caña de azúcar." : "";
    molSel.value = cur.grind;
    $("molienda-tip").textContent = grindBy(cur.grind).tip;
    qtyIn.value = cur.qty;
    $("add").textContent = "Agregar al carrito · " + cop(priceOf(v, cur.size) * cur.qty);
  }
  molSel.addEventListener("change", function () { cur.grind = molSel.value; renderBuy(); });
  function setQty(n) { cur.qty = Math.max(1, Math.min(99, n | 0 || 1)); renderBuy(); }
  qtyIn.addEventListener("change", function () { setQty(parseInt(qtyIn.value, 10)); });
  $("qty-minus").addEventListener("click", function () { setQty(cur.qty - 1); });
  $("qty-plus").addEventListener("click", function () { setQty(cur.qty + 1); });

  $("add").addEventListener("click", function () {
    var found = cart.filter(function (it) { return it.v === cur.v && it.size === cur.size && it.g === cur.grind; })[0];
    if (found) found.q = Math.min(99, found.q + cur.qty);
    else cart.push({ v: cur.v, size: cur.size, g: cur.grind, q: cur.qty });
    T.saveCart(cart); renderBadge();
    $("add-status").innerHTML = "Agregado: " + esc(varBy(cur.v).nombre) + ", " + cur.size + " g × " + cur.qty + '. <a href="carrito.html">Ver mi carrito</a> o sigue eligiendo.';
    cur.qty = 1; renderBuy();
  });

  // ---- Regreso desde Mercado Pago ----
  (function () {
    var m = /[?&]pago=(ok|pendiente|fallido)/.exec(location.search); if (!m) return;
    var b = $("pay-banner"), k = m[1];
    var msg = {
      ok: ["ok", "¡Gracias por tu compra!", "Recibimos tu pago. Te enviamos la confirmación a tu correo y te escribiremos por WhatsApp para coordinar el envío."],
      pendiente: ["", "Tu pago está pendiente", "Mercado Pago aún está procesando el pago. Cuando se apruebe te llegará la confirmación a tu correo."],
      fallido: ["bad", "No se completó el pago", "No se hizo ningún cobro. Puedes intentarlo de nuevo desde tu carrito o escribirnos por WhatsApp."]
    }[k];
    b.className = "pay-banner " + msg[0];
    b.innerHTML = "<b>" + msg[1] + "</b>" + msg[2] + (k === "ok" ? "" : ' <a href="carrito.html">Volver a mi carrito</a>');
    b.hidden = false;
    if (k === "ok") { cart.length = 0; T.saveCart(cart); }
    if (b.scrollIntoView) setTimeout(function () { b.scrollIntoView(); }, 50);
  })();

  if ($("faq-pago")) $("faq-pago").textContent = CF.checkoutUrl
    ? "Puedes pagar en línea con Mercado Pago (tarjeta, PSE, Nequi y otros medios) desde tu carrito. El pago se hace en la página segura de Mercado Pago, y recibes la confirmación en tu correo."
    : "Por transferencia bancaria. Armas tu carrito, envías el pedido por WhatsApp, te confirmamos disponibilidad, envío y total, haces la transferencia y nos mandas el comprobante por el mismo chat.";

  // ---- Guía de molienda y negociación ----
  var brew = $("brew");
  GRINDS.filter(function (g) { return g.id !== "recomendar"; }).forEach(function (g) {
    brew.appendChild(el("li", {}, "<b>" + esc(g.label) + ".</b> " + esc(g.tip)));
  });
  var nMol = $("n-molienda"), nVars = $("n-vars");
  GRINDS.forEach(function (g) { nMol.appendChild(el("option", { value: g.id }, esc(g.label))); });
  VARIETIES.forEach(function (v) {
    nVars.appendChild(el("label", {}, '<input type="checkbox" value="' + esc(v.nombre) + '"> ' + esc(v.nombre)));
  });
  function dealText() {
    var checked = Array.prototype.map.call(nVars.querySelectorAll("input:checked"), function (i) { return i.value; });
    var g = grindBy(nMol.value), f = function (id) { return $(id).value.trim(); };
    var lines = ["Hola, me interesa negociar un pedido de café de Montaña Luminosa (NM).", ""];
    if (f("n-nombre")) lines.push("Nombre o negocio: " + f("n-nombre"));
    lines.push("Tipo de cliente: " + $("n-tipo").value);
    lines.push("Variedades: " + (checked.length ? checked.join(", ") : "por definir"));
    if (f("n-cantidad")) lines.push("Cantidad aproximada: " + f("n-cantidad") + " kg");
    lines.push("Frecuencia: " + $("n-frecuencia").value);
    lines.push("Molienda: " + g.short);
    if (f("n-ciudad")) lines.push("Ciudad: " + f("n-ciudad"));
    if (f("n-propuesta")) lines.push("Mi propuesta de precio: " + f("n-propuesta"));
    if (f("n-mensaje")) lines.push("", f("n-mensaje"));
    lines.push("", "¿Me pueden enviar una propuesta?");
    return lines.join("\n");
  }
  T.composer({ form: "negocio", build: dealText, preview: "n-preview", link: "n-enviar", copy: "n-copiar", status: "n-estado" })();

  // ---- Marcas, pequeñas, al final de la página ----
  var mk = $("marcas-logos");
  if (mk) {
    $("marcas-titulo").textContent = CF.marcasTitulo || "";
    mk.innerHTML = (CF.marcas || []).map(function (m) {
      return '<figure><img src="' + esc(m.logo) + '" alt="' + esc(m.alt) + '" width="' + m.w + '" height="' + m.h + '" loading="lazy" decoding="async"></figure>';
    }).join("");
  }

  // ---- "¿No sabes cuál elegir?" ----
  var E = CF.elegir;
  if (E && $("elegir")) {
    $("elegir-titulo").textContent = E.titulo;
    $("elegir-texto").textContent = E.texto;
    $("elegir-opciones").innerHTML = E.opciones.map(function (o, i) { return '<button type="button" class="eleg" data-i="' + i + '">' + esc(o.etiqueta) + "</button>"; }).join("");
    $("elegir-opciones").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-i]"); if (!b) return;
      var o = E.opciones[parseInt(b.getAttribute("data-i"), 10)];
      cur.v = o.variedad; renderAll();
      $("elegir-nota").textContent = o.nota;
      Array.prototype.forEach.call($("elegir-opciones").children, function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      $("vpick").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ---- Del cafetal a tu taza ----
  var ET = CF.etapas;
  if (ET && $("proceso")) {
    $("proceso-eyebrow").textContent = ET.eyebrow;
    $("proceso-titulo").textContent = ET.titulo;
    $("proceso-pasos").innerHTML = ET.pasos.map(function (p) { return "<li><b>" + esc(p.titulo) + "</b><span>" + esc(p.texto) + "</span></li>"; }).join("");
  }

  // ---- Aromática de cereza de café (próximamente) ----
  var AR = CF.aromatica;
  if (AR && $("aromatica")) {
    $("aroma-etiqueta").textContent = AR.etiqueta || "";
    $("aroma-titulo").textContent = AR.titulo;
    $("aroma-texto").innerHTML = AR.textos.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    $("aroma-cta").textContent = AR.cta; $("aroma-cta").href = waLink(AR.mensaje);
    if (AR.foto) { var fi = $("aroma-foto"); fi.src = AR.foto.src; fi.alt = AR.foto.alt; fi.width = AR.foto.w; fi.height = AR.foto.h; }
  }

  // ---- Métodos de preparación (próximamente) ----
  var MT = CF.metodos;
  if (MT && $("metodos")) {
    $("metodos-etiqueta").textContent = MT.etiqueta || "";
    $("metodos-titulo").textContent = MT.titulo;
    $("metodos-texto").innerHTML = MT.textos.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    $("metodos-cta").textContent = MT.cta; $("metodos-cta").href = waLink(MT.mensaje);
  } else if ($("metodos")) { $("metodos").hidden = true; }

  // ---- Quién está detrás ----
  var SB = window.NM.sobre;
  if (SB && $("sobre-texto")) {
    $("sobre-titulo").textContent = SB.titulo;
    $("sobre-texto").innerHTML = (SB.etiquetas ? '<ul class="about-tags">' + SB.etiquetas.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") + "</ul>" : "") +
      SB.texto.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    if (SB.foto) { var sf = $("sobre-foto"); sf.src = SB.foto.src; sf.alt = SB.foto.alt; sf.width = SB.foto.w; sf.height = SB.foto.h; }
  }

  function renderAll() { renderPick(); renderFicha(); renderBuy(); }
  renderAll();
  renderBadge();
})();
