'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const NavigationLink = ({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("Tramsitioning to: ", e);

    // 2. After LoadUp completes, navigate and prepare Index animation
    setTimeout(() => {
      router.push(href);
      }, 10); // Small delay to ensure route change is processed
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