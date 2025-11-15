'use client';

import { useState } from 'react';

interface HoverGlowProps {
  children: React.ReactNode;
}

export default function HoverGlow({ children }: HoverGlowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative group overflow-hidden rounded-lg"
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      <div
        className="absolute pointer-events-none rounded-full bg-accent/10 blur-xl transition-opacity opacity-0 group-hover:opacity-100"
        style={{
          width: '200px',
          height: '200px',
          left: `${position.x - 100}px`,
          top: `${position.y - 100}px`,
        }}
      />

      {/* Content */}
      {children}
    </div>
  );
}
