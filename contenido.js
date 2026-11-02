/* =====================================================================
   CONTENIDO DEL SITIO · Nicole Montes (NM)
   Aquí editas TODO el texto, los precios y los planes sin tocar las páginas.
   Reglas simples:
   - Todo texto va entre comillas "así".
   - Cada elemento de una lista termina con coma , (menos el último, si quieres).
   - Para agregar un servicio, plan o variedad: copia un bloque { ... }, pégalo debajo y cambia el texto.
   - Para ocultar algo opcional, déjalo vacío: "".
   Después de editar, guarda los cambios (Commit changes en GitHub) y recarga la página.
   ===================================================================== */
window.NM = {

  /* ---------- DATOS GENERALES (se usan en todo el sitio) ---------- */
  marca: {
    nombre: "Nicole Montes",
    lema: "Abogada · Turismo · Café",
    ciudad: "Neiva, Huila, Colombia"
  },
  contacto: {
    whatsapp: "573178125021",                 // solo números, con 57 al inicio
    telefonos: ["317 812 5021", "312 384 7852"],
    email: "",                                // opcional: tucorreo@ejemplo.com
    instagram: "https://www.instagram.com/nicoleemontes28",
    tiktok: "https://www.tiktok.com/@nicoleabogadaviajera",
    facebook: "https://www.facebook.com/share/1JP1Uoko3y/"
  },

  /* ---------- PORTADA (index.html) ---------- */
  portada: {
    titulo: "Derecho, viajes y café, con el sello del Huila",
    texto: "Tres caminos para trabajar contigo: asesoría jurídica clara, planes de viaje por el Huila y café de especialidad directo de la asociación que lo produce.",
    sobre: {
      titulo: "Quién está detrás",
      texto: [
        "Nicole Montes es abogada y emprendedora del Huila. Además de acompañar asuntos legales, impulsa el turismo de la región y comercializa café de especialidad de la Asociación Montaña Luminosa.",
        "Cada área tiene su propia página, con servicios, precios y formas de contacto claras. Eliges lo que necesitas y escribes directo por WhatsApp."
      ]
    },
    galeriaTitulo: "Un vistazo a lo que hacemos",
    galeria: [
      { src: "img/cafetal-recoleccion.jpg", pos: "50% 30%", alt: "Mujer recogiendo café a mano entre las matas", pie: "Café del Huila" },
      { src: "img/la-morra.jpg", alt: "Un vaso de café frente a un globo aerostático y un valle con embalse", pie: "Viajes y paisajes" },
      { src: "img/taza-cafe-colombia.jpg", alt: "Taza de café servida sobre granos", pie: "Café de especialidad" },
      { src: "img/tienda-luminosa.jpg", pos: "50% 58%", alt: "Tienda Interactiva Luminosa, un puesto de café con frente de jeep", pie: "Tienda Interactiva Luminosa" }
    ],
    confianza: [
      { titulo: "Atención directa", texto: "Hablas con una persona por WhatsApp, sin intermediarios ni formularios eternos." },
      { titulo: "Raíces en el Huila", texto: "Todo nace en el departamento: su gente, sus paisajes y su café." },
      { titulo: "Café con origen comprobable", texto: "El empaque lleva origen, variedad y puntaje de cata impresos en la etiqueta." },
      { titulo: "Pago seguro", texto: "El café se paga en línea con Mercado Pago, sin compartir tus datos con nosotros." }
    ],
    opciones: [
      {
        clave: "abogacia", titulo: "Asesoría jurídica",
        texto: "Orienta tu caso con una abogada: claro, confidencial y sin tecnicismos.",
        puntos: ["Consulta virtual o presencial", "Contratos y trámites", "Acompañamiento paso a paso"],
        boton: "Pedir asesoría", enlace: "abogacia.html"
      },
      {
        clave: "turismo", titulo: "Planes de viaje",
        texto: "Rutas por el Huila armadas a tu medida: naturaleza, cultura y café.",
        puntos: ["Planes listos para cotizar", "Viajes personalizados", "Ruta del café"],
        boton: "Ver planes de viaje", enlace: "turismo.html"
      },
      {
        clave: "cafe", titulo: "Café de especialidad",
        texto: "Café de origen Huila de la Asociación Montaña Luminosa y de la marca Casas Montilla, con ficha de cata.",
        puntos: ["Castillo, Borbón rosado y Pacamara", "Bolsas de 250 g y 500 g", "Pago en línea"],
        boton: "Ir a la página del café", enlace: "cafe.html"
      }
    ]
  },

  /* ---------- ABOGACÍA (abogacia.html) ---------- */
  abogacia: {
    titulo: "Asesoría jurídica clara y cercana",
    texto: "Cuéntanos tu situación y te orientamos sobre los caminos legales posibles, con lenguaje sencillo y atención personal.",
    tarjetaProfesional: "",                   // ej. "T.P. 000.000 del C.S. de la J." (si queda vacío, no se muestra)
    universidad: "",                          // opcional
    /* Seguimiento de casos: pega aquí la dirección de tu función "caso" (ver LEEME).
       Mientras esté vacío, el caso se envía por WhatsApp y no hay consulta de avance en la página. */
    casosUrl: "https://ffsxpeqshkxmwhlguxmj.supabase.co/functions/v1/caso",
    /* Qué significa cada estado, tal como lo lee el cliente al consultar su proceso. */
    estados: {
      "recibido": "Recibimos tu caso. Lo vamos a revisar y te escribimos pronto.",
      "en revisión": "Estamos analizando tu caso y tus documentos.",
      "pendiente de documentos": "Necesitamos documentos o información de tu parte. Revisa las novedades.",
      "en trámite": "Tu caso ya está en marcha. Aquí verás cada novedad.",
      "finalizado": "Tu caso terminó. Gracias por confiar en nosotros."
    },
    /* Áreas de atención. EJEMPLOS: reemplázalos por las áreas reales. */
    servicios: [
      { titulo: "Derecho de familia", texto: "Alimentos, custodia, divorcio, sucesiones y acuerdos familiares." },
      { titulo: "Contratos y derecho comercial", texto: "Revisión y redacción de contratos, constitución de empresas y asociaciones." },
      { titulo: "Derecho laboral", texto: "Contratos de trabajo, liquidaciones, despidos y reclamaciones." },
      { titulo: "Inmuebles y propiedad", texto: "Compraventas, arrendamientos, promesas y títulos." },
      { titulo: "Derecho civil", texto: "Reclamaciones, cobros, responsabilidad civil y conciliación." },
      { titulo: "Turismo y emprendimiento", texto: "Formalización de negocios turísticos, contratos con proveedores y permisos." }
    ],
    pasos: [
      { titulo: "Cuéntanos tu caso", texto: "Escribes por WhatsApp o llenas el formulario con lo que sabes." },
      { titulo: "Revisamos y te orientamos", texto: "Analizamos tu situación y te decimos qué opciones existen." },
      { titulo: "Acordamos el alcance", texto: "Te explicamos cómo trabajamos y los honorarios antes de empezar." },
      { titulo: "Te acompañamos", texto: "Seguimos el trámite contigo y te mantenemos informado." }
    ],
    preguntas: [
      { p: "¿La consulta es virtual o presencial?", r: "Ambas. Por videollamada o WhatsApp puedes consultar desde cualquier ciudad; la atención presencial se coordina en Neiva." },
      { p: "¿Cuánto cuesta?", r: "Depende del tipo de asunto y de su complejidad. Antes de empezar te informamos el valor y el alcance del servicio." },
      { p: "¿Mi información es confidencial?", r: "Sí. Lo que cuentas se maneja con reserva profesional. Aun así, evita enviar documentos sensibles por el formulario; los pedimos después por un canal acordado." },
      { p: "¿Qué debo tener a mano?", r: "Un resumen de lo ocurrido, fechas importantes y los documentos que tengas (contratos, cartas, mensajes). Si no los tienes, igual puedes escribirnos." }
    ],
    aviso: "La información de esta página es general y no reemplaza una asesoría legal personalizada. La relación de servicio comienza cuando se acuerda la consulta."
  },

  /* ---------- TURISMO (turismo.html) ---------- */
  turismo: {
    titulo: "Planes de viaje por el Huila",
    texto: "Elige un plan, pide una cotización o cuéntanos cómo imaginas tu viaje y lo armamos contigo.",
    /* Planes. EJEMPLOS: reemplázalos por tus planes reales.
       tipo: "naturaleza" | "cultura" | "cafe" | "aventura"  (cambia el color del dibujo)
       desde: precio por persona en pesos, solo el número (0 = "Cotiza por WhatsApp")
       foto: ruta de una foto subida a la carpeta img, ej. "img/tatacoa.jpg" (opcional) */
    planes: [
      {
        nombre: "Ruta del café", destino: "Huila · fincas de la Asociación Montaña Luminosa", tipo: "cafe",
        duracion: "1 día", desde: 0, foto: "img/cafetal-recoleccion.jpg",
        texto: "Conoce el entorno del café, su proceso y a las familias que lo producen, con degustación de cata.",
        incluye: ["Recorrido por finca cafetera", "Explicación del proceso", "Degustación de café"]
      },
      {
        nombre: "San Agustín y su parque arqueológico", destino: "San Agustín, Huila", tipo: "cultura",
        duracion: "2 días / 1 noche", desde: 0, foto: "",
        texto: "Esculturas ancestrales, paisajes de montaña y la cultura que hizo famoso al sur del Huila.",
        incluye: ["Visita al parque arqueológico", "Recorrido por miradores", "Asesoría para tu viaje"]
      },
      {
        nombre: "Desierto de la Tatacoa", destino: "Villavieja, Huila", tipo: "aventura",
        duracion: "1 a 2 días", desde: 0, foto: "",
        texto: "Cañones rojos y grises, cielos limpios y noches para mirar las estrellas.",
        incluye: ["Recorrido por el desierto", "Observación de estrellas", "Asesoría para tu viaje"]
      },
      {
        nombre: "Neiva y sus alrededores", destino: "Neiva, Huila", tipo: "naturaleza",
        duracion: "1 día", desde: 0, foto: "",
        texto: "Una ciudad cálida con río, gastronomía y planes cortos para conocer el Huila sin complicarte.",
        incluye: ["Recorrido por la ciudad", "Gastronomía regional", "Asesoría para tu viaje"]
      }
    ],
    cuentanos: {
      titulo: "¿No ves tu plan? Lo armamos contigo",
      texto: "Cuéntanos a dónde quieres ir, con quién y cuándo. Te respondemos con una propuesta."
    },
    aviso: "Los precios y la disponibilidad se confirman al cotizar, según fechas y número de personas."
  },

  /* ---------- CAFÉ (cafe.html) ---------- */
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
                alt: "Bolsa blanca de café Casas Montilla, variedad Pacamara, 500 g, con una taza de café, granos y cerezas de café al fondo" } }
    ],

    /* Marcas que se muestran, pequeñas, al final de la página del café */
    marcasTitulo: "Nuestras marcas",
    marcas: [
      { nombre: "NM · Nicole Montes", logo: "img/nm-logo-pequeno.png", w: 320, h: 216, alt: "Logo de Nicole Montes: abogada, turismo, café" },
      { nombre: "Casas Montilla", logo: "img/logo-casas-montilla.png", w: 320, h: 268, alt: "Logo de Casas Montilla" }
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
