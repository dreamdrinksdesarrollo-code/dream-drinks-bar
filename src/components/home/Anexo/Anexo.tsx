"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";

type ServicioExtra = {
  id: string;
  titulo: string;
  frase: string;
  resumen: string;
  detalle: string[];
  imagen: string;
  alt: string;
};

const servicios: ServicioExtra[] = [
  {
    id: "asesoramiento",
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

export const Anexo = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="otros-servicios" className="pt-16 pb-0 bg-surface-soft border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="Otros servicios"
          subtitle="Nuestra experiencia, más allá de los eventos."
          description="Aplicamos más de 12 años de experiencia en coctelería para acompañar proyectos gastronómicos y formar equipos profesionales."
        />
      </div>

      <div
        className="flex flex-col md:flex-row w-full md:h-[420px] lg:h-[480px]"
        onMouseLeave={() => setHovered(null)}
      >
        {servicios.map((s) => {
          const isHovered = hovered === s.id;
          const isExpanded = expanded === s.id;
          const isActive = isHovered || isExpanded;
          const showDetail = isExpanded || (isHovered && hovered !== null);

          const flexClass =
            hovered === null
              ? "md:flex-1"
              : isHovered
                ? "md:basis-[65%] md:flex-none"
                : "md:basis-[35%] md:flex-none";

          return (
            <button
              key={s.id}
              type="button"
              aria-expanded={isExpanded}
              onMouseEnter={() => setHovered(s.id)}
              onClick={() => setExpanded((prev) => (prev === s.id ? null : s.id))}
              className={`group relative overflow-hidden text-left w-full h-[340px] md:h-full transition-[flex-basis] duration-500 ease-[cubic-bezier(0.45,0,0.55,1)] ${flexClass}`}
            >
              <Image
                src={s.imagen}
                alt={s.alt}
                fill
                className={`object-cover transition-transform duration-700 ease-out ${
                  isActive ? "scale-[1.04]" : "scale-100"
                }`}
                sizes="(max-width: 768px) 100vw, 65vw"
                quality={90}
              />

              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  isActive ? "bg-black/35" : "bg-black/60"
                }`}
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                <h3 className="text-white text-lg md:text-xl lg:text-[1.35em] font-bold tracking-wide uppercase mb-1">
                  {s.titulo}
                </h3>
                <p className="text-white/80 italic text-sm tracking-normal font-normal normal-case mb-3">
                  {s.frase}
                </p>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    showDetail
                      ? "max-h-72 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <p className="text-white/85 text-[10px] md:text-[11px] tracking-[0.06em] uppercase font-medium leading-relaxed mb-2 max-w-lg">
                    {s.resumen}
                  </p>

                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {s.detalle.map((line, i) => (
                      <p
                        key={i}
                        className="text-white/75 text-[10px] md:text-[11px] tracking-[0.06em] uppercase font-medium leading-relaxed mb-2 max-w-lg"
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 mt-3 text-white text-[10px] tracking-[0.12em] uppercase font-semibold border-b border-white/50 pb-0.5 transition-colors duration-300 group-hover:border-gold-400">
                    Conocer más →
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-surface-soft py-10 md:py-12 text-center px-4 border-t border-white/5">
        <Link
          href="#contactos"
          className="inline-flex items-center gap-2 text-white hover:text-gold-400 font-montserrat font-semibold text-[11px] md:text-sm tracking-[0.12em] uppercase transition-colors duration-300"
        >
          ¿Tenés un proyecto gastronómico? Hablemos. →
        </Link>
      </div>
    </section>
  );
};
