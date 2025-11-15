'use client';

import { useRef, useEffect } from 'react';
import { playShutdownSound, playWarningSound } from '@/utils/audio-engine';

interface ArcReactorProps {
  active?: boolean;
  onShutdown?: () => void;
  canShutdown?: boolean;
}

export default function ArcReactor({ active = true, onShutdown, canShutdown = false }: ArcReactorProps) {
  const reactorRef = useRef<HTMLDivElement>(null);

  const handleArcReactorClick = () => {
    if (canShutdown) {
      playShutdownSound();
      if (onShutdown) onShutdown();
    } else {
      playWarningSound();
    }
  };

  return (
    <div
      ref={reactorRef}
      onClick={handleArcReactorClick}
      className={`relative w-64 h-64 transition-all duration-300 ${
        canShutdown ? 'hover:scale-110 cursor-pointer' : ''
      }`}
      style={{ pointerEvents: canShutdown ? 'auto' : 'none' }}
    >
      {/* Outer ring */}
      <div className={`absolute inset-0 rounded-full border-2 border-accent/30 ${
        active ? 'arc-reactor-pulse' : ''
      }`} />

      {/* Middle ring */}
      <div className={`absolute inset-4 rounded-full border border-accent/40 ${
        active ? 'arc-reactor-pulse' : ''
      }`} style={{ animationDelay: '0.3s' }} />

      {/* Inner core */}
      <div className={`absolute inset-12 rounded-full bg-gradient-to-br from-accent via-accent/80 to-accent/40 ${
        active ? 'arc-reactor-pulse' : ''
      }`} style={{ animationDelay: '0.6s' }} />

      {/* Hexagon grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 256 256">
        <defs>
          <pattern id="hexagons" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M20,5 L35,13 L35,28 L20,36 L5,28 L5,13 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="256" height="256" fill="url(#hexagons)" />
      </svg>

      {/* Glow effect */}
      <div className={`absolute -inset-8 rounded-full opacity-0 ${
        active ? 'arc-reactor-pulse' : ''
      }`} style={{
        background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,255,255,0) 70%)',
      }} />

      {canShutdown && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-xs font-mono text-accent/60 whitespace-nowrap animate-pulse">
          CLICK TO SHUTDOWN
        </div>
      )}
    </div>
  );
}
