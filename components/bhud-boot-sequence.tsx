'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArcReactor from './arc-reactor';

interface BHUDBootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  'BOOT SEQUENCE INITIATED…',
  '> POWER NODES: ONLINE',
  '> GRID MATRIX: ACTIVE',
  '> AI CORE: WAKING',
  '> BIOSYNC LEVEL: 98%',
  '',
  'INITIALIZING B-HUD SYSTEM...',
  'BHAVIK HOLOGRAPHIC USER DASHBOARD',
  'VERSION 2.0.1 | BUILD 20250115',
  '',
  'LOADING CORE MODULES...',
  '► ARC REACTOR: ONLINE',
  '► NEURAL INTERFACE: ACTIVE',
  '► HOLOGRAPHIC PROJECTION: READY',
  '► BIOMETRIC SCANNER: ONLINE',
  '',
  'SCANNING…',
  'ANALYZING BIOMETRIC DATA...',
  'CROSS-REFERENCING DATABASE...',
  '',
  'MATCH FOUND.',
  'IDENTITY: BHAVIK RAMINA',
  'ROLE: AI ENGINEER',
  'STATUS: ONLINE',
  'LOCATION: MUMBAI, INDIA',
  '',
  '✓ BIOSYNC COMPLETE',
  '✓ CLEARANCE: ADMIN',
  '✓ ACCESS GRANTED',
  '',
  'ASSEMBLING INTERFACE PANELS...',
  '► SYSTEM CAPABILITIES: LOADED',
  '► MISSION LOGS: ACCESSIBLE',
  '► DEPLOYMENT HISTORY: READY',
  '► COMMUNICATION CHANNELS: OPEN',
  '',
  'B-HUD NEURAL INTERFACE READY',
  'ALL SYSTEMS OPERATIONAL',
  '',
  'Welcome, Operator.',
  'B-HUD systems operational.',
];

export default function BHUDBootSequence({ onComplete }: BHUDBootSequenceProps) {
  const [stage, setStage] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showReactor, setShowReactor] = useState(false);
  const [scanLinePosition, setScanLinePosition] = useState(0);
  const [biometricScan, setBiometricScan] = useState(false);
  const [systemReady, setSystemReady] = useState(false);

  // Voice synthesis function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      utterance.volume = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const sequence = async () => {
      // Stage 0: Initial black screen (500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
      setStage(1);

      // Stage 1: Show Arc Reactor (800ms)
      setShowReactor(true);
      speak('Boot sequence initiated');
      await new Promise(resolve => setTimeout(resolve, 800));
      setStage(2);

      // Stage 2: Boot messages
      for (let i = 0; i < bootMessages.length; i++) {
        setMessages(prev => [...prev, bootMessages[i]]);
        setCurrentMessageIndex(i);

        // Trigger biometric scan at specific message
        if (i === 10) {
          setBiometricScan(true);
          speak('Scanning biometric data');
        }

        // Speak key messages
        if (bootMessages[i] === 'MATCH FOUND.') {
          speak('Match found. Identity confirmed.');
        }
        if (bootMessages[i] === 'IDENTITY: BHAVIK RAMINA') {
          speak('Welcome, Bhavik Ramina');
        }
        if (bootMessages[i] === 'B-HUD NEURAL INTERFACE READY') {
          speak('B-HUD neural interface ready');
        }

        // Faster for empty lines
        const delay = bootMessages[i] === '' ? 100 : 80;
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Stage 3: System ready
      setSystemReady(true);
      speak('All systems operational');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Stage 4: Launch
      setStage(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  // Scan line animation
  useEffect(() => {
    if (biometricScan && scanLinePosition < 100) {
      const timer = setTimeout(() => {
        setScanLinePosition(prev => Math.min(prev + 2, 100));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [biometricScan, scanLinePosition]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
          className="w-full h-full"
        />
      </div>

      {/* Arc Reactor */}
      <AnimatePresence>
        {showReactor && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute z-20 top-20"
          >
            <ArcReactor active={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main terminal */}
      <div className="relative z-30 w-full max-w-4xl px-8">
        {/* Header */}
        {showReactor && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <div className="font-mono text-3xl font-bold text-accent mb-2 tracking-wider">
              B-HUD
            </div>
            <div className="font-mono text-xs text-accent/60 tracking-widest">
              BHAVIK HOLOGRAPHIC USER DASHBOARD
            </div>
          </motion.div>
        )}

        {/* Terminal window */}
        <div className="bg-black/80 border-2 border-accent/30 rounded-lg p-6 backdrop-blur-sm max-h-[60vh] overflow-y-auto">
          {/* Terminal header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-accent/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="font-mono text-xs text-accent/60">SYSTEM CONSOLE</div>
          </div>

          {/* Messages */}
          <div className="space-y-1">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`font-mono text-sm ${
                  msg.startsWith('►') ? 'text-green-400' :
                  msg.startsWith('✓') ? 'text-accent' :
                  msg.includes('ERROR') ? 'text-red-400' :
                  msg === '' ? '' :
                  'text-accent/80'
                }`}
              >
                {msg === '' ? '\u00A0' : msg}
                {index === currentMessageIndex && (
                  <span className="animate-pulse ml-1">_</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Biometric scan animation */}
          {biometricScan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 border border-accent/40 rounded bg-accent/5"
            >
              <div className="font-mono text-xs text-accent/70 mb-2">
                BIOMETRIC SCAN IN PROGRESS...
              </div>
              <div className="relative h-2 bg-black/50 rounded overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/50 to-accent"
                  style={{ width: `${scanLinePosition}%` }}
                />
              </div>
              <div className="font-mono text-xs text-accent/60 mt-2 text-right">
                {scanLinePosition}%
              </div>
            </motion.div>
          )}

          {/* System ready indicator */}
          {systemReady && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 border-2 border-green-400/60 rounded bg-green-400/10"
            >
              <div className="flex items-center justify-center space-x-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-green-400"
                />
                <div className="font-mono text-sm text-green-400 font-bold">
                  SYSTEM READY - LAUNCHING HUD...
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom status bar */}
        {showReactor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 flex items-center justify-between font-mono text-xs text-accent/60"
          >
            <div>POWER CORE: ACTIVE</div>
            <div>UPTIME: {Math.floor(Date.now() / 1000) % 1000}s</div>
            <div>STATUS: BOOTING</div>
          </motion.div>
        )}
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.03) 0px, transparent 1px, transparent 2px, rgba(0,255,255,0.03) 3px)',
          }}
        />
      </div>

      {/* Fade out */}
      <AnimatePresence>
        {stage === 3 && (
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
