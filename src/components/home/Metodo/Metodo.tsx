"use client";

import { SectionHeader, sectionDescClass } from "@/components/shared/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Escuchamos el evento",
    description:
      "Analizamos el tipo de celebración, el contexto, el público y el estilo buscado. Ninguna propuesta es igual a otra.",
  },
  {
    number: "02",
    title: "Diseñamos la experiencia",
    description:
      "Definimos la carta de cócteles, el tipo de barra y la estética general, cuidando que todo dialogue de forma armónica.",
  },
  {
    number: "03",
    title: "Seleccionamos el equipo",
    description:
      "Asignamos bartenders capacitados, con experiencia y presencia. El servicio es tan importante como el cóctel.",
  },
  {
    number: "04",
    title: "Ejecutamos con precisión",
    description:
      "Realizamos el montaje con anticipación, trabajamos con ritmo, orden y limpieza durante todo el evento, y desmontamos de forma discreta.",
  },
  {
    number: "05",
    title: "El resultado",
    description:
      "Una barra que funciona, se ve bien y se disfruta. El cliente se relaja. Los invitados viven la experiencia.",
  },
];

export const Metodo = () => {
  return (
    <section id="metodo" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="mb-14"
          title="Cómo trabajamos"
          description="Cada evento se aborda de manera personalizada. Un método claro que nos permite brindar un servicio profesional, ordenado y sin imprevistos."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[-calc(50%-2rem)] h-px bg-gradient-to-r from-gold-400/40 to-transparent w-full" />
              )}
              <div className="w-16 h-16 rounded-full border-2 border-gold-400/50 flex items-center justify-center mb-4 group-hover:border-gold-400 transition-colors duration-300 bg-gold-400/5">
                <span className="text-gold-400 font-bold text-[1.1em]">{step.number}</span>
              </div>
              <h3 className="text-white text-[11px] font-bold tracking-[1px] mb-2 leading-tight uppercase">
                {step.title}
              </h3>
              <p className={sectionDescClass}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
