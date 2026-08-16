export type ServicioExtra = {
  id: string;
  slug: string;
  titulo: string;
  frase: string;
  resumen: string;
  detalle: string[];
  imagen: string;
  alt: string;
};

export const serviciosExtra: ServicioExtra[] = [
  {
    id: "asesoramiento",
    slug: "asesoramiento-gastronomico",
    titulo: "Asesoramiento gastronómico",
    frase: "Creamos propuestas con identidad.",
    resumen:
      "Creamos propuestas de coctelería con identidad propia. Acompañamos a bares, restaurantes y proyectos gastronómicos en el desarrollo y renovación de sus cartas de bebidas.",
    detalle: [
      "Analizamos el concepto, el público y la dinámica de cada negocio para desarrollar una propuesta equilibrada entre identidad, creatividad, operatividad y rentabilidad.",
      "Desde la creación de cócteles hasta la selección de insumos, presentación y organización de la barra.",
    ],
    imagen: "/assets/cartas.jpeg",
    alt: "Asesoramiento gastronómico Dream Drinks",
  },
  {
    id: "capacitacion",
    slug: "capacitacion-de-bartenders",
    titulo: "Capacitación de bartenders",
    frase: "Formamos mejores equipos.",
    resumen:
      "Formamos equipos preparados para brindar una mejor experiencia. Capacitaciones diseñadas para bartenders y equipos gastronómicos que buscan profesionalizar su servicio.",
    detalle: [
      "Trabajamos sobre técnicas de coctelería, organización de barra, velocidad de servicio, presentación, atención al cliente y buenas prácticas de trabajo.",
      "Las capacitaciones se adaptan al nivel, las necesidades y la propuesta gastronómica de cada equipo.",
    ],
    imagen: "/assets/capacitacion.jpeg",
    alt: "Capacitación de bartenders Dream Drinks",
  },
];

export const getServicioExtraBySlug = (slug: string) =>
  serviciosExtra.find((s) => s.slug === slug);
