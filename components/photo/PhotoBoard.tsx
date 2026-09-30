'use client';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { Nanum_Pen_Script } from 'next/font/google';
import type { Photo } from '@/lib/photos';
import { Polaroid } from './Polaroid';
import { PrintView } from './PrintView';
import { TableMess } from './TableMess';
import styles from './photo.module.css';

const hand = Nanum_Pen_Script({ subsets: ['latin'], weight: '400' });

export default function PhotoBoard({ photos }: { photos: Photo[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  const open = photos.find((p) => p.id === openId);

  return (
    <main className={`${styles.table} ${hand.className} relative min-h-screen w-screen overflow-clip`}>
      <header className="relative z-10 mx-auto flex max-w-[1360px] items-start justify-between px-6 pt-8 md:px-12 md:pt-12">
        <div className={`${styles.paper} ${styles.hand} relative -rotate-2 px-6 pb-4 pt-5 shadow-[0_8px_18px_-8px_rgba(60,35,10,0.5)]`}>
          <h1 className="text-6xl leading-none md:text-7xl">photos</h1>
          <p className="mt-1 text-xl opacity-70">left out on the table. tap one to develop it</p>
        </div>
        <nav className={`${styles.hand} flex gap-5 pt-2 text-2xl`}>
          <Link href="/" className="underline decoration-wavy decoration-1 underline-offset-4 hover:opacity-70">
            main
          </Link>
          <Link href="mailto:seanlai@nyu.edu" className="underline decoration-wavy decoration-1 underline-offset-4 hover:opacity-70">
            contact
          </Link>
        </nav>
      </header>

      <TableMess />
      <div aria-hidden className={styles.grain} />
      <LayoutGroup>
        <ul className="relative mx-auto flex max-w-[1360px] flex-col items-center px-6 pb-32 pt-14 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-16 md:gap-y-20 md:px-12 md:pt-12">
          {photos.map((photo, i) => (
            <Polaroid key={photo.id} photo={photo} index={i} lifted={photo.id === openId} onOpen={() => setOpenId(photo.id)} />
          ))}
        </ul>
        <AnimatePresence>{open && <PrintView key={open.id} photo={open} onClose={close} />}</AnimatePresence>
      </LayoutGroup>
    </main>
  );
}
