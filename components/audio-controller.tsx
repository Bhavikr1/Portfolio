'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AudioController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Create synthetic techno background music
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    let isRunning = false;

    const startTechnoLoop = () => {
      if (isRunning || isMuted) return;
      isRunning = true;

      const playBassline = (time: number, pattern: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        filter.type = 'lowpass';
        filter.frequency.value = 400;

        const bassNotes = [55, 65, 73, 65]; // Bass frequencies
        const note = bassNotes[pattern % 4];

        oscillator.type = 'sawtooth';
        oscillator.frequency.value = note;

        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.03, time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        oscillator.start(time);
        oscillator.stop(time + 0.4);
      };

      const playKick = (time: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(150, time);
        oscillator.frequency.exponentialRampToValueAtTime(40, time + 0.1);

        gainNode.gain.setValueAtTime(0.2, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

        oscillator.start(time);
        oscillator.stop(time + 0.1);
      };

      const playHiHat = (time: number, closed: boolean) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        filter.type = 'highpass';
        filter.frequency.value = 7000;

        oscillator.type = 'square';
        oscillator.frequency.value = 10000;

        const duration = closed ? 0.03 : 0.08;
        gainNode.gain.setValueAtTime(0.02, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);

        oscillator.start(time);
        oscillator.stop(time + duration);
      };

      const playSynth = (time: number, pattern: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 10;

        const synthNotes = [440, 554, 659, 554]; // Synth melody
        const note = synthNotes[pattern % 4];

        oscillator.type = 'sawtooth';
        oscillator.frequency.value = note;

        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.015, time + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

        oscillator.start(time);
        oscillator.stop(time + 0.3);
      };

      let stepCount = 0;
      const scheduleLoop = () => {
        const currentTime = audioContext.currentTime;
        const beatDuration = 0.25; // 120 BPM, 16th notes

        for (let i = 0; i < 16; i++) {
          const time = currentTime + i * beatDuration;
          const step = (stepCount + i) % 16;

          // Kick drum on 1, 5, 9, 13
          if (step % 4 === 0) {
            playKick(time);
          }

          // Hi-hats on every step, open on off-beats
          playHiHat(time, step % 2 === 0);

          // Bassline every 4 steps
          if (step % 4 === 0) {
            playBassline(time, Math.floor(step / 4));
          }

          // Synth melody every 2 steps
          if (step % 2 === 0) {
            playSynth(time, Math.floor(step / 2));
          }
        }

        stepCount += 16;
        if (isRunning && !isMuted) {
          setTimeout(scheduleLoop, beatDuration * 16 * 800); // Schedule next loop
        }
      };

      scheduleLoop();
    };

    if (isPlaying && !isMuted) {
      startTechnoLoop();
    }

    return () => {
      isRunning = false;
    };
  }, [isPlaying, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="px-3 py-2 bg-black/60 backdrop-blur-md border border-accent/30 font-mono text-xs text-accent hover:border-accent/60 transition-all flex items-center space-x-2"
      >
        <motion.div
          animate={{ opacity: isPlaying ? [1, 0.5, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
          className="w-2 h-2 rounded-full bg-accent"
        />
        <span>{isPlaying ? '⏸ PAUSE AUDIO' : '▶ PLAY AUDIO'}</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="px-3 py-2 bg-black/60 backdrop-blur-md border border-accent/30 font-mono text-xs text-accent hover:border-accent/60 transition-all"
      >
        {isMuted ? '🔇 UNMUTE' : '🔊 MUTE'}
      </motion.button>
    </div>
  );
}
