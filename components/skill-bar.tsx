'use client';

import { useEffect, useState } from 'react';

interface SkillBarProps {
  label: string;
  level: number; // 0-100
  delay?: number;
}

export default function SkillBar({ label, level, delay = 0 }: SkillBarProps) {
  const [displayLevel, setDisplayLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = setInterval(() => {
        setDisplayLevel((prev) => {
          if (prev >= level) {
            clearInterval(increment);
            return level;
          }
          return prev + level / 20;
        });
      }, 30);

      return () => clearInterval(increment);
    }, delay * 100);

    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-mono text-foreground/70">{label}</span>
        <span className="text-xs font-mono text-accent">{Math.round(displayLevel)}%</span>
      </div>
      <div className="h-1 bg-accent/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full transition-all duration-300"
          style={{ width: `${displayLevel}%` }}
        />
      </div>
    </div>
  );
}
