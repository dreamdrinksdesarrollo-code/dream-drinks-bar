"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { serviciosExtra } from "./serviciosExtraData";

export const Anexo = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="otros-servicios" className="pt-16 pb-0 bg-surface-soft border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="Más allá de la barra"
          subtitle="Nuestra experiencia, más allá de los eventos."
          description="Aplicamos más de 12 años de experiencia en coctelería para acompañar proyectos gastronómicos y formar equipos profesionales."
        />
      </div>

      <div
        className="flex flex-col md:flex-row w-full md:h-[420px] lg:h-[480px]"
        onMouseLeave={() => setHovered(null)}
      >
        {serviciosExtra.map((s) => {
          const isHovered = hovered === s.id;
          const isExpanded = expanded === s.id;
          const showDetail = isHovered || isExpanded;
          const flexClass =
            hovered === null
              ? "md:flex-1"
              : isHovered
                ? "md:basis-[65%] md:flex-none"
                : "md:basis-[35%] md:flex-none";

          return (
            <div
              key={s.id}
              onMouseEnter={() => setHovered(s.id)}
              onClick={() => {
                if (window.matchMedia("(min-width: 768px)").matches) return;
                setExpanded((prev) => (prev === s.id ? null : s.id));
              }}
              className={`group relative overflow-hidden text-left w-full h-[340px] md:h-full transition-[flex-basis] duration-500 ease-[cubic-bezier(0.45,0,0.55,1)] ${flexClass}`}
            >
              <Image
                src={s.imagen}
                alt={s.alt}
                fill
                className={`object-cover transition-transform duration-700 ease-out ${
                  showDetail ? "scale-[1.04]" : "scale-100"
                }`}
                sizes="(max-width: 768px) 100vw, 65vw"
                quality={90}
              />

              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  isExpanded
                    ? "bg-black/75"
                    : isHovered
                      ? "md:bg-black/35 bg-black/55"
                      : "bg-black/55"
                }`}
              />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 md:hidden ${
                  isExpanded ? "opacity-100" : "opacity-40"
                }`}
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                <h3 className="text-gold-400 text-lg md:text-xl lg:text-[1.35em] font-bold tracking-wide uppercase mb-1">
                  {s.titulo}
                </h3>
                <p className="text-white/80 italic text-sm tracking-normal font-normal normal-case mb-3">
                  {s.frase}
                </p>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    showDetail
                      ? "max-h-40 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <p className="text-white/85 text-[10px] md:text-[11px] tracking-[0.06em] uppercase font-medium leading-relaxed mb-3 max-w-lg line-clamp-3">
                    {s.resumen}
                  </p>
                  <Link
                    href={`/otros-servicios/${s.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-white text-[10px] tracking-[0.12em] uppercase font-semibold border-b border-gold-400/70 pb-0.5 group-hover:text-gold-400 transition-colors duration-300"
                  >
                    Conocer más →
                  </Link>
                </div>
              </div>
            </div>
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
