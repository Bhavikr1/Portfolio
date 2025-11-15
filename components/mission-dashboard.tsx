'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface MissionProject {
  callSign: string;
  title: string;
  description: string;
  tech: string[];
  status: 'ACTIVE' | 'COMPLETED' | 'IN PROGRESS';
  level: number;
}

interface MissionDashboardProps {
  projects: MissionProject[];
}

export default function MissionDashboard({ projects }: MissionDashboardProps) {
  const [selectedMission, setSelectedMission] = useState<number | null>(null);

  const statusColors = {
    'ACTIVE': 'text-green-400 border-green-400',
    'COMPLETED': 'text-accent border-accent',
    'IN PROGRESS': 'text-yellow-400 border-yellow-400',
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group cursor-pointer"
          onClick={() => setSelectedMission(selectedMission === index ? null : index)}
        >
          {/* Holographic glow effect */}
          <motion.div
            animate={{
              opacity: selectedMission === index ? 0.6 : 0,
            }}
            className="absolute -inset-1 bg-gradient-to-r from-accent via-blue-500 to-accent blur-lg"
          />

          {/* Mission card */}
          <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-accent/10 via-background/90 to-accent/5 border border-accent/30 rounded-lg overflow-hidden hover:border-accent/60 transition-all duration-300">
            {/* Top status bar */}
            <div className="relative bg-accent/5 border-b border-accent/20 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className={`w-2 h-2 rounded-full ${
                      project.status === 'ACTIVE' ? 'bg-green-400' :
                      project.status === 'IN PROGRESS' ? 'bg-yellow-400' :
                      'bg-accent'
                    }`}
                  />
                  <span className={`font-mono text-xs uppercase tracking-wider ${
                    statusColors[project.status].split(' ')[0]
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Level indicator */}
                <div className="flex items-center space-x-1">
                  <span className="font-mono text-xs text-accent/60">LVL</span>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-3 ${
                          i < project.level ? 'bg-accent' : 'bg-accent/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Scan line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-accent/50"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>

            {/* Mission details */}
            <div className="p-5 space-y-3">
              {/* Call sign */}
              <div className="font-mono text-xs text-accent/50 tracking-widest">
                OPERATION: {project.callSign}
              </div>

              {/* Title */}
              <h3 className="font-mono text-sm font-bold text-accent leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-mono text-xs text-accent/70 leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="pt-2">
                <div className="font-mono text-xs text-accent/50 mb-2">
                  TECH STACK:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      className="relative group/tech"
                    >
                      <div className="px-2 py-1 bg-accent/10 border border-accent/30 rounded font-mono text-xs text-accent/90 hover:bg-accent/20 hover:border-accent/50 transition-all">
                        {tech}
                      </div>

                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-accent/20 blur opacity-0 group-hover/tech:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Expanded details */}
              <motion.div
                initial={false}
                animate={{
                  height: selectedMission === index ? 'auto' : 0,
                  opacity: selectedMission === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-accent/20">
                  <div className="font-mono text-xs text-accent/60">
                    • Mission briefing and detailed specifications available
                    <br />
                    • Deployment status: {project.status}
                    <br />
                    • Complexity level: {project.level}/5
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-accent/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-accent/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent/40" />

            {/* Holographic overlay pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.05) 2px, rgba(0,255,255,0.05) 4px)',
              }}
            />

            {/* Expand indicator */}
            <div className="absolute bottom-2 right-2">
              <motion.div
                animate={{
                  rotate: selectedMission === index ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs text-accent/40"
              >
                {selectedMission === index ? '▴' : '▾'}
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
