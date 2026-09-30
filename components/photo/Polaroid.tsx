'use client';
import { motion } from 'framer-motion';
import { dateStamp, scatter, type Photo } from '@/lib/photos';
import styles from './photo.module.css';

const FASTENER = { pin: styles.pin, 'pin-blue': styles.pinBlue, tape: styles.tape };

// Board sizes: landscape prints read wider, portrait taller, like real 4x6s pinned side by side.
const boardWidth = (p: Photo) => (p.width >= p.height ? 'w-[82vw] md:w-[300px]' : 'w-[68vw] md:w-[210px]');

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
      className={`${styles.card} sticky top-[calc(12vh+var(--i)*6px)] z-[var(--i)] md:relative md:hover:z-40 mb-[38vh] md:mb-0 last:mb-[20vh] md:last:mb-0 ${boardWidth(photo)}`}
      style={{ '--i': index, translate: `${x}px ${y}px` } as React.CSSProperties}
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
          className="relative block w-full text-left cursor-zoom-in"
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

function Frame({ photo, ghost = false }: { photo: Photo; ghost?: boolean }) {
  const stamp = dateStamp(photo.exif.takenAt);
  return (
    <div className={`${styles.frame} p-[5%] pb-0`}>
      <motion.div
        layoutId={ghost ? undefined : `well-${photo.id}`}
        className={`${styles.photoWell} relative overflow-hidden`}
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
        {stamp && (
          <span className={`${styles.stamp} font-loader absolute bottom-[4%] right-[5%] text-[10px]`}>{stamp}</span>
        )}
      </motion.div>
      <p className={`${styles.hand} min-h-[3.5rem] px-1 pb-3 pt-2.5 text-2xl leading-[0.95] md:min-h-[3rem] md:text-[22px]`}>
        <span className="line-clamp-2">{photo.note.caption}</span>
      </p>
    </div>
  );
}
