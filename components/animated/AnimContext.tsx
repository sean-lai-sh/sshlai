'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="main font-sans ">
      <AnimatePresence mode="wait">
        <motion.div key={pathname} className=''>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
