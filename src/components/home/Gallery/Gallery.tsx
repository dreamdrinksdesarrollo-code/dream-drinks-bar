'use client';

import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { galleryImages } from './galleryImages';
import { useGallery } from './useGallery';

// Aspectos variados para masonry irregular (sin extremos 2/3 que dejan huecos grandes)
const ASPECT_SEQUENCE = [
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[5/4]',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-square',
  'aspect-[5/6]',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[5/4]',
  'aspect-[3/4]',
  'aspect-square',
];

export const Gallery = () => {
  const {
    orderedImages,
    displayedImages,
    hasMore,
    loadMore,
    lightboxIndex,
    openLightbox,
    closeLightbox,
  } = useGallery(galleryImages);

  return (
    <section id="galeria" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <SectionHeader
          className="mb-14"
          title="Galería"
          description={
            <>
              Cada evento cuenta una historia diferente.
              <br />
              Descubrí algunos de los momentos que tuvimos el privilegio de acompañar, donde el
              diseño, la coctelería y el servicio se unieron para crear experiencias inolvidables.
            </>
          }
        />

        {/* Masonry irregular */}
        <div className="relative">
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 [column-fill:_balance]">
            {displayedImages.map((img, i) => {
              const aspectClass = ASPECT_SEQUENCE[i % ASPECT_SEQUENCE.length];
              return (
                <div
                  key={img.src + i}
                  className={`relative ${aspectClass} mb-2 break-inside-avoid overflow-hidden rounded-md cursor-pointer group`}
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    quality={80}
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
          )}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-montserrat font-semibold py-3 px-8 rounded-lg text-[10px] tracking-[2px] uppercase transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Ver más fotografías
            </button>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={closeLightbox}
        index={lightboxIndex ?? 0}
        slides={orderedImages.map((img) => ({ src: img.src, alt: img.alt }))}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.97)' } }}
      />
    </section>
  );
};
