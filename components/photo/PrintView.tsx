'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { isPortrait, settings, type Photo } from '@/lib/photos';
import { DateStamp, PRINT_SPRING } from './Polaroid';
import { pen } from './fonts';
import styles from './photo.module.css';

export function PrintView({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const { exif, note } = photo;
  const { film } = exif;
  const aspect = photo.width / photo.height;
  const portrait = isPortrait(photo);
  const lipWidth = 'clamp(150px, 24vw, 320px)';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={note.caption ?? 'Photo'}
    >
      <motion.div
        className={`${styles.backdrop} absolute inset-0 backdrop-blur-md`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
      <motion.figure
        layoutId={`polaroid-${photo.id}`}
        className={`${styles.frame} relative flex ${portrait ? 'flex-row p-3 pr-0 md:p-5 md:pr-0' : 'flex-col p-[3%] pb-0'}`}
        style={{ rotate: -0.6, width: portrait ? undefined : `min(92vw, 1100px, calc((86vh - 160px) * ${aspect}))` }}
        transition={PRINT_SPRING}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          layoutId={`well-${photo.id}`}
          transition={PRINT_SPRING}
          className={`${styles.photoWell} relative shrink-0 overflow-hidden`}
          style={{
            aspectRatio: `${photo.width} / ${photo.height}`,
            height: portrait ? `min(82vh, calc((92vw - ${lipWidth}) / ${aspect}))` : undefined,
          }}
        >
          <Print thumb={photo.thumb} full={photo.full} alt={note.caption ?? ''} />
          <DateStamp takenAt={exif.takenAt} className="text-xs md:text-sm" />
        </motion.div>

        <motion.figcaption
          className={`${styles.hand} ${pen.className} flex gap-x-8 gap-y-3 ${
            portrait
              ? 'flex-col justify-between px-4 py-1 md:px-6'
              : 'flex-col px-1 pb-5 pt-4 md:flex-row md:items-end md:justify-between'
          }`}
          style={{ width: portrait ? lipWidth : undefined }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div className="min-w-0">
            {note.caption && <p className="text-2xl leading-tight md:text-4xl">{note.caption}</p>}
            {note.place && <p className="mt-1 text-base opacity-60 md:text-lg">{note.place}</p>}
          </div>
          <div className={`shrink-0 text-sm leading-snug opacity-80 md:text-base ${portrait ? '' : 'md:text-right'}`}>
            <p>{[exif.camera, exif.lens].filter(Boolean).join(', ')}</p>
            {portrait ? settings(exif).map((s) => <p key={s}>{s}</p>) : <p>{settings(exif).join(' · ')}</p>}
            {film && <p className="opacity-75">{film}</p>}
          </div>
        </motion.figcaption>
      </motion.figure>
    </div>
  );
}

// Already developed on the table, so the thumb shows at once and the full print sharpens in over it.
function Print({ thumb, full, alt }: { thumb: string; full: string; alt: string }) {
  const [sharp, setSharp] = useState(false);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumb} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={full}
        alt={alt}
        onLoad={() => setSharp(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${sharp ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
}
