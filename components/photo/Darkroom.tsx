'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dateStamp, settingsLine, type Photo } from '@/lib/photos';
import styles from './photo.module.css';

// Hold on black at least this long so a cached print still "develops" after the card lands.
const MIN_DARK_MS = 750;

export function Darkroom({ photo, onClose }: { photo: Photo; onClose: () => void }) {
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
  const stamp = dateStamp(exif.takenAt);
  const film = note.film ?? exif.film;
  const aspect = photo.width / photo.height;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={note.caption ?? 'Photo'}
    >
      <motion.div
        className="absolute inset-0 bg-[rgba(70,45,20,0.28)] backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
      <motion.figure
        layoutId={`polaroid-${photo.id}`}
        className={`${styles.frame} relative p-[3%] pb-0 cursor-default`}
        style={{ rotate: -0.6, width: `min(92vw, calc(64vh * ${aspect}), 1100px)` }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          layoutId={`well-${photo.id}`}
          className={`${styles.photoWell} relative overflow-hidden`}
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <DevelopingPrint src={photo.full} alt={note.caption ?? ''} />
          {stamp && (
            <span className={`${styles.stamp} font-loader absolute bottom-[4%] right-[4%] text-xs md:text-sm`}>
              {stamp}
            </span>
          )}
        </motion.div>

        <motion.figcaption
          className={`${styles.hand} flex flex-col md:flex-row md:items-end md:justify-between gap-x-8 gap-y-2 px-1 pt-4 pb-5`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div className="min-w-0">
            {note.caption && <p className="text-4xl md:text-5xl leading-none">{note.caption}</p>}
            {note.place && <p className="mt-1 text-2xl opacity-60">{note.place}</p>}
          </div>
          <div className="shrink-0 text-xl md:text-2xl leading-tight md:text-right opacity-80">
            <p>{[exif.camera, exif.lens].filter(Boolean).join(', ')}</p>
            <p>{settingsLine(exif)}</p>
            {film && <p className="opacity-75">{film}</p>}
          </div>
        </motion.figcaption>
      </motion.figure>
    </div>
  );
}

function DevelopingPrint({ src, alt }: { src: string; alt: string }) {
  const [developed, setDeveloped] = useState(false);

  useEffect(() => {
    let live = true;
    const img = new Image();
    img.src = src;
    Promise.all([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, MIN_DARK_MS))]).then(
      () => live && setDeveloped(true),
    );
    return () => {
      live = false;
    };
  }, [src]);

  if (!developed) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`${styles.develop} absolute inset-0 h-full w-full object-cover`} />;
}
