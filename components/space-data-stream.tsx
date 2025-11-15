'use client';

import React, { useState, useEffect } from 'react';

interface DataPoint {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  text: string;
  opacity: number;
}

export default function SpaceDataStream() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Create floating data points that move in space
    const createDataPoint = (text: string, index: number) => {
      return {
        id: `${text}-${index}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        targetX: Math.random() * window.innerWidth,
        targetY: Math.random() * window.innerHeight,
        text,
        opacity: Math.random() * 0.5 + 0.2,
      };
    };

    const initialData = [
      'PYTHON',
      'DEEP LEARNING',
      'NLP',
      'GCP',
      'DOCKER',
      'MLOPS',
      'AIRFLOW',
      'BACKEND',
      'GENERATIVE AI',
    ].map((text, i) => createDataPoint(text, i));

    setDataPoints(initialData);

    // Animate data points through space
    const interval = setInterval(() => {
      setDataPoints((prev) =>
        prev.map((point) => {
          const moveX = point.targetX - point.x;
          const moveY = point.targetY - point.y;
          const distance = Math.sqrt(moveX * moveX + moveY * moveY);

          if (distance < 5) {
            return {
              ...point,
              targetX: Math.random() * window.innerWidth,
              targetY: Math.random() * window.innerHeight,
            };
          }

          return {
            ...point,
            x: point.x + (moveX / distance) * 2,
            y: point.y + (moveY / distance) * 2,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {dataPoints.map((point) => (
        <div
          key={point.id}
          className="fixed font-mono text-xs tracking-wider text-accent/40 whitespace-nowrap"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: point.opacity,
            transform: 'translate(-50%, -50%)',
            transition: 'none',
          }}
        >
          ◆ {point.text}
        </div>
      ))}
    </div>
  );
}
