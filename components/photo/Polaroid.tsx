'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { dateStamp, isPortrait, scatter, type Photo } from '@/lib/photos';
import { pen } from './fonts';
import { needPrint, printSrc, queuePrint } from './prints';
import styles from './photo.module.css';

// Prints develop once per visit: the first time they land on the table, not every time they're opened.
const developed = new Set<string>();
// Cards already on screen when the table loads come down one after another.
const DROP_STAGGER = 0.07;

type Phase = 'waiting' | 'landing' | 'resting';

// The frame and the photo in it are separate shared elements; they must travel on the same spring
// or the photo slides around inside its frame on the way to and from the print view.
export const PRINT_SPRING = { type: 'spring', stiffness: 220, damping: 28 } as const;

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
  const { rotate, x, y } = scatter(photo.id);
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(() => (developed.has(photo.id) ? 'resting' : 'waiting'));
  const [mountedAt] = useState(() => performance.now());
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    if (!inView || phase !== 'waiting') return;
    developed.add(photo.id);
    setDelay(performance.now() - mountedAt < 500 ? index * DROP_STAGGER : 0);
    setPhase(reduced ? 'resting' : 'landing');
  }, [inView, phase, photo.id, index, mountedAt, reduced]);

  useEffect(() => {
    if (inView) queuePrint(printSrc(photo));
  }, [inView, photo]);

  return (
    <li
      ref={ref}
      data-phase={phase}
      className={`${styles.card} sticky top-[calc(12vh+var(--i)*6px)] z-[var(--i)] md:relative md:top-auto md:hover:z-40 mb-[38vh] md:mb-0 last:mb-[20vh] md:last:mb-0 w-[84vw] md:w-[290px]`}
      style={
        { '--i': index, '--drop-delay': `${delay}s`, translate: `${x}px ${y}px`, containerType: 'inline-size' } as React.CSSProperties
      }
    >
      <motion.div
        initial={phase === 'resting' ? false : { opacity: 0, y: -18, scale: 1.05, rotate: rotate * 0.6 }}
        animate={phase === 'waiting' ? undefined : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay }}
      >
        {lifted ? (
          <div className="invisible" aria-hidden>
            <Frame photo={photo} ghost />
          </div>
        ) : (
          <motion.button
            type="button"
            layoutId={`polaroid-${photo.id}`}
            onPointerEnter={() => needPrint(printSrc(photo))}
            onTouchStart={() => needPrint(printSrc(photo))}
            onFocus={() => needPrint(printSrc(photo))}
            onClick={() => {
              needPrint(printSrc(photo));
              setPhase('resting');
              onOpen();
            }}
            className="relative block w-full cursor-pointer text-left"
            style={{ rotate }}
            whileHover={{ rotate: rotate * 0.4, y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            transition={PRINT_SPRING}
            aria-label={photo.note.caption ?? 'Open photo'}
          >
            <Frame photo={photo} developing={phase === 'landing'} onDeveloped={() => setPhase('resting')} />
          </motion.button>
        )}
      </motion.div>
    </li>
  );
}

// A polaroid only has one thick edge. Portrait shots turn the print sideways, so the
// writing strip lands on the right instead of underneath.
function Frame({
  photo,
  ghost = false,
  developing = false,
  onDeveloped,
}: {
  photo: Photo;
  ghost?: boolean;
  developing?: boolean;
  onDeveloped?: () => void;
}) {
  const portrait = isPortrait(photo);
  return (
    <div className={`${styles.frame} flex ${portrait ? 'flex-row p-[5cqw] pr-0' : 'flex-col p-[5cqw] pb-0'}`}>
      <motion.div
        layoutId={ghost ? undefined : `well-${photo.id}`}
        transition={PRINT_SPRING}
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
          className={`absolute inset-0 h-full w-full object-cover ${developing ? styles.develop : ''}`}
          style={{ backgroundImage: `url(${photo.blur})`, backgroundSize: 'cover' }}
          onAnimationEnd={onDeveloped}
        />
        <DateStamp takenAt={photo.exif.takenAt} className="text-[10px]" />
      </motion.div>
      <p
        className={`${styles.hand} ${pen.className} text-xl leading-[1.1] md:text-[19px] ${
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
