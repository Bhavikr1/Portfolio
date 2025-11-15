'use client';

interface CornerHudProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
  children: React.ReactNode;
}

export default function CornerHud({ position, children }: CornerHudProps) {
  const positionClasses = {
    tl: 'top-4 left-4',
    tr: 'top-4 right-4',
    bl: 'bottom-4 left-4',
    br: 'bottom-4 right-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40`}>
      <div className="relative">
        {/* Corner frame */}
        <div className="absolute -inset-2 border border-accent/20 pointer-events-none" />
        
        {/* Content */}
        <div className="relative bg-background/40 backdrop-blur-sm border border-accent/30 p-4 rounded">
          {children}
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-br from-accent/5 to-transparent rounded opacity-0 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
