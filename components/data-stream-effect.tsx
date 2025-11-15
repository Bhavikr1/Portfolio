'use client';

import { useRef, useEffect } from 'react';

interface DataStreamEffectProps {
  trigger: boolean;
}

export default function DataStreamEffect({ trigger }: DataStreamEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let progress = 0;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];

    const draw = () => {
      if (trigger && progress < 100) {
        // Create particle stream effect
        for (let i = 0; i < 10; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
          });
        }

        // Clear with fade
        ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw and update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.015;

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          // Draw particle with glow
          ctx.fillStyle = `rgba(0, 255, 255, ${p.life * 0.8})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();

          // Draw connecting lines
          ctx.strokeStyle = `rgba(0, 255, 255, ${p.life * 0.3})`;
          ctx.lineWidth = 1;
          for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
            const p2 = particles[j];
            const dx = p2.x - p.x;
            const dy = p2.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        progress++;
      } else if (!trigger) {
        // Fade out effect when trigger ends
        ctx.fillStyle = 'rgba(10, 14, 39, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
    />
  );
}
