'use client';

import { useEffect, useState } from 'react';

interface RotatingHologramNameProps {
  name: string;
  radius?: number;
}

export default function RotatingHologramName({ name, radius = 80 }: RotatingHologramNameProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const letters = name.split('');
  const anglePerLetter = 360 / letters.length;

  return (
    <div className="relative w-96 h-96 flex items-center justify-center">
      {letters.map((letter, index) => {
        const angle = (rotation + index * anglePerLetter) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={index}
            className="absolute w-8 h-8 flex items-center justify-center text-accent font-bold text-lg tracking-widest"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              opacity: Math.cos(angle) * 0.5 + 0.5,
              textShadow: `0 0 10px rgba(0, 255, 255, ${Math.cos(angle) * 0.5 + 0.5})`,
            }}
          >
            {letter}
          </div>
        );
      })}

      {/* Center circle */}
      <div className="absolute w-12 h-12 rounded-full border border-accent/40 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-accent/30" />
      </div>
    </div>
  );
}
