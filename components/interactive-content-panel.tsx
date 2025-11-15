'use client';

import { useState, useRef, useEffect } from 'react';
import { useGlobalAudio } from '@/hooks/use-global-audio';
import DataStreamEffect from './data-stream-effect';

interface ContentItem {
  title: string;
  content: string;
}

interface InteractiveContentPanelProps {
  items: ContentItem[];
}

export default function InteractiveContentPanel({ items }: InteractiveContentPanelProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [streamTrigger, setStreamTrigger] = useState(false);
  const { playClickSound } = useGlobalAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTitleClick = (index: number) => {
    playClickSound();
    setStreamTrigger(true);
    setActiveIndex(activeIndex === index ? null : index);
    setTimeout(() => setStreamTrigger(false), 800);
  };

  return (
    <>
      <DataStreamEffect trigger={streamTrigger} />
      <div ref={containerRef} className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer transition-all duration-300"
          >
            <div
              onClick={() => handleTitleClick(index)}
              className="p-4 border-2 border-accent/40 hover:border-accent/80 transition-all duration-300 relative overflow-hidden group-hover:bg-accent/5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-accent font-bold tracking-wider relative z-10 flex items-center justify-between">
                {item.title}
                <span className={`text-xs opacity-60 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </h3>
            </div>

            {activeIndex === index && (
              <div className="p-4 border-l-4 border-r-4 border-b-2 border-accent/60 bg-accent/5 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-foreground/80 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
