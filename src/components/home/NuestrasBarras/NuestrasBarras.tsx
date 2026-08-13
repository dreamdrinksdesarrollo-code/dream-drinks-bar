"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { serviciosData } from "../Servicios/serviciosData";

export const NuestrasBarras = () => {
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync dots with manual scroll / touch swipe
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(el.children).indexOf(entry.target as HTMLElement);
            if (idx !== -1) setCurrent(idx);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );
    Array.from(el.children).forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.children[index] as HTMLElement;
    if (slide) el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, []);

  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % serviciosData.length;
        const el = scrollerRef.current;
        if (el) {
          const slide = el.children[next] as HTMLElement;
          if (slide) el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, 4000);
  }, []);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const prev = () => {
    stopAuto();
    scrollTo((current - 1 + serviciosData.length) % serviciosData.length);
    startAuto();
  };

  const next = () => {
    stopAuto();
    scrollTo((current + 1) % serviciosData.length);
    startAuto();
  };

  return (
    <section id="nuestras-barras" className="py-20 px-2 md:px-4 bg-surface-soft">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          title="Nuestras Barras"
          description="Cada barra es una pieza pensada para acompañar el espacio, ordenar el servicio y potenciar la experiencia del invitado."
        />

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          {/* Slides track */}
          <div
            ref={scrollerRef}
            className="flex overflow-x-auto"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {serviciosData.map((barra, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden">
                  <Image
                    src={barra.imagen}
                    alt={barra.titulo}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={85}
                    priority={i === 0}
                  />
                  {/* Dark gradient bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Slide counter */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white/80 text-xs font-medium px-3 py-1 rounded-full">
                    {i + 1} / {serviciosData.length}
                  </div>

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <h3 className="text-white text-[1.8em] md:text-[2.4em] font-bold mb-2 normal-case tracking-normal leading-tight">
                      {barra.titulo}
                    </h3>
                    <p className="text-gray-300 max-w-xl">
                      {barra.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/20 hover:bg-black/80 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/20 hover:bg-black/80 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {serviciosData.map((_, i) => (
            <button
              key={i}
              onClick={() => { stopAuto(); scrollTo(i); startAuto(); }}
              aria-label={`Ir a barra ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-gold-400" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>

        <p className="text-center text-gray-400 text-[10px] mt-6">
          La disponibilidad de cada modelo se confirma al momento de la reserva.
        </p>
      </div>
    </section>
  );
};
