'use client';

import { useEffect, useRef } from 'react';

interface RotatingHologramProps {
  name: string;
}

export default function RotatingHologram({ name }: RotatingHologramProps) {
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

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);

      // Draw rotating 3D-like cube wireframe
      const size = 60;
      const vertices = [
        [-size, -size, -size],
        [size, -size, -size],
        [size, size, -size],
        [-size, size, -size],
        [-size, -size, size],
        [size, -size, size],
        [size, size, size],
        [-size, size, size],
      ];

      // Draw edges
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      edges.forEach(([start, end]) => {
        ctx.beginPath();
        ctx.moveTo(vertices[start][0], vertices[start][1]);
        ctx.lineTo(vertices[end][0], vertices[end][1]);
        ctx.stroke();
      });

      // Draw vertices
      ctx.fillStyle = '#00ffff';
      ctx.globalAlpha = 0.8;
      vertices.forEach((v) => {
        ctx.beginPath();
        ctx.arc(v[0], v[1], 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      rotation += 2;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-40 h-40">
      <canvas
        ref={canvasRef}
        width={160}
        height={160}
        className="w-full h-full"
      />
      <div className="absolute inset-0 rounded-full border-2 border-accent/20 pointer-events-none" />
    </div>
  );
}
