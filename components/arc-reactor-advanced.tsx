'use client';

import { useRef, useEffect, useState } from 'react';
import { playShutdownSound, playWarningSound } from '@/utils/audio-engine';

interface ArcReactorAdvancedProps {
  active?: boolean;
  onShutdown?: () => void;
  canShutdown?: boolean;
}

export default function ArcReactorAdvanced({ active = true, onShutdown, canShutdown = false }: ArcReactorAdvancedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.fillStyle = 'rgba(10, 14, 39, 0.2)';
      ctx.fillRect(0, 0, width, height);

      if (isShuttingDown) {
        const shutdownProgress = (time % 100) / 100;
        
        // Pulsing red shutdown effect
        ctx.fillStyle = `rgba(255, 50, 50, ${0.5 * (1 - shutdownProgress)})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 120 * (1 - shutdownProgress * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Collapsing rings
        for (let i = 0; i < 5; i++) {
          const radius = 120 - i * 20 - shutdownProgress * 100;
          ctx.strokeStyle = `rgba(255, 100, 100, ${(1 - shutdownProgress) * 0.8})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, Math.max(5, radius), 0, Math.PI * 2);
          ctx.stroke();
        }

        if (shutdownProgress > 0.9) {
          ctx.fillStyle = 'rgba(50, 50, 50, 0.9)';
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = '#666';
          ctx.font = 'bold 16px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('SYSTEM OFFLINE', centerX, centerY);
        }
      } else {
        // Active arc reactor glow
        const glow = Math.sin(time * 0.05) * 0.3 + 0.7;

        // Outer pulsing rings
        for (let i = 0; i < 4; i++) {
          const radius = 100 + i * 20;
          ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - i * 0.2) * glow * 0.6})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner core
        const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
        coreGradient.addColorStop(0, `rgba(0, 255, 255, ${glow})`);
        coreGradient.addColorStop(1, `rgba(0, 200, 255, ${glow * 0.5})`);
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.fill();

        // Rotating energy lines
        ctx.strokeStyle = 'rgba(0, 255, 200, 0.8)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          const angle = (time * 2 + i * 60) * (Math.PI / 180);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * 80,
            centerY + Math.sin(angle) * 80
          );
          ctx.stroke();
        }
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isShuttingDown]);

  const handleClick = () => {
    if (canShutdown && !isShuttingDown) {
      playShutdownSound();
      setIsShuttingDown(true);
      setTimeout(() => {
        if (onShutdown) onShutdown();
      }, 3000);
    } else {
      playWarningSound();
    }
  };

  return (
    <div className="relative w-80 h-80">
      <canvas
        ref={canvasRef}
        width={320}
        height={320}
        onClick={handleClick}
        className={`w-full h-full cursor-pointer transition-all duration-300 ${
          canShutdown && !isShuttingDown ? 'hover:scale-105' : ''
        }`}
      />
      {canShutdown && !isShuttingDown && (
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-xs font-mono text-accent/60 whitespace-nowrap animate-pulse">
          CLICK TO SHUTDOWN SYSTEM
        </div>
      )}
    </div>
  );
}
