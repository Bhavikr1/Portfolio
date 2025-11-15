'use client';

import { useRef, useEffect } from 'react';

export default function IronManHologram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const drawIronMan = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);

      // Head
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      
      ctx.beginPath();
      ctx.arc(0, -25, 15, 0, Math.PI * 2);
      ctx.stroke();

      // Helmet visor
      ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(-5, -25, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#00ffff';
      ctx.stroke();

      // Chest plate (Arc Reactor inside)
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-12, -5, 24, 30);
      ctx.stroke();

      ctx.fillStyle = 'rgba(0, 255, 200, 0.3)';
      ctx.fillRect(-12, -5, 24, 30);

      // Arc reactor glow on chest
      ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(0, 5, 8, 0, Math.PI * 2);
      ctx.fill();

      // Arms
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;
      
      // Left arm
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(-25, 15);
      ctx.stroke();

      // Right arm
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(25, 15);
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(-8, 25);
      ctx.lineTo(-8, 45);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(8, 25);
      ctx.lineTo(8, 45);
      ctx.stroke();

      // Glow effect
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear with slight trail
      ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Draw rotating Iron Man
      drawIronMan(ctx, centerX, centerY, 1.5, rotation);

      // Rotating orbit rings
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating particles around hologram
      for (let i = 0; i < 8; i++) {
        const angle = (rotation + i * 45) * (Math.PI / 180);
        const distance = 85;
        const px = centerX + Math.cos(angle) * distance;
        const py = centerY + Math.sin(angle) * distance;

        ctx.fillStyle = '#00ffff';
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      rotation += 3;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-64 h-64">
      <canvas
        ref={canvasRef}
        width={256}
        height={256}
        className="w-full h-full"
      />
    </div>
  );
}
