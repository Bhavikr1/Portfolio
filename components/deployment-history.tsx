'use client';

import { motion } from 'framer-motion';

const deployments = [
  {
    id: 'DEP-001',
    operation: 'Lead AI & Backend Engineering',
    organization: 'AIVision21',
    period: 'Current',
    status: 'ACTIVE',
    achievements: [
      'Leading development of enterprise-grade AI applications',
      'Architecting scalable microservices backend architecture',
      'Implementing advanced LLM integration with RAG systems',
      'Managing team of developers and setting technical direction',
    ],
    xpGained: 2500,
    level: 'SENIOR',
  },
  {
    id: 'DEP-002',
    operation: 'AI Software Developer',
    organization: 'T&M Services',
    period: '2023-2024',
    status: 'COMPLETED',
    achievements: [
      'Developed custom ML models for business automation',
      'Built intelligent document processing pipelines',
      'Optimized model performance for production deployment',
      'Integrated AI solutions with existing enterprise systems',
    ],
    xpGained: 2000,
    level: 'MID-LEVEL',
  },
  {
    id: 'DEP-003',
    operation: 'Junior AI Developer',
    organization: 'Tecstaq',
    period: '2022-2023',
    status: 'COMPLETED',
    achievements: [
      'Worked on NLP and computer vision projects',
      'Developed data preprocessing and feature engineering pipelines',
      'Contributed to ML model training and evaluation',
      'Collaborated with senior engineers on production deployments',
    ],
    xpGained: 1500,
    level: 'JUNIOR',
  },
];

export default function DeploymentHistory() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-mono text-2xl font-bold text-accent mb-2">DEPLOYMENT HISTORY</h2>
        <p className="font-mono text-sm text-accent/60">Field operations and experience records</p>
      </motion.div>

      {/* XP Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-accent/10 to-transparent border border-accent/30 rounded-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-xs text-accent/60 mb-1">TOTAL EXPERIENCE POINTS</div>
            <div className="font-mono text-4xl font-bold text-accent">
              {deployments.reduce((acc, dep) => acc + dep.xpGained, 0)} XP
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-accent/60 mb-1">DEPLOYMENT LEVEL</div>
            <div className="font-mono text-2xl font-bold text-green-400">SENIOR</div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent to-transparent" />

        <div className="space-y-8">
          {deployments.map((deployment, index) => (
            <motion.div
              key={deployment.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-20"
            >
              {/* Timeline node */}
              <motion.div
                animate={{
                  scale: deployment.status === 'ACTIVE' ? [1, 1.3, 1] : 1,
                  opacity: deployment.status === 'ACTIVE' ? [0.5, 1, 0.5] : 0.7,
                }}
                transition={{
                  duration: 2,
                  repeat: deployment.status === 'ACTIVE' ? Infinity : 0,
                }}
                className="absolute left-6 top-6 w-4 h-4 -translate-x-1/2"
              >
                <div className={`w-full h-full rounded-full ${
                  deployment.status === 'ACTIVE' ? 'bg-green-400' : 'bg-accent'
                } shadow-lg ${
                  deployment.status === 'ACTIVE' ? 'shadow-green-400/50' : 'shadow-accent/50'
                }`} />

                {/* Outer ring */}
                {deployment.status === 'ACTIVE' && (
                  <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping" style={{ animationDuration: '3s' }} />
                )}
              </motion.div>

              {/* Connecting line */}
              <div className="absolute left-8 top-6 w-12 h-0.5 bg-gradient-to-r from-accent/50 to-accent/20" />

              {/* Deployment card */}
              <div className="bg-black/60 backdrop-blur-xl border border-accent/30 rounded-lg overflow-hidden hover:border-accent/60 transition-all group">
                {/* Header */}
                <div className="bg-accent/5 border-b border-accent/20 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-mono text-xs text-accent/50 mb-1">
                        OPERATION ID: {deployment.id}
                      </div>
                      <h3 className="font-mono text-lg font-bold text-accent mb-1">
                        {deployment.operation}
                      </h3>
                      <div className="font-mono text-sm text-accent/70">
                        {deployment.organization}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 border rounded font-mono text-xs mb-2 ${
                        deployment.status === 'ACTIVE'
                          ? 'bg-green-400/10 border-green-400 text-green-400'
                          : 'bg-accent/10 border-accent text-accent'
                      }`}>
                        {deployment.status}
                      </div>
                      <div className="font-mono text-xs text-accent/60">
                        {deployment.period}
                      </div>
                    </div>
                  </div>

                  {/* Level badge */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent/10 border border-accent/30 rounded">
                    <span className="font-mono text-xs text-accent/60">LEVEL:</span>
                    <span className="font-mono text-xs text-accent font-bold">{deployment.level}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Achievements */}
                  <div className="mb-4">
                    <div className="font-mono text-xs text-accent/60 mb-3">ACHIEVEMENTS UNLOCKED:</div>
                    <ul className="space-y-2">
                      {deployment.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          className="flex items-start space-x-2 group/item"
                        >
                          <span className="text-accent mt-1 text-xs">▹</span>
                          <span className="font-mono text-xs text-accent/80 leading-relaxed group-hover/item:text-accent transition-colors">
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* XP gained */}
                  <div className="pt-4 border-t border-accent/20 flex items-center justify-between">
                    <div className="font-mono text-xs text-accent/60">
                      EXPERIENCE GAINED
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.5, type: 'spring' }}
                        className="font-mono text-lg font-bold text-accent"
                      >
                        +{deployment.xpGained} XP
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline end */}
        <div className="absolute left-8 -bottom-8 w-0.5 h-8 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </div>
  );
}
