import { useState } from 'react';
import type { GalleryImage } from './galleryImages';

const PAGE_SIZE = 6;

/** Shuffle determinístico (misma mezcla en SSR y cliente) */
const shuffle = <T,>(items: T[], seed = 42): T[] => {
  const arr = [...items];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const useGallery = (images: GalleryImage[]) => {
  const [ordered] = useState(() => shuffle(images));
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayedImages = ordered.slice(0, visibleCount);
  const hasMore = visibleCount < ordered.length;

  const loadMore = () =>
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, ordered.length));

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return {
    orderedImages: ordered,
    displayedImages,
    hasMore,
    loadMore,
    lightboxIndex,
    openLightbox,
    closeLightbox,
  };
};
