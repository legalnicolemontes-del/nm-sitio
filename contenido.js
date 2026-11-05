/* =====================================================================
   CONTENIDO DEL SITIO · Nicole Montes (NM)
   Aquí editas TODO el texto y los precios de la tienda de café sin tocar las páginas.
   Reglas simples:
   - Todo texto va entre comillas "así".
   - Cada elemento de una lista termina con coma , (menos el último, si quieres).
   - Para agregar una variedad: copia un bloque { ... } de "variedades", pégalo debajo y cambia el texto.
   - Para ocultar algo opcional, déjalo vacío: "".
   Después de editar, guarda los cambios (Commit changes en GitHub) y recarga la página.
   ===================================================================== */
window.NM = {

  /* ---------- DATOS GENERALES (se usan en todo el sitio) ---------- */
  marca: {
    nombre: "Nicole Montes",
    lema: "Café de especialidad · Huila",
    ciudad: "Neiva, Huila, Colombia"
  },
  contacto: {
    whatsapp: "573123847852",                 // solo números, con 57 al inicio
    telefonos: ["317 812 5021", "312 384 7852"],
    email: "",                                // opcional: tucorreo@ejemplo.com
    instagram: "https://www.instagram.com/nicoleemontes28",
    tiktok: "https://www.tiktok.com/@nicoleabogadaviajera",
    facebook: "https://www.facebook.com/share/1JP1Uoko3y/"
  },

  /* ---------- QUIÉN ESTÁ DETRÁS (sección "Nosotros" de la página) ---------- */
  sobre: {
    titulo: "Quién está detrás del café",
    etiquetas: ["Huilense", "Administradora de empresas", "Guía profesional de turismo"],
    foto: { src: "img/nicole.jpg", w: 900, h: 1200,
            alt: "Nicole Montes con sombrero blanco, sentada entre matas de café cargadas de cerezas y señalando las ramas" },
    texto: [
      "Nicole Montes es huilense, administradora de empresas y guía profesional de turismo. Comercializa el café de la Asociación Montaña Luminosa y de la marca Casas Montilla, directo de quienes lo cultivan.",
      "Cree en un precio justo para el campesino y en que cada bolsa llegue con su historia: variedad, proceso, altura y puntaje de cata a la vista.",
      "Cuando escribes por WhatsApp te responde una persona, no un formulario."
    ]
  },

  /* ---------- CAFÉ (index.html) ---------- */
  cafe: {
    /* Precios por defecto (pesos colombianos) por tamaño de bolsa. */
    precios: { 250: 25000, 500: 40000 },

    /* Pago en línea: pega aquí la dirección de tu función create-checkout (ver LEEME).
       Mientras esté vacío, el pedido se envía por WhatsApp y se paga por transferencia. */
    checkoutUrl: "https://ffsxpeqshkxmwhlguxmj.supabase.co/functions/v1/create-checkout",

    /* Cuentas para transferencia (opcional). Ejemplo:
       { medio: "Bancolombia · Cuenta de ahorros", numero: "000-000000-00", titular: "Nombre del titular" } */
    cuentas: [],

    /* Variedades. Para completar una ficha de cata agrega: puntaje, proceso, aroma, sabor, acidez, cuerpo, altura, origen.
       Para un precio propio: precios: { 250: 0, 500: 0 }  */
    variedades: [
      { id: "castillo", nombre: "Castillo", puntaje: 86.5, proceso: "Lavado", aroma: "Frutal", sabor: "Frutas cítricas, chocolatadas",
        acidez: "Limpia y brillante", cuerpo: "Muy balanceado", altura: "1800 msnm", origen: "Palermo, Huila, Colombia",
        foto: { src: "img/castillo.jpg", w: 1000, h: 1333, fit: "contain",
                alt: "Bolsa de café kraft de Montaña Luminosa, edición especial Miss Universe Switzerland, café de origen Huila, con una taza de café y un costal de granos" } },
      { id: "borbon-rosado", nombre: "Borbón rosado", puntaje: 88.5, marca: "Casas Montilla",
        proceso: "Lavado, fermentación de 100 horas, secado en marquesina",
        aroma: "Dulce, frutos rojos, caramelo, higos en conserva, cítrico de naranja, floral",
        sabor: "Dulce, eucalipto, kiwi, manzana verde", acidez: "Media", cuerpo: "Redondo",
        altura: "1600 - 1800 msnm", origen: "Vereda El Jordán, Palermo, Huila, Colombia",
        precios: { 250: 30000, 500: 50000 },
        foto: { src: "img/borbon-rosado.jpg", w: 768, h: 1024, fit: "contain",
                alt: "Bolsa de café Casas Montilla, variedad Bourbon rosado, 500 g, junto a una planta de café y una cafetera Chemex" } },
      /* Pacamara: su etiqueta no trae puntaje en taza; cuando lo tengas agrega puntaje: 00.0 */
      { id: "pacamara", nombre: "Pacamara", marca: "Casas Montilla",
        proceso: "Honey, fermentación de 80 horas en cereza",
        aroma: "Caramelo, avellana tostada",
        sabor: "Melocotón (durazno), kiwi, chocolate especiado", acidez: "Láctica", cuerpo: "Sedoso",
        altura: "1600 msnm", origen: "Vereda El Jordán, Palermo, Huila, Colombia",
        precios: { 500: 60000 },   /* solo se vende en bolsa de 500 g: sin precio de 250 g no aparece ese tamaño */
        foto: { src: "img/pacamara.jpg", w: 1000, h: 1333, fit: "contain",
                alt: "Bolsa blanca de café Casas Montilla, variedad Pacamara, 500 g, con una taza de café, granos y cerezas de café al fondo" } },
      /* Aromática de cereza de café: se vende en sachets de 16 g, sin molienda.
         PRECIO: el valor de cada sachet está en precios ({ 16: 5000 }). Si lo cambias, cámbialo también en
         supabase/functions/_shared/catalog.ts y vuelve a desplegar. Si lo pones en 0, la tienda muestra
         "Consulta el precio por WhatsApp" y no deja agregarla al carrito. */
      { id: "aromatica", tipo: "infusion", nombre: "Aromática de cereza de café", corto: "Aromática de cereza", marca: "Casas Montilla",
        presentacion: "Sachet de 16 g (2 bolsitas)", origen: "Departamento del Huila, Colombia",
        descripcion: [
          "Infusión (té) elaborada a partir del aprovechamiento sostenible de la pulpa o cereza del café.",
          "Es de la marca Casas Montilla, del departamento del Huila."
        ],
        detalles: [
          ["Cajitas", "De 10 a 12 unidades (consulta el precio por WhatsApp)"],
          ["Líneas especiales", "Mezclas con flor de Jamaica, anís estrellado, cardamomo y frutas deshidratadas"]
        ],
        precios: { 16: 5000 },
        foto: { src: "img/aromatica.jpg", w: 1000, h: 1333, fit: "contain",
                alt: "Sobre blanco de Infusión de Cereza de Café, Casas Montilla, departamento del Huila, contenido neto 16 g, entre cerezas rojas y granos de café" } }
    ],

    /* "¿No sabes cuál elegir?": cada opción lleva a una variedad (usa su id) */
    elegir: {
      titulo: "¿No sabes cuál elegir?",
      texto: "Dinos qué sabor te gusta y te mostramos tu café.",
      opciones: [
        { etiqueta: "Dulce y frutal", variedad: "borbon-rosado", nota: "Frutos rojos, caramelo, kiwi y manzana verde: el Borbón rosado, de acidez media y cuerpo redondo." },
        { etiqueta: "Cítrico y achocolatado", variedad: "castillo", nota: "Frutas cítricas y chocolate, con acidez limpia y brillante: el Castillo, muy balanceado." },
        { etiqueta: "Sedoso y con fruta", variedad: "pacamara", nota: "Melocotón, kiwi y chocolate especiado, de cuerpo sedoso y acidez láctica: el Pacamara." }
      ]
    },

    /* "Del cafetal a tu taza": pasos de la franja oscura */
    etapas: {
      eyebrow: "Del cafetal a tu taza",
      titulo: "Así llega el café hasta ti",
      pasos: [
        { titulo: "La mata", texto: "Se cultiva en Palermo, Huila, entre 1.600 y 1.800 metros de altura." },
        { titulo: "La cosecha", texto: "Las cerezas se recogen a mano, cuando están maduras." },
        { titulo: "El proceso", texto: "Cada variedad tiene el suyo: lavado o honey, con fermentaciones controladas de 80 a 100 horas." },
        { titulo: "Tu bolsa", texto: "Se tuesta, se muele como tú pidas y llega con su ficha de cata y las fechas de tostado y de vencimiento." }
      ]
    },

    /* Sección de la aromática en la página. El producto (precio, sobre de 16 g, foto) está en "variedades", id "aromatica". */
    aromatica: {
      variedad: "aromatica",
      etiqueta: "Ya disponible",
      titulo: "Aromática de cereza de café",
      textos: [
        "Infusión (té) elaborada a partir del aprovechamiento sostenible de la pulpa o cereza del café, la fruta que envuelve la semilla. Es de la marca Casas Montilla, del departamento del Huila.",
        "Agrégala al carrito junto con tu café, o escríbenos si quieres más información."
      ],
      lista: [
        { titulo: "Presentaciones", texto: "Sachets individuales de 16 g (contienen 2 bolsitas) y cajitas de 10 a 12 unidades. Para las cajitas, consulta el precio por WhatsApp." },
        { titulo: "Líneas especiales", texto: "Mezclas personalizadas infusionadas con flor de Jamaica, anís estrellado, cardamomo y frutas deshidratadas." }
      ],
      ingredientes: { src: "img/aromatica-ingredientes.jpg", w: 705, h: 382,
        alt: "Taza de infusión roja rodeada de flor de Jamaica, anís estrellado, cardamomo, frutas deshidratadas y cerezas",
        pie: "Líneas especiales: flor de Jamaica, anís estrellado, cardamomo y frutas deshidratadas." },
      mensaje: "Hola, quiero información sobre la aromática (té de cereza de café) de Casas Montilla: sachets de 16 g y cajitas.",
      foto: { src: "img/aromatica.jpg", w: 1000, h: 1333, alt: "Sobre blanco de Infusión de Cereza de Café, Casas Montilla, departamento del Huila, contenido neto 16 g, entre cerezas rojas y granos de café" }
    },

    /* También viene: métodos de preparación. Cuando estén a la venta, cámbialo por productos con precio. */
    metodos: {
      etiqueta: "Muy pronto",
      titulo: "Métodos de preparación",
      textos: [
        "También vamos a vender métodos de preparación, para que prepares tu café en casa y le saques todo su sabor.",
        "Cuéntanos qué método usas o cuál te gustaría probar, y te avisamos cuando estén disponibles."
      ],
      cta: "Quiero saber más",
      mensaje: "Hola, me interesa saber cuándo tendrán a la venta métodos de preparación de café."
    },

    /* Marcas que se muestran, pequeñas, al final de la página del café */
    marcasTitulo: "Nuestras marcas",
    marcas: [
      { nombre: "NM · Nicole Montes", logo: "img/nm-logo-pequeno.png", w: 320, h: 190, alt: "Logo de Nicole Montes" },
      { nombre: "Casas Montilla", logo: "img/logo-casas-montilla.png", w: 320, h: 268, alt: "Logo de Casas Montilla" },
      /* mascara: true pinta el logo blanco de img/ml-logo.png con un color oscuro, para verse sobre fondo claro */
      { nombre: "Montaña Luminosa", mascara: true, alt: "Logo de la Asociación Montaña Luminosa" },
      { nombre: "David Santiago Andrade Gómez", logo: "img/logo-david-santiago.png", w: 183, h: 202, alt: "Logo de David Santiago Andrade Gómez, matemático aplicado",
        pie: "David Santiago Andrade Gómez · Matemático aplicado" }
    ],

    /* Texto "¿Quiénes somos?" de la Asociación Montaña Luminosa */
    asociacion: {
      titulo: "Asociación Montaña Luminosa",
      parrafos: [
        "Montaña Luminosa es una asociación de emprendedores y productores de cafés especiales con procesos diferenciados. Nace del deseo de unificar esfuerzos y resaltar la riqueza y la trazabilidad del café huilense: un proyecto posterior a la pandemia, donde entendimos que la unión hace la fuerza.",
        "Nuestro enfoque está en la perfilación de taza y en estándares de alta calidad, reflejados en la pasión de productores y recolectores. Contamos con fincas certificadas y sellos de calidad Rainforest Alliance y 4C. Nuestro mayor legado para nuestros hijos: la sostenibilidad alimentaria y la economía circular, transformando y aprovechando los subproductos de la cosecha.",
        "En la Tienda Interactiva Montaña Luminosa se impulsa el empoderamiento de la mujer cafetera como parte esencial de la cadena del café, y se abre a niños y jóvenes la oportunidad de vivir y conocer el entorno del café. Nuestro mayor potencial es ofrecer experiencia y una ruta mágica del café: ese oro verde es la única fuente de ingreso de muchas familias.",
        "Aspiramos a ser la conexión directa y así evitar intermediarios, creando lazos entre los amantes apasionados del café y quienes apenas están incursionando."
      ],
      proposito: "Con NM, el café llega al cliente con un precio justo para el campesino, para reducir la brecha social y la inequidad en el campo."
    }
  }
};
