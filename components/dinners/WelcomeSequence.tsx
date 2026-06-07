'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'dinners-welcome-seen';

/**
 * Full-screen "welcome to the club" intro for /dinners.
 * Reveals each line in sequence, then fades out and unmounts.
 * Skippable via click / tap / any key. Plays once per browser session —
 * a refresh within the same session skips straight to the page.
 */
export default function WelcomeSequence({
  lines,
  onDone,
}: {
  lines: readonly string[];
  onDone?: () => void;
}) {
  // `ready` gates first paint so we don't flash the overlay for returning
  // visitors and don't cause a hydration mismatch (server renders nothing).
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const finish = useCallback(() => {
    setDone(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    onDone?.();
  }, [onDone]);

  // Decide on mount whether the intro should play this session.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      /* ignore */
    }
    if (seen) {
      setDone(true);
      onDone?.();
    }
    setReady(true);
  }, [onDone]);

  // Advance one line at a time, then finish.
  useEffect(() => {
    if (!ready || done) return;
    if (index >= lines.length) {
      const hold = setTimeout(finish, 500);
      return () => clearTimeout(hold);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), 1150);
    return () => clearTimeout(t);
  }, [ready, index, lines.length, done, finish]);

  // Skip on any interaction.
  useEffect(() => {
    if (!ready || done) return;
    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [ready, done, finish]);

  return (
    <AnimatePresence>
      {ready && !done && (
        <motion.div
          key="dinner-welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
          onClick={finish}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3 bg-charcoal-darker px-6 text-center text-beige cursor-pointer select-none"
        >
          <div className="h-fit overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="font-script italic text-5xl sm:text-7xl md:text-8xl leading-[1.1]"
              >
                {lines[Math.min(index, lines.length - 1)]}
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 text-xs tracking-widest uppercase text-beige/50"
          >
            tap to enter
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
