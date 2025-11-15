'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SystemStatus() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.random() * 30 + 20);
      setMemoryUsage(Math.random() * 20 + 60);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const systems = [
    { name: 'ARC REACTOR', status: 'ONLINE', power: 100 },
    { name: 'NEURAL LINK', status: 'ACTIVE', power: 98 },
    { name: 'HOLOGRAPHIC PROJ', status: 'READY', power: 95 },
    { name: 'DATA STREAM', status: 'SYNCED', power: 92 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-6 bg-black/40 backdrop-blur-xl border border-accent/30 rounded-lg p-4"
    >
      <div className="font-mono text-xs text-accent/60 mb-4">SYSTEM STATUS</div>

      {/* Core systems */}
      <div className="space-y-3 mb-4">
        {systems.map((sys, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-accent/70">{sys.name}</span>
              <span className="font-mono text-green-400">{sys.status}</span>
            </div>
            <div className="relative h-1 bg-black/50 rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sys.power}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/50 to-accent rounded"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Resource usage */}
      <div className="pt-3 border-t border-accent/20 space-y-2">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-accent/60">CPU</span>
          <span className="text-accent">{cpuUsage.toFixed(1)}%</span>
        </div>
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-accent/60">MEMORY</span>
          <span className="text-accent">{memoryUsage.toFixed(1)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
