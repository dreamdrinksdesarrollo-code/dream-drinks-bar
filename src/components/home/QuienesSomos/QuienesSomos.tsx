"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeader, sectionDescClass } from "@/components/shared/SectionHeader";

const paragraphs = [
  "Hace más de 12 años entendimos que un servicio de coctelería no consiste únicamente en preparar excelentes tragos.",
  "Consiste en acompañar uno de los momentos más importantes de la vida de nuestros clientes.",
  "Por eso cuidamos cada detalle: la presentación, la calidad de los insumos, la atención del bartender, la estética de nuestras barras y la experiencia completa de cada invitado.",
  "Con cientos de eventos realizados en distintas ciudades y provincias, hoy somos una de las empresas referentes en coctelería premium para eventos en el NEA.",
  "Nuestro compromiso sigue siendo el mismo desde el primer día:",
  "Crear experiencias memorables con profesionalismo, calidad y pasión.",
];

const stats = [
  { end: 400, prefix: "+", suffix: "", label: "Eventos realizados" },
  { end: 12, prefix: "+", suffix: "", label: "Años creando experiencias" },
  { end: 45, prefix: "+", suffix: "", label: "Localidades recorridas" },
  { end: 400000, prefix: "+", suffix: "", label: "Cócteles preparados" },
  { end: 98, prefix: "", suffix: "%", label: "De clientes que vuelven" },
];

const formatNumber = (value: number, end: number) => {
  const rounded = Math.round(value);
  if (end >= 1000) {
    return rounded.toLocaleString("es-AR");
  }
  return String(rounded);
};

const CountUp = ({
  end,
  prefix,
  suffix,
  active,
}: {
  end: number;
  prefix: string;
  suffix: string;
  active: boolean;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 1800;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, end]);

  return (
    <span className="text-[2.4em] md:text-[3.4em] font-bold text-white leading-none tabular-nums">
      {prefix}
      {formatNumber(value, end)}
      {suffix}
    </span>
  );
};

export const QuienesSomos = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="quienes-somos" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          {/* Image */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/assets/29imagen.jpg"
                alt="El equipo de DreamDrinks"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <SectionHeader
              align="left"
              className="mb-1"
              title="¿Quiénes somos?"
            />
            {paragraphs.map((text, i) => (
              <p key={i} className={sectionDescClass}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-20 border-t border-white/10 pt-16">
          <h3 className="text-center text-white tracking-wide mb-12 uppercase">
            Dream Drinks en números
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  active={started}
                />
                <span className="text-gray-400 uppercase text-[10px] tracking-[0.08em] font-medium leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
