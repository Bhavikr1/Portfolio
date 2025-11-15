'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const missions = [
  {
    id: 'RAG-001',
    callSign: 'RAG ENGINE',
    title: 'Enterprise LLM Integration System',
    description: 'Built production-grade RAG system with vector search, context management, and multi-model support for enterprise knowledge bases.',
    status: 'ACTIVE',
    difficulty: 5,
    tech: ['LangChain', 'OpenAI', 'Pinecone', 'FastAPI', 'Redis'],
    objectives: [
      'Implement vector database integration',
      'Build context-aware retrieval system',
      'Deploy multi-model LLM pipeline',
      'Optimize query performance',
    ],
    completion: 95,
  },
  {
    id: 'BACKEND-002',
    callSign: 'NEXUS CORE',
    title: 'AI-Powered Backend Platform',
    description: 'Scalable microservices platform with ML model serving, real-time inference, and intelligent caching layer.',
    status: 'COMPLETED',
    difficulty: 5,
    tech: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'RabbitMQ'],
    objectives: [
      'Architect microservices infrastructure',
      'Implement ML model serving',
      'Build real-time inference pipeline',
      'Deploy production system',
    ],
    completion: 100,
  },
  {
    id: 'ML-003',
    callSign: 'NEURAL NET',
    title: 'Custom ML Model Suite',
    description: 'Domain-specific ML models for classification, prediction, and anomaly detection with automated retraining pipeline.',
    status: 'COMPLETED',
    difficulty: 4,
    tech: ['PyTorch', 'Scikit-learn', 'MLflow', 'GCP', 'Airflow'],
    objectives: [
      'Develop custom ML models',
      'Build automated training pipeline',
      'Implement model versioning',
      'Deploy to production',
    ],
    completion: 100,
  },
  {
    id: 'AUTO-004',
    callSign: 'AUTO PILOT',
    title: 'Intelligent Automation Framework',
    description: 'End-to-end automation system with AI decision-making, workflow orchestration, and adaptive learning capabilities.',
    status: 'IN PROGRESS',
    difficulty: 4,
    tech: ['Python', 'Apache Airflow', 'NLP', 'APIs', 'Celery'],
    objectives: [
      'Design automation workflows',
      'Implement AI decision engine',
      'Build adaptive learning system',
      'Test and optimize',
    ],
    completion: 70,
  },
];

export default function MissionLogs() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400 border-green-400';
      case 'COMPLETED': return 'text-accent border-accent';
      case 'IN PROGRESS': return 'text-yellow-400 border-yellow-400';
      default: return 'text-accent/60 border-accent/60';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="font-mono text-2xl font-bold text-accent mb-2">MISSION LOGS</h2>
          <p className="font-mono text-sm text-accent/60">Classified project briefings and deployment records</p>
        </div>
        <div className="flex items-center space-x-4 font-mono text-xs text-accent/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>{missions.filter(m => m.status === 'ACTIVE').length} ACTIVE</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span>{missions.filter(m => m.status === 'COMPLETED').length} COMPLETED</span>
          </div>
        </div>
      </motion.div>

      {/* Mission grid */}
      <div className="grid grid-cols-2 gap-6">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${
              mission.status === 'ACTIVE' ? 'from-green-400/20 to-green-400/5' :
              mission.status === 'COMPLETED' ? 'from-accent/20 to-accent/5' :
              'from-yellow-400/20 to-yellow-400/5'
            } rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`} />

            {/* Mission card */}
            <div
              className="relative bg-black/60 backdrop-blur-xl border border-accent/30 rounded-lg overflow-hidden hover:border-accent/60 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
            >
              {/* Header */}
              <div className="bg-accent/5 border-b border-accent/20 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-mono text-xs text-accent/50 mb-1">
                      OPERATION: {mission.callSign}
                    </div>
                    <h3 className="font-mono text-sm font-bold text-accent leading-tight">
                      {mission.title}
                    </h3>
                  </div>
                  <div className={`px-2 py-1 border rounded font-mono text-xs ${getStatusColor(mission.status)}`}>
                    {mission.status}
                  </div>
                </div>

                {/* Difficulty level */}
                <div className="flex items-center space-x-1">
                  <span className="font-mono text-xs text-accent/60">DIFFICULTY:</span>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-3 ${
                          i < mission.difficulty ? 'bg-accent' : 'bg-accent/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="font-mono text-xs text-accent/70 leading-relaxed mb-4">
                  {mission.description}
                </p>

                {/* Tech stack */}
                <div className="mb-4">
                  <div className="font-mono text-xs text-accent/50 mb-2">REQUIRED SYSTEMS:</div>
                  <div className="flex flex-wrap gap-2">
                    {mission.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs font-mono bg-accent/10 border border-accent/30 text-accent/90 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Completion bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-accent/60">COMPLETION</span>
                    <span className="font-mono text-accent">{mission.completion}%</span>
                  </div>
                  <div className="relative h-1 bg-black/50 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mission.completion}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`absolute inset-y-0 left-0 rounded ${
                        mission.status === 'COMPLETED' ? 'bg-accent' :
                        mission.status === 'ACTIVE' ? 'bg-green-400' :
                        'bg-yellow-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: selectedMission === mission.id ? 'auto' : 0,
                    opacity: selectedMission === mission.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-accent/20">
                    <div className="font-mono text-xs text-accent/60 mb-2">MISSION OBJECTIVES:</div>
                    <ul className="space-y-1">
                      {mission.objectives.map((obj, i) => (
                        <li key={i} className="font-mono text-xs text-accent/70 flex items-start">
                          <span className="mr-2 text-accent">▹</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent/40" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
