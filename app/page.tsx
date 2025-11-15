'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import BHUDBootSequence from '@/components/bhud-boot-sequence';

// Dynamically import the B-HUD interface to avoid SSR issues with Three.js
const BHUDMainInterface = dynamic(
  () => import('@/components/bhud-main-interface'),
  { ssr: false }
);

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setTimeout(() => {
      setBootComplete(false);
      setIsShuttingDown(false);
    }, 2000);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      {!bootComplete ? (
        <BHUDBootSequence onComplete={() => setBootComplete(true)} />
      ) : (
        <BHUDMainInterface onShutdown={handleShutdown} isShuttingDown={isShuttingDown} />
      )}
    </main>
  );
}
