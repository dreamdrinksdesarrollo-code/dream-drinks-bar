import Image from "next/image";

interface ServicioProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  isReversed?: boolean;
}

export const ServicioCard = ({
  titulo,
  descripcion,
  imagen,
  isReversed = false,
}: ServicioProps) => {
  return (
    <div
      className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-4 lg:gap-12 items-center`}
    >
      
      {/* Imagen */}
      <div className="w-full lg:w-1/2">

        <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
          <Image
            src={imagen}
            alt={titulo}
            fill // esta prop hace que la imagen ocupe todo el contenedor padre
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Contenido */}
      <div className="w-full lg:w-1/2 space-y-2">
      <h3>
          {titulo}
        </h3>
        <p className="text-gray-300">{descripcion}</p>
      </div>
    </div>
  );
};
