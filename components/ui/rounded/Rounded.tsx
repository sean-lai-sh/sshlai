import React, { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from './magnetic';

interface RoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    backgroundColor?: string;
    children: React.ReactNode;
}

export default function RoundedButton({backgroundColor, children, ...attributes}: RoundedButtonProps) {
  const circle = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!circle.current) return;

    timeline.current = gsap.timeline({paused: true});
    timeline.current
      .to(circle.current, {top: "-25%", width: "150%", duration: 0.4, ease: "power3.in"}, "enter")
      .to(circle.current, {top: "-150%", width: "125%", duration: 0.25}, "exit");

    return () => {
      // Cleanup GSAP animation
      timeline.current?.kill();
      // Clear timeout on unmount
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);
  
  const manageMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    timeline.current?.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <button 
        className={styles.roundedButton} 
        style={{overflow: "hidden"}} 
        onMouseEnter={manageMouseEnter} 
        onMouseLeave={manageMouseLeave} 
        {...attributes}
      >
        {children}
        <div ref={circle} style={{backgroundColor}} className={styles.circle}></div>
      </button>
    </Magnetic>
  );
}