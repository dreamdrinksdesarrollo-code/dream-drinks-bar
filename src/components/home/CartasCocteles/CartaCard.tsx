import Image from "next/image";

interface CartaProps {
  titulo: string;
  descripcion: string;
  cocteles: string[];
  precio: string;
  imagen: string;
  isReversed?: boolean;
}

export const CartaCard = ({
  titulo,
  descripcion,
  cocteles,
  imagen,
  isReversed = false,
}: CartaProps) => {
  return (
    <div
      className={`flex flex-col ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-8 lg:gap-12 items-center`}
    >
      {/* Imagen */}
      <div className="w-full lg:w-1/2">
        <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
          <Image
            src={imagen}
            alt={titulo}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </div>

      {/* Contenido */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2>
          {titulo}
        </h2>

        <p className="text-gray-300">
          {descripcion}
        </p>

        <div className="space-y-4">
          <h4 className="font-montserrat font-bold text-gold-400">
            Incluye:
          </h4>
          <ul className="space-y-3">
            {cocteles.map((coctel, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 mt-2 flex-shrink-0"></div>
                <p>{coctel}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
