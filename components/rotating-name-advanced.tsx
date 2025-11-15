'use client';

import { useRef, useEffect } from 'react';

interface RotatingNameAdvancedProps {
  name: string;
}

export default function RotatingNameAdvanced({ name }: RotatingNameAdvancedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear
      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.save();

      // Draw text along circular path
      const radius = 90;
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = '#00ffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const letters = name.split('');
      const angleSlice = (Math.PI * 2) / letters.length;

      letters.forEach((letter, index) => {
        ctx.save();
        const angle = rotation * (Math.PI / 180) + angleSlice * index;
        ctx.translate(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.rotate(angle + Math.PI / 2);
        
        // Glow effect
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
        ctx.globalAlpha = 0.8 + Math.sin(angle * 3) * 0.2;
        
        ctx.fillText(letter, 0, 0);
        ctx.restore();
      });

      ctx.restore();

      rotation += 2;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [name]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="w-full h-full"
      />
    </div>
  );
}
