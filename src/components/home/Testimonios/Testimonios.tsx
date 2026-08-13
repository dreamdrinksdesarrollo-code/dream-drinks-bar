"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const testimonios = [
  {
    nombre: "Victoria Iturriaga",
    evento: "Boda · Corrientes",
    texto:
      "Hola Seba!! Te quería agradecer por todo, todos los comentarios de la gente muy buenos y todos hablando súper bien de la barra y los tragos.  Y gracias por estar también vos hasta el final!! Todo espectacular!!!.",
    estrellas: 5,
  },
  {
    nombre: "Rocío Delsin",
    evento: "Fiesta de 15 · Corrientes",
    texto:
      "Seba quiero agradecerte por la atención de ayer y por estar en todos los detalles!! La barra fue un éxito!!  E staban todos alrededor de esa barra no se movían de ahí!!! Tu gente recontra laburando, atendiendo a todos los jóvenes y a los adultos también excelente su servicio!! Y sobre todo la calidez humana!! Muy agradecida Seba!! Un placer haber trabajado con Ustedes!",
    estrellas: 5,
  },
  {
    nombre: "Guadalupe Altube",
    evento: "Evento corporativo",
    texto:
      "Espectacular, todo como todos los años!! No hubo absolutamente ninguna queja de la gente!! Nos atendieron súper bien, nos llevaron los Aperol,  nos sirvieron en bandeja, súper bien preparado riquísimo!! Así que espectacular, solamente felicitaciones y agradecimientos!!!",
    estrellas: 5,
  },
  {
    nombre: "Johana Yaccuzzi",
    evento: "Fiesta de 15",
    texto:
      "Seba cómo estás? Nada más que palabras de agradecimiento saben el cariño que le tenemos toda la familia! Agradecerle la predisposición la buena onda. Fran estaba feliz, que era lo que nos importaba a todos! Me alegro mucho que hayan sido ustedes quienes estaban ahí desde su trabajo y también desde la presencia y nada muy muy felices de toda la gente estaba súper conforme como siempre su trabajo, es impecable!!! Es un placer contratarlos. Gracias gracias y gracias!!!",
    estrellas: 5,
  },
];

const empresas = [
  { nombre: "Big Jim", src: "/assets/logoEmpresas/BIG JIM.png" },
  { nombre: "CPCE Corrientes", src: "/assets/logoEmpresas/CCCE.png" },
  { nombre: "Corrientes Tennis Club", src: "/assets/logoEmpresas/CTC.png" },
  { nombre: "Grupo Meucci", src: "/assets/logoEmpresas/GRUPO MEUCCI.png" },
  { nombre: "Monks", src: "/assets/logoEmpresas/MONKS.png" },
  { nombre: "Óga Pizzeria", src: "/assets/logoEmpresas/OGA.png" },
  { nombre: "Pepe", src: "/assets/logoEmpresas/PEPE.png" },
  { nombre: "Torre Rivera", src: "/assets/logoEmpresas/TORRE RIVERA.png" },
];

const StarIcon = () => (
  <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const Testimonios = () => {
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Update active dot based on scroll position
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(el.children).indexOf(entry.target as HTMLElement);
            if (index !== -1) setCurrent(index);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );
    Array.from(el.children).forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, []);

  const prev = () => scrollTo((current - 1 + testimonios.length) % testimonios.length);
  const next = () => scrollTo((current + 1) % testimonios.length);

  return (
    <section id="testimonios" className="py-20 bg-surface-soft">
      <style>{`
        .testimonios-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .testimonios-scroll::-webkit-scrollbar { display: none; }
        @keyframes marquee-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-slide 40s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .empresa-logo {
          filter: brightness(0) invert(1);
          opacity: 0.35;
          transition: opacity 0.3s ease;
        }
        .empresa-logo:hover { opacity: 0.7; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <SectionHeader
          className="mb-14"
          title="Lo que dicen quienes confiaron en nosotros"
          description="La mayor satisfacción de nuestro trabajo es formar parte de momentos únicos y superar las expectativas de cada cliente. Estas son algunas de las experiencias de quienes eligieron Dream Drinks para sus eventos."
        />

        {/* Carousel */}
        <div className="relative">
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hidden sm:flex"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards */}
          <div
            ref={scrollerRef}
            className="testimonios-scroll flex gap-5 overflow-x-auto"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonios.map((t, i) => (
              <div
                key={i}
                style={{ scrollSnapAlign: "start" }}
                className="flex-shrink-0 w-[82vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)] bg-white/[0.04] border border-white/8 rounded-2xl p-7 flex flex-col gap-5 hover:border-gold-400/25 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.estrellas }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 flex-1">
                  &ldquo;{t.texto}&rdquo;
                </p>

                {/* Client */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  {/* <div className="w-9 h-9 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-400 font-bold">{t.nombre[0]}</span>
                  </div> */}
                  <div>
                    <p className="text-white font-semibold leading-tight">{t.nombre}</p>
                    {/* <p className="text-gold-400/60 text-[10px] mt-0.5">{t.evento}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hidden sm:flex"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-7">
          {testimonios.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-gold-400" : "w-1.5 bg-white/20"
              }`}
              aria-label={`Ir al testimonio ${i + 1}`}
            />
          ))}
        </div>

        {/* Footer text */}
        <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto uppercase text-[10px] tracking-[0.08em] font-medium leading-relaxed">
          * Más de 850 eventos realizados y cientos de clientes que confiaron en nosotros para
          acompañar algunos de los momentos más importantes de sus vidas.
        </p>

        {/* Empresas que confiaron */}
        <div className="border-t border-white/8 pt-14 mt-14 overflow-hidden">
          <p className="text-center text-gray-400 text-[10px] uppercase tracking-[0.08em] font-medium mb-10">
            Empresas que confiaron en nosotros
          </p>
          <div className="overflow-hidden">
            <div className="marquee-track flex items-center gap-8 md:gap-24 w-max">
              {[...empresas, ...empresas].map((empresa, i) => (
                <div
                  key={`${empresa.nombre}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center w-[110px] md:w-[130px] h-12 md:h-14"
                  title={empresa.nombre}
                >
                  <Image
                    src={empresa.src}
                    alt={empresa.nombre}
                    width={130}
                    height={56}
                    className="empresa-logo w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
