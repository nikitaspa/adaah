import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { id: string; url: string; caption: string }[];
  initialIndex?: number;
}

export function GalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const activeImage = images[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors cursor-pointer"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Active Photo Container */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
        <div className="relative overflow-hidden rounded-2xl max-h-[70vh] flex items-center justify-center">
          <img
            src={activeImage.url}
            alt={activeImage.caption}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
          />
        </div>

        {/* Caption and counter */}
        <div className="mt-4 text-center text-white space-y-1">
          <p className="text-sm font-medium">{activeImage.caption}</p>
          <p className="text-xs text-stone-400">
            {currentIndex + 1} of {images.length}
          </p>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-md p-1">
            {images.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-12 w-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  idx === currentIndex ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
