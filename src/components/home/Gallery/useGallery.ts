import { useState } from 'react';
import type { GalleryImage } from './galleryImages';

const PAGE_SIZE = 11;

export const useGallery = (images: GalleryImage[]) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayedImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const loadMore = () =>
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, images.length));

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return {
    orderedImages: images,
    displayedImages,
    hasMore,
    loadMore,
    lightboxIndex,
    openLightbox,
    closeLightbox,
  };
};
