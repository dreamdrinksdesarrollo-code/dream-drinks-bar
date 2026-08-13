"use client";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CartaCard } from "./CartaCard";
import { cartasData } from "./cartasData";

export const CartasCocteles = () => {
  return (
    <section id="cartas-cocteles" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="mb-16"
          title="Cartas de Cócteles"
          description="Cada carta está diseñada para diferentes tipos de evento y presupuesto. Desde cócteles clásicos hasta experiencias de mixología premium, encontrá la opción perfecta para tu celebración."
        />

        {/* Grid de cartas */}
        <div className="space-y-24 lg:space-y-32">
          {cartasData.map((carta, index) => (
            <CartaCard
              key={index}
              titulo={carta.titulo}
              descripcion={carta.descripcion}
              cocteles={carta.cocteles}
              precio={carta.precio}
              imagen={carta.imagen}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* Nota adicional */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <SectionHeader
              className="mb-6"
              title="¿Necesitás algo personalizado?"
              description="Podemos crear una carta completamente personalizada para tu evento. Contanos tus preferencias, presupuesto y el tipo de experiencia que buscás, y diseñaremos una propuesta única."
            />
            <a
              href="https://wa.me/+5493794347949?text=Hola!%20Me%20interesa%20una%20carta%20personalizada%20de%20cócteles%20para%20mi%20evento."
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-xs mx-auto border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-montserrat font-semibold py-3 px-6 rounded-lg text-[10px] tracking-[2px] uppercase transition-all duration-300 flex items-center gap-2 sm:w-auto justify-center"
            >
              Solicitar carta personalizada
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
