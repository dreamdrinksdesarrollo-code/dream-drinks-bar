"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { SectionHeader, sectionDescClass } from "@/components/shared/SectionHeader";
import { serviciosData } from "./serviciosData";

const TOTAL = serviciosData.length;
const AUTO_MS = 5000;
const TRANSITION_MS = 700;

export const Servicios = () => {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const prevIndex = useRef(0);

  const stopAuto = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  const goTo = useCallback((index: number) => {
    const next = ((index % TOTAL) + TOTAL) % TOTAL;
    const from = prevIndex.current;
    const wrapping =
      (from === TOTAL - 1 && next === 0) || (from === 0 && next === TOTAL - 1);

    if (wrapping) {
      setAnimate(false);
      prevIndex.current = next;
      setCurrent(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
      return;
    }

    setAnimate(true);
    prevIndex.current = next;
    setCurrent(next);
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    autoRef.current = setInterval(() => {
      goTo(prevIndex.current + 1);
    }, AUTO_MS);
  }, [goTo, stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const prev = () => {
    stopAuto();
    goTo(current - 1);
    startAuto();
  };

  const next = () => {
    stopAuto();
    goTo(current + 1);
    startAuto();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    stopAuto();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? current + 1 : current - 1);
    }
    startAuto();
  };

  return (
    <section id="servicios" className="pt-20 pb-0 bg-surface-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <SectionHeader
          title="Nuestras Barras"
          subtitle="Elegí el diseño que mejor represente tu evento."
          description="Cada celebración es diferente. Por eso desarrollamos una línea de barras modulares que combinan diseño, funcionalidad y versatilidad."
        />

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex will-change-transform"
              style={{
                transform: `translate3d(-${current * 100}%, 0, 0)`,
                transition: animate
                  ? `transform ${TRANSITION_MS}ms cubic-bezier(0.45, 0, 0.55, 1)`
                  : "none",
              }}
            >
              {serviciosData.map((barra, i) => {
                const fitContain = "objectFit" in barra && barra.objectFit === "contain";
                return (
                <div key={i} className="w-full flex-shrink-0">
                  <div
                    className={`relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden ${
                      fitContain ? "bg-black" : ""
                    }`}
                  >
                    <Image
                      src={barra.imagen}
                      alt={barra.titulo}
                      fill
                      className={
                        fitContain
                          ? "object-cover object-top md:object-contain md:object-top md:scale-[1.45] md:origin-top"
                          : "object-cover object-center"
                      }
                      sizes="100vw"
                      quality={85}
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white/80 text-xs font-medium px-3 py-1 rounded-full">
                      {i + 1} / {TOTAL}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-10">
                      <h3 className="text-white text-sm sm:text-base md:text-[2.4em] font-semibold md:font-bold mb-1 md:mb-2 normal-case tracking-normal leading-snug md:leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_2px_12px_rgba(0,0,0,0.75)] md:[text-shadow:none]">
                        {barra.titulo}
                      </h3>
                      <p className="text-white/85 md:text-gray-300 text-[10px] sm:text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-none max-w-xl [text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_2px_10px_rgba(0,0,0,0.7)] md:[text-shadow:none]">
                        {barra.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/20 hover:bg-black/80 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

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
              onClick={() => {
                stopAuto();
                goTo(i);
                startAuto();
              }}
              aria-label={`Barra ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modalidades — fondo negro a full bleed */}
      <div className="mt-16 bg-surface border-t border-white/10 pt-14 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h3 className="text-center text-white tracking-wide mb-4 uppercase">
            Adaptamos la barra a tu evento.
          </h3>
          <p className={`${sectionDescClass} max-w-3xl mx-auto text-center mb-10`}>
            Independientemente de la estética que elijas, nuestras barras pueden configurarse de
            distintas maneras para adaptarse a la cantidad de invitados, la circulación y las
            características del lugar del evento.
          </p>
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl aspect-video overflow-hidden">
              <Image
                src="/assets/modalidades.png"
                alt="Configuraciones de barras Dream Drinks"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                quality={90}
              />
              {/* Degradado en los bordes hacia negro */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    linear-gradient(to right, #000 0%, transparent 18%, transparent 82%, #000 100%),
                    linear-gradient(to bottom, #000 0%, transparent 20%, transparent 80%, #000 100%)
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
