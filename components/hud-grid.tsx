'use client';

export default function HudGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
      {/* Horizontal lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      {/* Vertical lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent"
            style={{ left: `${i * 3.33}%` }}
          />
        ))}
      </div>

      {/* Corner markers */}
      {[
        'top-4 left-4',
        'top-4 right-4',
        'bottom-4 left-4',
        'bottom-4 right-4',
      ].map((pos, i) => (
        <div key={`corner-${i}`} className={`absolute ${pos}`}>
          <div className="w-8 h-8 border-2 border-accent/40" />
        </div>
      ))}
    </div>
  );
}
