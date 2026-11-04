/* Carrito: lo que se va a comprar, con la imagen de cada bolsa, y el pago.
   El carrito se arma en index.html y se guarda en el navegador. */
(function () {
  var T = window.NMT, CF = T.CF;
  var $ = T.$, cop = T.cop, esc = T.esc, el = T.el, varBy = T.varBy, grindBy = T.grindBy, priceOf = T.priceOf;
  var CUENTAS = CF.cuentas || [];
  var CHECKOUT_URL = CF.checkoutUrl || "";
  var cart = T.loadCart();

  // ---- Lista del carrito ----
  var list = $("cart-list");
  function renderCart() {
    list.innerHTML = "";
    cart.forEach(function (it, idx) {
      var v = varBy(it.v), g = grindBy(it.g), f = v.foto;
      var thumb = f ? '<img class="cart-thumb" src="' + esc(f.src) + '" alt="" width="' + f.w + '" height="' + f.h + '" decoding="async">' : '<span class="cart-thumb"></span>';
      var li = el("li", { "class": "cart-line" },
        thumb +
        '<div><div class="t">' + esc(v.nombre) + " · " + it.size + " g</div><div class=\"s\">" + esc(g.short) + " · " + cop(priceOf(v, it.size)) + " c/u</div></div>" +
        '<div class="lt">' + cop(T.lineTotal(it)) + "</div>" +
        '<div class="ctl"><div class="qty qty-sm"><button type="button" data-a="minus" data-i="' + idx + '" aria-label="Menos">−</button>' +
        '<input type="number" min="1" max="99" value="' + it.q + '" data-a="set" data-i="' + idx + '" aria-label="Cantidad">' +
        '<button type="button" data-a="plus" data-i="' + idx + '" aria-label="Más">+</button></div>' +
        '<button type="button" class="link-btn" data-a="del" data-i="' + idx + '">Quitar</button></div>');
      list.appendChild(li);
    });
    var empty = cart.length === 0;
    $("cart-empty").hidden = !empty;
    $("cart-total-box").hidden = empty;
    $("cart-checkout").hidden = empty;
    $("cart-total").textContent = cop(T.cartTotal(cart));
    $("cart-h2").textContent = empty ? "Tu carrito está vacío" : "Revisa tu pedido";
    renderMsg();
  }
  list.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-a]"); if (!b) return;
    var i = parseInt(b.getAttribute("data-i"), 10), a = b.getAttribute("data-a");
    if (a === "plus") cart[i].q = Math.min(99, cart[i].q + 1);
    if (a === "minus") cart[i].q = Math.max(1, cart[i].q - 1);
    if (a === "del") cart.splice(i, 1);
    T.saveCart(cart); renderCart();
  });
  list.addEventListener("change", function (e) {
    var inp = e.target.closest("input[data-a='set']"); if (!inp) return;
    var i = parseInt(inp.getAttribute("data-i"), 10), q = parseInt(inp.value, 10);
    cart[i].q = isNaN(q) ? 1 : Math.max(1, Math.min(99, q));
    T.saveCart(cart); renderCart();
  });

  // ---- Mensaje de pedido por WhatsApp ----
  function cartText() {
    if (!cart.length) return "Tu carrito está vacío. Agrega productos en la tienda para armar el mensaje.";
    var lines = ["Hola, quiero hacer este pedido de café de Montaña Luminosa (NM):", ""];
    cart.forEach(function (it, i) {
      var v = varBy(it.v), g = grindBy(it.g);
      lines.push((i + 1) + ". " + v.nombre + " · " + it.size + " g · " + g.short + " × " + it.q + " = " + cop(T.lineTotal(it)));
    });
    lines.push("", "Subtotal: " + cop(T.cartTotal(cart)) + " COP, sin envío", "Forma de pago: transferencia bancaria");
    var f = function (id) { return $(id).value.trim(); };
    if (f("c-nombre")) lines.push("Nombre: " + f("c-nombre"));
    if (f("c-tel")) lines.push("Celular: " + f("c-tel"));
    if (f("c-ciudad")) lines.push("Ciudad: " + f("c-ciudad"));
    if (f("c-dir")) lines.push("Dirección: " + f("c-dir"));
    lines.push("", "Quedo atento a la confirmación, al valor del envío y a los datos para la transferencia.");
    return lines.join("\n");
  }
  var renderMsg = T.composer({ form: "carrito-form", build: cartText, disabled: function () { return cart.length === 0; }, preview: "c-preview", link: "c-enviar", copy: "c-copiar", status: "c-estado" });

  // ---- Pago en línea (Mercado Pago) ----
  var payBtn = $("c-pagar"), estado = $("c-estado");
  if (CHECKOUT_URL) {
    $("cart-intro").textContent = "Paga aquí mismo con tarjeta, PSE, Nequi u otros medios de Mercado Pago.";
    payBtn.hidden = false;
    $("f-email").hidden = false;
    $("c-prev-label").hidden = true; $("c-preview").hidden = true; $("c-copiar").hidden = true;
    $("c-enviar").className = "btn btn-ghost btn-wide";
    $("c-enviar").textContent = "¿Dudas? Escríbenos por WhatsApp";
    var payBox = document.querySelector(".pay-box");
    payBox.querySelector("h2").textContent = "Pago seguro con Mercado Pago";
    payBox.querySelector(".steps").innerHTML = "<li>Completas tus datos y pulsas \"Pagar con Mercado Pago\".</li><li>Pagas en la página segura de Mercado Pago, con el medio que prefieras.</li><li>Recibes la confirmación en tu correo.</li><li>Te escribimos por WhatsApp para coordinar el envío.</li>";
    $("accts").hidden = true;
    $("pay-note").textContent = "Tus datos de pago nunca pasan por esta página: los maneja Mercado Pago.";
    var busy = false;
    payBtn.addEventListener("click", function () {
      if (busy) return;
      var f = function (id) { return $(id).value.trim(); };
      if (!cart.length) { estado.textContent = "Tu carrito está vacío."; return; }
      if (!f("c-nombre") || !f("c-tel") || !f("c-ciudad") || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f("c-email"))) {
        estado.textContent = "Completa nombre, celular, correo válido y ciudad para continuar."; return;
      }
      busy = true; payBtn.disabled = true; payBtn.textContent = "Conectando con Mercado Pago…"; estado.textContent = "";
      fetch(CHECKOUT_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: f("c-nombre"), tel: f("c-tel"), email: f("c-email"), ciudad: f("c-ciudad"), direccion: f("c-dir"),
          items: cart.map(function (it) { return { v: it.v, size: it.size, g: it.g, q: it.q }; })
        })
      }).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (x) {
          if (!x.ok || !x.d.url) throw new Error(x.d && x.d.error || "Error");
          window.location.href = x.d.url;
        })
        .catch(function (e) {
          busy = false; payBtn.disabled = false; payBtn.textContent = "Pagar con Mercado Pago";
          estado.textContent = (e && e.message && e.message !== "Failed to fetch" ? e.message : "No pudimos conectar con el pago. Intenta de nuevo o escríbenos por WhatsApp.");
        });
    });
  }

  // ---- Cuentas de transferencia ----
  var accts = $("accts");
  if (CUENTAS.length) {
    CUENTAS.forEach(function (c, i) {
      var d = el("div", { "class": "acct" }, "<small>" + esc(c.medio) + "</small><span class=\"n\" id=\"acct-n-" + i + "\">" + esc(c.numero) + "</span>" +
        (c.titular ? "<span>Titular: " + esc(c.titular) + "</span>" : "") +
        '<button type="button" class="btn btn-ghost btn-sm" data-copy="' + i + '">Copiar número</button>');
      accts.appendChild(d);
    });
    $("pay-note").textContent = "Envía el comprobante por WhatsApp indicando tu nombre.";
    accts.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-copy]"); if (!b) return;
      var i = parseInt(b.getAttribute("data-copy"), 10);
      var fail = function () {
        var n = $("acct-n-" + i), r = document.createRange(); r.selectNodeContents(n);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selecciona y copia";
      };
      try { navigator.clipboard.writeText(CUENTAS[i].numero).then(function () { b.textContent = "Copiado"; }, fail); } catch (er) { fail(); }
    });
  } else if (!CHECKOUT_URL) {
    $("pay-note").textContent = "Los datos de la cuenta te los enviamos por WhatsApp cuando confirmemos tu pedido.";
  }

  renderCart();
})();
