'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { isPortrait, settings, type Photo } from '@/lib/photos';
import { DateStamp } from './Polaroid';
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
  const film = note.film ?? exif.film;
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
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          layoutId={`well-${photo.id}`}
          className={`${styles.photoWell} relative shrink-0 overflow-hidden`}
          style={{
            aspectRatio: `${photo.width} / ${photo.height}`,
            height: portrait ? `min(82vh, calc((92vw - ${lipWidth}) / ${aspect}))` : undefined,
          }}
        >
          <DevelopingPrint src={photo.full} alt={note.caption ?? ''} />
          <DateStamp takenAt={exif.takenAt} className="text-xs md:text-sm" />
        </motion.div>

        <motion.figcaption
          className={`${styles.hand} flex gap-x-8 gap-y-3 ${
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
            {note.caption && <p className="text-3xl leading-none md:text-5xl">{note.caption}</p>}
            {note.place && <p className="mt-2 text-xl opacity-60 md:text-2xl">{note.place}</p>}
          </div>
          <div className={`shrink-0 text-lg leading-tight opacity-80 md:text-2xl ${portrait ? '' : 'md:text-right'}`}>
            <p>{[exif.camera, exif.lens].filter(Boolean).join(', ')}</p>
            {portrait ? settings(exif).map((s) => <p key={s}>{s}</p>) : <p>{settings(exif).join(' · ')}</p>}
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
