'use client';

import { useEffect } from 'react';
import { playClickSound } from '@/utils/audio-engine';

export const useGlobalAudio = () => {
  useEffect(() => {
    const handleGlobalClick = () => {
      playClickSound();
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return { playClickSound };
};
