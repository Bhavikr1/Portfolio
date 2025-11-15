'use client';

import { useState, useEffect } from 'react';
import { playClickSound, playShutdownSound } from '@/utils/audio-engine';

interface ArcReactorProps {
  onShutdown?: () => void;
}

export default function ArcReactorInteractive({ onShutdown }: ArcReactorProps) {
  const [isActive, setIsActive] = useState(true);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    const pulse = setInterval(() => {
      setPulseIntensity(Math.random() * 0.5 + 0.8);
    }, 800);
    return () => clearInterval(pulse);
  }, []);

  const handleClick = () => {
    playClickSound();
    playShutdownSound();
    setIsActive(false);
    setTimeout(() => {
      onShutdown?.();
    }, 500);
  };

  return (
    <div
      className="relative w-32 h-32 cursor-pointer transition-transform hover:scale-110"
      onClick={handleClick}
    >
      {/* Outer ring glow */}
      <div
        className="absolute inset-0 rounded-full border-2 border-accent/40"
        style={{
          boxShadow: `0 0 30px rgba(0, 255, 255, ${0.3 * pulseIntensity})`,
        }}
      />

      {/* Middle ring */}
      <div className="absolute inset-4 rounded-full border border-accent/50 arc-reactor-pulse" />

      {/* Inner glowing core */}
      <div
        className="absolute inset-8 rounded-full bg-accent/20 blur-sm"
        style={{
          boxShadow: `0 0 20px rgba(0, 255, 255, ${0.6 * pulseIntensity}), inset 0 0 15px rgba(0, 255, 255, ${0.4 * pulseIntensity})`,
        }}
      />

      {/* Center point */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent" />

      {/* Status text */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-accent font-mono text-xs tracking-wider">
          {isActive ? 'ONLINE' : 'SHUTDOWN'}
        </div>
      </div>
    </div>
  );
}
