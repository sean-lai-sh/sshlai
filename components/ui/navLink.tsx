'use client';

import { useRouter } from 'next/navigation';
import { useAnimationState } from '@/components/animated/AnimContext';
import React from 'react';

const NavigationLink = ({
  href,
  children,
  className = '',
  loadUpDuration = 700, // Should match your LoadUp animation duration
  indexDuration = 700,  // Should match your Index animation duration
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  loadUpDuration?: number;
  indexDuration?: number;
}) => {
  const router = useRouter();
  const { setTransitioning, setMaskState } = useAnimationState();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("Tramsitioning to: ", e);


    // 1. Start LoadUp animation and set transitioning state
    setTransitioning(true);
    setMaskState(true);

    // 2. After LoadUp completes, navigate and prepare Index animation
    setTimeout(() => {
      router.push(href);
      
      // 3. After navigation, transition to Index animation
      setTimeout(() => {
        setMaskState(false);
        // 4. Finally complete transition after Index animation
        setTimeout(() => {
          setTransitioning(false);
        }, indexDuration);
      }, 10); // Small delay to ensure route change is processed
    }, loadUpDuration);
  };

  return (
    <a 
      onClick={handleClick} 
      href={href} 
      className={className}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </a>
  );
};

export default NavigationLink;