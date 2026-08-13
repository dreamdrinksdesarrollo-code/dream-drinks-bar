import { Hero } from "@/components/home/Hero";
import { QuienesSomos } from "@/components/home/QuienesSomos";
import { Servicios } from "@/components/home/Servicios";
import { Gallery } from "@/components/home/Gallery";
import { Testimonios } from "@/components/home/Testimonios";
import { Anexo } from "@/components/home/Anexo";
import { Contacto } from "@/components/home/Contacto";

export default function Home() {
  return (
    <main className="text-white font-montserrat">
      <Hero />
      <QuienesSomos />
      <Servicios />
      <Testimonios />
      <Gallery />
      <Anexo />
      <Contacto />
    </main>
  );
}
