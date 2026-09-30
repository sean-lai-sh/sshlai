// The stuff you'd find on a table where prints are left to develop.
export function TableMess() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Ketchup className="absolute right-[6%] top-[150px] w-[150px] rotate-[18deg] md:right-[9%] md:top-[120px] md:w-[190px]" />
      <Ketchup className="absolute bottom-[60px] right-[14%] hidden w-[90px] -rotate-[140deg] md:block" drops={false} />
      <CoffeeRing className="absolute -right-[50px] top-[46%] w-[190px] md:left-[34%] md:right-auto md:top-[10px] md:w-[210px]" />
    </div>
  );
}

function Ketchup({ className, drops = true }: { className: string; drops?: boolean }) {
  return (
    <svg viewBox="0 0 220 130" className={className}>
      <defs>
        <radialGradient id="ketchup" cx="40%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#c42417" />
          <stop offset="65%" stopColor="#a2170e" />
          <stop offset="100%" stopColor="#761007" />
        </radialGradient>
      </defs>
      <g fill="url(#ketchup)" stroke="#6a0d06" strokeOpacity="0.45" strokeWidth="1.2">
        <path d="M30 72c-3-17 14-30 33-26 9-15 33-18 44-6 12-8 32-2 34 14 16 3 20 20 8 29 4 14-14 22-27 16-10 12-33 13-44 3-12 9-32 6-35-8-10-3-15-12-13-22z" />
        <path d="M146 70c20-6 44-8 66-2-18 5-42 11-64 13z" opacity="0.85" />
      </g>
      <path fill="#fff" opacity="0.22" d="M58 58c10-6 24-6 31 0-11 0-21 2-29 5-3-1-4-3-2-5z" />
      {drops && (
        <g fill="#9c150c">
          <circle cx="24" cy="40" r="4" />
          <circle cx="12" cy="52" r="2" />
          <circle cx="96" cy="118" r="3" />
          <circle cx="176" cy="92" r="2.4" />
        </g>
      )}
    </svg>
  );
}

function CoffeeRing({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        <filter id="ring-wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="9" />
        </filter>
      </defs>
      <g filter="url(#ring-wobble)">
        <circle cx="100" cy="100" r="74" fill="rgba(120, 70, 25, 0.07)" />
        <circle cx="100" cy="100" r="74" fill="none" stroke="rgba(95, 52, 18, 0.38)" strokeWidth="4" strokeDasharray="300 18 90 12" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(95, 52, 18, 0.14)" strokeWidth="2" />
      </g>
    </svg>
  );
}
