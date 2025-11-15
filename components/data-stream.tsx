'use client';

import { useEffect, useState } from 'react';

interface DataStreamProps {
  lines?: number;
  speed?: number;
}

export default function DataStream({ lines = 3, speed = 50 }: DataStreamProps) {
  const [displayText, setDisplayText] = useState('');
  const dataChars = '0123456789ABCDEF';

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText(
        Array.from({ length: lines })
          .map(() =>
            Array.from({ length: 20 })
              .map(() => dataChars[Math.floor(Math.random() * dataChars.length)])
              .join('')
          )
          .join('\n')
      );
    }, speed);

    return () => clearInterval(interval);
  }, [lines, speed]);

  return (
    <pre className="text-xs font-mono text-accent/50 overflow-hidden whitespace-pre-wrap break-words max-h-16">
      {displayText}
    </pre>
  );
}
