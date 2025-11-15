'use client';

import { useEffect, useState } from 'react';
import ArcReactor from './arc-reactor';
import { playBootSound } from '@/utils/audio-engine';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [stage, setStage] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [completed, setCompleted] = useState(false);
  const [shutdown, setShutdown] = useState(false);

  const bootSequence = [
    'INITIALIZING SYSTEM...',
    'SCANNING IDENTITY...',
    'IDENTITY MATCH FOUND',
    'BHAVIK RAMINA',
    'AI ENGINEER',
    'STATUS: ONLINE',
  ];

  useEffect(() => {
    playBootSound();
  }, []);

  useEffect(() => {
    if (shutdown) {
      const timer = setTimeout(() => {
        window.location.href = 'about:blank';
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (stage >= bootSequence.length) {
      setCompleted(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }

    const currentText = bootSequence[stage];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        const nextStageTimer = setTimeout(() => {
          setDisplayText('');
          setStage(stage + 1);
        }, 600);
        return () => clearTimeout(nextStageTimer);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [stage, shutdown]);

  if (shutdown) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-4">
          <div className="text-2xl font-mono text-accent glitch">SYSTEM SHUTDOWN</div>
          <div className="text-sm font-mono text-accent/60">Powering down... Thank you for visiting</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="scanlines absolute inset-0" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <ArcReactor active={!completed} canShutdown={completed} onShutdown={() => setShutdown(true)} />
      </div>

      <div className="relative z-10 text-center pointer-events-none">
        <div className={`text-2xl font-mono font-bold tracking-widest transition-all duration-500 ${
          displayText ? 'text-accent glitch' : 'text-accent/50'
        }`}>
          {displayText}
          {displayText && stage < bootSequence.length - 1 && (
            <span className="animate-pulse">_</span>
          )}
        </div>

        {!completed && (
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-100" />
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse delay-200" />
          </div>
        )}

        {completed && (
          <div className="mt-8 text-accent/60 font-mono text-sm tracking-wider animate-pulse">
            SYSTEM READY - CLICK ARC REACTOR TO SHUTDOWN
          </div>
        )}
      </div>
    </div>
  );
}
