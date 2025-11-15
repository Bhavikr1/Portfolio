'use client';

const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

// Mechanical beep sounds
const generateBeep = (frequency: number, duration: number = 0.1) => {
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const playClickSound = () => {
  generateBeep(800, 0.05);
  generateBeep(1200, 0.1);
};

export const playShutdownSound = () => {
  const pitches = [1200, 1000, 800, 600, 400];
  pitches.forEach((pitch, i) => {
    setTimeout(() => generateBeep(pitch, 0.15), i * 150);
  });
};

export const playBootSound = () => {
  const pitches = [400, 600, 800, 1000, 1200];
  pitches.forEach((pitch, i) => {
    setTimeout(() => generateBeep(pitch, 0.12), i * 100);
  });
};

export const playWarningSound = () => {
  generateBeep(1500, 0.08);
  setTimeout(() => generateBeep(1500, 0.08), 150);
};
