'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="main font-sans ">
      <AnimatePresence mode="wait">
        <div key={pathname} className=''>
          {children}
        </div>
      </AnimatePresence>
    </div>
  );
}
