'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './particle-background';
import HolographicCore3D from './holographic-core-3d';
import SystemStatus from './system-status';
import MissionLogs from './mission-logs';
import SystemCapabilities from './system-capabilities';
import DeploymentHistory from './deployment-history';
import CommunicationChannels from './communication-channels';
import AudioController from './audio-controller';
import { useSound } from '@/hooks/useSound';

interface BHUDMainInterfaceProps {
  onShutdown?: () => void;
  isShuttingDown?: boolean;
}

export default function BHUDMainInterface({ onShutdown, isShuttingDown }: BHUDMainInterfaceProps) {
  const [activeModule, setActiveModule] = useState<string>('overview');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [systemTime, setSystemTime] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const { playClick, playHoverSound } = useSound();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update system time
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const modules = [
    { id: 'overview', label: 'OVERVIEW', icon: '◈' },
    { id: 'capabilities', label: 'SYSTEM CAPABILITIES', icon: '⚡' },
    { id: 'missions', label: 'MISSION LOGS', icon: '⚔' },
    { id: 'deployments', label: 'DEPLOYMENT HISTORY', icon: '📊' },
    { id: 'comms', label: 'COMMUNICATION', icon: '📡' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Shutdown overlay */}
      {isShuttingDown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 0.95, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-3xl font-mono text-accent"
            >
              POWERING DOWN B-HUD...
            </motion.div>
            <div className="text-sm font-mono text-accent/60">
              DISCONNECTING NEURAL INTERFACE
            </div>
          </div>
        </motion.div>
      )}

      {/* Particle background */}
      <ParticleBackground />

      {/* Main container with parallax */}
      <div
        ref={containerRef}
        className="relative z-10 min-h-screen"
        style={{
          transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Top HUD Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-accent/30">
          <div className="max-w-[2000px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Branding */}
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 border-2 border-accent rounded-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 bg-accent rounded-full animate-pulse" />
                </motion.div>
                <div>
                  <div className="font-mono text-xl font-bold text-accent tracking-wider">B-HUD</div>
                  <div className="font-mono text-xs text-accent/60">NEURAL INTERFACE v2.0.1</div>
                </div>
              </div>

              {/* Center: Navigation */}
              <div className="flex items-center space-x-2">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => {
                      playClick();
                      setActiveModule(module.id);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`px-4 py-2 font-mono text-xs border transition-all duration-300 ${
                      activeModule === module.id
                        ? 'bg-accent/20 border-accent text-accent'
                        : 'bg-black/40 border-accent/30 text-accent/60 hover:border-accent/60 hover:text-accent'
                    }`}
                  >
                    <span className="mr-2">{module.icon}</span>
                    {module.label}
                  </button>
                ))}
              </div>

              {/* Right: System status */}
              <div className="flex items-center space-x-6 font-mono text-xs text-accent/60">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-400"
                  />
                  <span>CORE: ONLINE</span>
                </div>
                <div>{systemTime.toLocaleTimeString()}</div>
                <button
                  onClick={onShutdown}
                  className="px-3 py-1 border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-all"
                >
                  SHUTDOWN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="pt-24 px-6 pb-6">
          <div className="max-w-[2000px] mx-auto">
            {/* Overview Mode */}
            {activeModule === 'overview' && (
              <div className="grid grid-cols-3 gap-6">
                {/* Left: 3D Core */}
                <div className="col-span-1">
                  <div className="sticky top-24">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="bg-black/40 backdrop-blur-xl border border-accent/30 rounded-lg p-6"
                    >
                      <div className="text-center mb-4">
                        <div className="font-mono text-xs text-accent/50 mb-2">CORE USER</div>
                        <h2 className="font-mono text-2xl font-bold text-accent">BHAVIK RAMINA</h2>
                        <div className="font-mono text-sm text-accent/70">AI ENGINEER</div>
                      </div>

                      {/* 3D Holographic Core */}
                      <div
                        className="w-full h-80 cursor-pointer relative group"
                        onClick={onShutdown}
                      >
                        <HolographicCore3D />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-max"
                        >
                          <div className="font-mono text-xs text-accent/60">
                            CLICK TO SHUTDOWN
                          </div>
                        </motion.div>
                      </div>

                      {/* Identity info */}
                      <div className="mt-6 space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-accent/60">
                          <span>LOCATION:</span>
                          <span className="text-accent">MUMBAI, INDIA</span>
                        </div>
                        <div className="flex justify-between text-accent/60">
                          <span>CLEARANCE:</span>
                          <span className="text-green-400">ADMIN</span>
                        </div>
                        <div className="flex justify-between text-accent/60">
                          <span>STATUS:</span>
                          <span className="text-green-400">ACTIVE</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* System Status */}
                    <SystemStatus />
                  </div>
                </div>

                {/* Right: Quick access panels */}
                <div className="col-span-2 space-y-6">
                  {/* Welcome message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-accent/10 to-transparent border border-accent/30 rounded-lg p-6"
                  >
                    <div className="font-mono text-sm text-accent/80 leading-relaxed">
                      <div className="text-accent font-bold mb-2">◈ SYSTEM MESSAGE</div>
                      Welcome to B-HUD Neural Interface. All systems operational. You have full access
                      to mission logs, deployment history, and communication channels. Core user:
                      <span className="text-accent font-bold"> BHAVIK RAMINA</span> - AI Engineer
                      specializing in Generative AI, Deep Learning, and Production ML Systems.
                    </div>
                  </motion.div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'ACTIVE MISSIONS', value: '4', status: 'operational' },
                      { label: 'DEPLOYMENTS', value: '12+', status: 'success' },
                      { label: 'SYSTEM MODULES', value: '25+', status: 'online' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/40 backdrop-blur-xl border border-accent/30 rounded-lg p-4 hover:border-accent/60 transition-all"
                      >
                        <div className="font-mono text-xs text-accent/60 mb-2">{stat.label}</div>
                        <div className="font-mono text-3xl font-bold text-accent">{stat.value}</div>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="font-mono text-xs text-green-400 uppercase">{stat.status}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent activity preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black/40 backdrop-blur-xl border border-accent/30 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-mono text-sm font-bold text-accent">RECENT ACTIVITY</h3>
                      <button className="font-mono text-xs text-accent/60 hover:text-accent">VIEW ALL →</button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { time: '2m ago', action: 'Mission "RAG ENGINE" status updated', type: 'mission' },
                        { time: '1h ago', action: 'New deployment: AI Backend Platform', type: 'deploy' },
                        { time: '3h ago', action: 'System capability: LangChain module activated', type: 'system' },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-start space-x-3 pb-3 border-b border-accent/10 last:border-0">
                          <div className="w-2 h-2 mt-1 rounded-full bg-accent animate-pulse" />
                          <div className="flex-1">
                            <div className="font-mono text-xs text-accent/80">{activity.action}</div>
                            <div className="font-mono text-xs text-accent/50 mt-1">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Other modules */}
            {activeModule === 'capabilities' && <SystemCapabilities />}
            {activeModule === 'missions' && <MissionLogs />}
            {activeModule === 'deployments' && <DeploymentHistory />}
            {activeModule === 'comms' && <CommunicationChannels />}
          </div>
        </div>

        {/* Corner HUD elements */}
        <div className="fixed top-24 left-6 z-40 font-mono text-xs text-accent/40">
          <div>SYS: B-HUD v2.0.1</div>
          <div>PWR: 100%</div>
          <div>LAT: 19.0760° N</div>
          <div>LNG: 72.8777° E</div>
        </div>

        <div className="fixed bottom-6 right-6 z-40 font-mono text-xs text-accent/40 text-right">
          <div>UPTIME: {Math.floor(Date.now() / 1000 % 86400)}s</div>
          <div>MODULES: ACTIVE</div>
          <div>NEURAL: SYNCED</div>
        </div>
      </div>

      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.03) 0px, transparent 1px, transparent 2px, rgba(0,255,255,0.03) 3px)',
          }}
        />
      </div>
    </div>
  );
}
