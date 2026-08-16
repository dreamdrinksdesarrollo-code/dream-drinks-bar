import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sectionDescClass } from "@/components/shared/SectionHeader";
import {
  getServicioExtraBySlug,
  serviciosExtra,
} from "@/components/home/Anexo/serviciosExtraData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviciosExtra.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const servicio = getServicioExtraBySlug(slug);
  if (!servicio) return { title: "Servicio | DreamDrinks" };
  return {
    title: `${servicio.titulo} | DreamDrinks`,
    description: servicio.resumen,
  };
}

export default async function ServicioExtraPage({ params }: PageProps) {
  const { slug } = await params;
  const servicio = getServicioExtraBySlug(slug);
  if (!servicio) notFound();

  const whatsappNumber = "+5493794347949";
  const whatsappMessage = `Hola! Me interesa el servicio de ${servicio.titulo} con Dream Drinks.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="text-white font-montserrat bg-surface min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <Link
          href="/#otros-servicios"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 text-[10px] tracking-[0.12em] uppercase font-semibold mb-10 transition-colors"
        >
          ← Volver
        </Link>

        <p className="text-gold-400 text-[10px] tracking-[0.12em] uppercase font-semibold mb-3">
          Más allá de la barra
        </p>
        <h1 className="uppercase text-gold-400 mb-3">{servicio.titulo}</h1>
        <p className="text-white/80 italic text-base md:text-lg normal-case font-normal mb-8">
          {servicio.frase}
        </p>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-10">
          <Image
            src={servicio.imagen}
            alt={servicio.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="max-w-3xl space-y-4 mb-12">
          <p className={sectionDescClass}>{servicio.resumen}</p>
          {servicio.detalle.map((line, i) => (
            <p key={i} className={sectionDescClass}>
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-montserrat font-semibold py-3 px-6 rounded-lg text-[10px] tracking-[2px] uppercase transition-all duration-300"
          >
            Consultar este servicio
          </Link>
          <Link
            href="/#contactos"
            className="inline-flex items-center justify-center gap-2 text-gray-300 hover:text-gold-400 text-[10px] tracking-[0.12em] uppercase font-semibold transition-colors"
          >
            Ir a contacto →
          </Link>
        </div>
      </div>
    </main>
  );
}
