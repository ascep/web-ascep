'use client';

import { useState, useCallback } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import GalleryLightbox from "@/components/GalleryLightbox";

type LeyGalleryProps = {
  images: readonly string[];
  tag: string;
  description: string;
};

export default function LeyGallery({ images, tag, description }: LeyGalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const lightboxImages = images.map((src, i) => ({
    src: assetPath(src),
    alt: `${tag} ${i + 1}`,
  }));

  const handleOpen = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  return (
    <>
      <div id="galeria" className="mt-12 scroll-mt-28">
        <h2 className="mb-2 text-2xl font-extrabold text-ley-purple sm:text-[1.75rem]">
          {tag}
        </h2>
        <p className="mb-6 text-[1.05rem] leading-[1.8] text-text-secondary">
          {description}
        </p>
        <div className="columns-2 gap-3 sm:columns-3 sm:gap-4">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => handleOpen(i)}
              className="group relative mb-3 block w-full overflow-hidden rounded-xl break-inside-avoid sm:mb-4"
              aria-label={`${tag} ${i + 1}`}
            >
              <Image
                src={assetPath(src)}
                alt={`${tag} ${i + 1}`}
                width={800}
                height={600}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="block h-auto w-full transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      <GalleryLightbox
        images={lightboxImages}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
