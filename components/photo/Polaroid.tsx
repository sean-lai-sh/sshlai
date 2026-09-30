'use client';
import { motion } from 'framer-motion';
import { dateStamp, isPortrait, scatter, type Photo } from '@/lib/photos';
import styles from './photo.module.css';

const FASTENER = { tape: styles.tape, 'tape-sage': styles.tapeSage, clip: styles.clip, none: undefined };

export function Polaroid({
  photo,
  index,
  lifted,
  onOpen,
}: {
  photo: Photo;
  index: number;
  lifted: boolean;
  onOpen: () => void;
}) {
  const { rotate, x, y, fastener } = scatter(photo.id);

  return (
    <li
      className={`${styles.card} sticky top-[calc(12vh+var(--i)*6px)] z-[var(--i)] md:relative md:top-auto md:hover:z-40 mb-[38vh] md:mb-0 last:mb-[20vh] md:last:mb-0 w-[84vw] md:w-[290px]`}
      style={{ '--i': index, translate: `${x}px ${y}px`, containerType: 'inline-size' } as React.CSSProperties}
    >
      {lifted ? (
        <div className="invisible" aria-hidden>
          <Frame photo={photo} ghost />
        </div>
      ) : (
        <motion.button
          type="button"
          layoutId={`polaroid-${photo.id}`}
          onClick={onOpen}
          className="relative block w-full cursor-pointer text-left"
          style={{ rotate }}
          whileHover={{ rotate: rotate * 0.4, y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          aria-label={photo.note.caption ?? 'Open photo'}
        >
          <span className={FASTENER[fastener]} />
          <Frame photo={photo} />
        </motion.button>
      )}
    </li>
  );
}

// A polaroid only has one thick edge. Portrait shots turn the print sideways, so the
// writing strip lands on the right instead of underneath.
function Frame({ photo, ghost = false }: { photo: Photo; ghost?: boolean }) {
  const portrait = isPortrait(photo);
  return (
    <div className={`${styles.frame} flex ${portrait ? 'flex-row p-[5cqw] pr-0' : 'flex-col p-[5cqw] pb-0'}`}>
      <motion.div
        layoutId={ghost ? undefined : `well-${photo.id}`}
        className={`${styles.photoWell} relative shrink-0 overflow-hidden ${portrait ? 'w-[58cqw]' : 'w-full'}`}
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.thumb}
          alt={photo.note.caption ?? ''}
          loading="lazy"
          decoding="async"
          width={photo.width}
          height={photo.height}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundImage: `url(${photo.blur})`, backgroundSize: 'cover' }}
        />
        <DateStamp takenAt={photo.exif.takenAt} className="text-[10px]" />
      </motion.div>
      <p
        className={`${styles.hand} text-2xl leading-[0.95] md:text-[22px] ${
          portrait ? 'flex-1 px-3 pt-1' : 'min-h-[3.5rem] px-1 pb-3 pt-2.5 md:min-h-[3rem]'
        }`}
      >
        <span className={portrait ? 'line-clamp-6' : 'line-clamp-2'}>{photo.note.caption}</span>
      </p>
    </div>
  );
}

export function DateStamp({ takenAt, className = '' }: { takenAt?: string; className?: string }) {
  const stamp = dateStamp(takenAt);
  if (!stamp) return null;
  return <span className={`${styles.stamp} font-loader absolute bottom-[4%] right-[5%] ${className}`}>{stamp}</span>;
}
