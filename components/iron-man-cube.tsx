'use client';

import { useEffect, useState } from 'react';

export default function IronManCube() {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: (prev.x + 0.5) % 360,
        y: (prev.y + 0.7) % 360,
        z: (prev.z + 0.3) % 360,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-48 flex items-center justify-center perspective">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-lg"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.05s linear',
        }}
      >
        {/* Top face */}
        <rect
          x="50"
          y="50"
          width="100"
          height="100"
          fill="none"
          stroke="rgba(0, 255, 255, 0.4)"
          strokeWidth="2"
        />

        {/* Bottom face (offset) */}
        <rect
          x="55"
          y="55"
          width="100"
          height="100"
          fill="none"
          stroke="rgba(0, 255, 255, 0.2)"
          strokeWidth="2"
        />

        {/* Connecting lines */}
        <line x1="50" y1="50" x2="55" y2="55" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="2" />
        <line x1="150" y1="50" x2="155" y2="55" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="2" />
        <line x1="150" y1="150" x2="155" y2="155" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="2" />
        <line x1="50" y1="150" x2="55" y2="155" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="2" />

        {/* Center lines creating cube effect */}
        <line x1="100" y1="50" x2="100" y2="150" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="1" />
        <line x1="50" y1="100" x2="150" y2="100" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
}
