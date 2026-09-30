// The stuff you'd find on a table where prints are left to develop.
export function TableMess() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <CoffeeRing className="absolute -right-[50px] top-[46%] w-[190px] md:left-[34%] md:right-auto md:top-[10px] md:w-[210px]" />
    </div>
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
