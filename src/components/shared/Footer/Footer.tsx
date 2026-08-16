'use client';

import Link from 'next/link';

const WHATSAPP_NUMBER = '+5493794347949';
const WHATSAPP_MSG =
  'Hola! Me gustaría solicitar un presupuesto para mi evento con Dream Drinks.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* WhatsApp flotante — fijo en desktop y mobile */}
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="fixed bottom-5 right-4 md:bottom-16 md:right-6 z-[60] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25d366] hover:bg-[#1ebe57] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.304" />
        </svg>
      </Link>

      {/* Barra de contacto fija — solo desktop */}
      <footer className="hidden md:block fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-12 flex items-center justify-between gap-3 text-[10px] tracking-[0.06em] uppercase font-medium text-gray-400">
          <div className="flex items-center gap-6 lg:gap-10 min-w-0">
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="whitespace-nowrap hover:text-white transition-colors shrink-0"
            >
              <span className="text-gray-500 mr-1">Tel:</span>
              +54 9 379 434-7949
            </a>
            <a
              href="mailto:dreamdrinksbar@gmail.com"
              className="whitespace-nowrap hover:text-white transition-colors shrink-0"
            >
              <span className="text-gray-500 mr-1">Email:</span>
              dreamdrinksbar@gmail.com
            </a>
            <span className="whitespace-nowrap shrink-0">
              <span className="text-gray-500 mr-1">Ubicación:</span>
              Corrientes, Argentina
            </span>
          </div>

          <p className="whitespace-nowrap shrink-0 text-gray-500">
            © {currentYear} DreamDrinks
          </p>
        </div>
      </footer>
    </>
  );
};
