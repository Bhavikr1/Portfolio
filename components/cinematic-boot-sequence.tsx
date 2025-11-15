'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArcReactor from './arc-reactor';

interface CinematicBootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  'BOOTING SYSTEMS…',
  'ARC REACTOR ONLINE…',
  'POWER CORE: ACTIVE',
  'INITIALIZING NEURAL INTERFACE…',
  'USER IDENTITY DETECTED',
  'NAME: BHAVIK RAMINA',
  'DESIGNATION: AI ENGINEER',
  'STATUS: ONLINE',
  'UNLOCKING PORTFOLIO MODULES…',
  'SYSTEM READY',
];

export default function CinematicBootSequence({ onComplete }: CinematicBootSequenceProps) {
  const [stage, setStage] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showReactor, setShowReactor] = useState(false);
  const [hudElements, setHudElements] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [readyToLaunch, setReadyToLaunch] = useState(false);

  useEffect(() => {
    console.log('Boot sequence stage:', stage);

    const timeline = [
      // Stage 0: Black screen with static (500ms)
      () => {
        console.log('Stage 0: Static');
        return setTimeout(() => setStage(1), 500);
      },

      // Stage 1: Arc reactor pulse appears (1000ms)
      () => {
        console.log('Stage 1: Arc Reactor');
        setShowReactor(true);
        return setTimeout(() => setStage(2), 1000);
      },

      // Stage 2: HUD elements assemble (1500ms)
      () => {
        console.log('Stage 2: HUD Elements');
        setHudElements(true);
        return setTimeout(() => setStage(3), 1500);
      },

      // Stage 3: Boot messages (200ms per character)
      () => {
        console.log('Stage 3: Boot Messages');
        let messageIndex = 0;
        let charIndex = 0;

        const typeMessage = () => {
          if (messageIndex >= bootMessages.length) {
            setTimeout(() => setStage(4), 800);
            return;
          }

          const currentMessage = bootMessages[messageIndex];

          if (charIndex <= currentMessage.length) {
            setDisplayText(currentMessage.slice(0, charIndex));
            charIndex++;
            setTimeout(typeMessage, 30);
          } else {
            setTimeout(() => {
              messageIndex++;
              charIndex = 0;
              setDisplayText('');
              typeMessage();
            }, 400);
          }
        };

        typeMessage();
      },

      // Stage 4: Ready to launch - auto proceed after 2 seconds
      () => {
        console.log('Stage 4: Ready to Launch');
        setScanComplete(true);
        setReadyToLaunch(true);
        console.log('readyToLaunch set to true, auto-launching in 2s');
        return setTimeout(() => setStage(5), 2000);
      },

      // Stage 5: Fade to main UI (1000ms) - triggered by click
      () => {
        console.log('Stage 5: Launching');
        return setTimeout(() => onComplete(), 1000);
      },
    ];

    if (stage < timeline.length) {
      const timer = timeline[stage]();
      return () => timer && clearTimeout(timer);
    }
  }, [stage, onComplete]);

  const handleReactorClick = () => {
    console.log('Click detected! readyToLaunch:', readyToLaunch);
    if (readyToLaunch) {
      console.log('Launching portfolio!');
      setStage(5);
    } else {
      console.log('Not ready yet');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
      onClick={() => readyToLaunch && handleReactorClick()}
      style={{ cursor: readyToLaunch ? 'pointer' : 'default' }}
    >
      {/* Static Noise Effect (Stage 0) */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black">
              <svg className="w-full h-full opacity-20">
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                  <feColorMatrix values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0.3 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arc Reactor Pulse (Stage 1+) */}
      <AnimatePresence>
        {showReactor && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute z-20 flex flex-col items-center pointer-events-none"
          >
            <div className="relative">
              <ArcReactor active={true} />
            </div>

            {readyToLaunch && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center w-max mt-8"
              >
                <motion.div
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="font-mono text-sm text-accent tracking-wider"
                >
                  ▼ CLICK ANYWHERE TO INITIALIZE PORTFOLIO ▼
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Elements Assembly (Stage 2+) */}
      <AnimatePresence>
        {hudElements && (
          <>
            {/* Top corners */}
            <motion.div
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-accent/40 z-10"
            />
            <motion.div
              initial={{ x: 100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-accent/40 z-10"
            />

            {/* Bottom corners */}
            <motion.div
              initial={{ x: -100, y: 100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-accent/40 z-10"
            />
            <motion.div
              initial={{ x: 100, y: 100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-accent/40 z-10"
            />

            {/* Side panels */}
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            >
              <div className="h-64 w-1 bg-gradient-to-b from-transparent via-accent/60 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            >
              <div className="h-64 w-1 bg-gradient-to-b from-transparent via-accent/60 to-transparent" />
            </motion.div>

            {/* Circular HUD rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 1, delay: 0.3 + ring * 0.2 }}
                className="absolute inset-0 z-0 flex items-center justify-center"
              >
                <div
                  className="rounded-full border border-accent/30"
                  style={{
                    width: `${ring * 250}px`,
                    height: `${ring * 250}px`,
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Boot Messages (Stage 3+) */}
      <AnimatePresence>
        {displayText && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 z-30"
          >
            <div className="text-center space-y-2">
              <div className="font-mono text-xl text-accent tracking-widest">
                {displayText}
                <span className="animate-pulse ml-1">_</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan Line Animation (Stage 4) */}
      <AnimatePresence>
        {scanComplete && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 1, ease: 'linear' }}
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent z-40 opacity-60"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Glitch Effect Overlay */}
      {stage >= 3 && stage < 5 && (
        <motion.div
          animate={{
            opacity: [0, 0.1, 0, 0.1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute inset-0 z-50 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, rgba(0,255,255,0.1) 0%, transparent 50%, rgba(0,255,255,0.1) 100%)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Scanlines overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.03) 0px, transparent 1px, transparent 2px, rgba(0,255,255,0.03) 3px)',
          }}
        />
      </div>

      {/* Final fade out */}
      <AnimatePresence>
        {stage === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
