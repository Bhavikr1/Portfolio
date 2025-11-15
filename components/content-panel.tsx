'use client';

import { useEffect, useState } from 'react';

interface ContentPanelProps {
  content: string;
}

export default function ContentPanel({ content }: ContentPanelProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Reset when content changes
  useEffect(() => {
    setDisplayedText('');
    setCharIndex(0);
  }, [content]);

  useEffect(() => {
    if (charIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + content[charIndex]);
        setCharIndex(charIndex + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [charIndex, content]);

  return (
    <div className="mt-4 p-4 border border-accent/50 bg-accent/5 animate-fadeInUp">
      <p className="font-mono text-sm text-accent/80 leading-relaxed whitespace-pre-wrap">
        {displayedText}
        <span className="inline-block w-2 h-4 ml-1 bg-accent/60 animate-pulse">{charIndex < content.length ? '|' : ''}</span>
      </p>
    </div>
  );
}
