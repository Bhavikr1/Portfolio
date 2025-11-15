'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './particle-background';
import HolographicCore3D from './holographic-core-3d';
import HolographicPanel from './holographic-panel';
import HolographicTimeline from './holographic-timeline';
import MissionDashboard from './mission-dashboard';

interface PremiumJarvisDashboardProps {
  onShutdown?: () => void;
  isShuttingDown?: boolean;
}

export default function PremiumJarvisDashboard({ onShutdown, isShuttingDown }: PremiumJarvisDashboardProps) {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const experienceData = [
    {
      title: 'Lead AI & Backend Engineering',
      company: 'AIVision21',
      period: 'Current',
      status: 'current' as const,
      points: [
        'Leading development of enterprise-grade AI applications',
        'Architecting scalable microservices backend architecture',
        'Implementing advanced LLM integration with RAG systems',
        'Managing team of developers and setting technical direction',
      ],
    },
    {
      title: 'AI Software Developer',
      company: 'T&M Services',
      period: '2023-2024',
      status: 'past' as const,
      points: [
        'Developed custom ML models for business automation',
        'Built intelligent document processing pipelines',
        'Optimized model performance for production deployment',
        'Integrated AI solutions with existing enterprise systems',
      ],
    },
    {
      title: 'Junior AI Developer',
      company: 'Tecstaq',
      period: '2022-2023',
      status: 'past' as const,
      points: [
        'Worked on NLP and computer vision projects',
        'Developed data preprocessing and feature engineering pipelines',
        'Contributed to ML model training and evaluation',
        'Collaborated with senior engineers on production deployments',
      ],
    },
  ];

  const projectsData = [
    {
      callSign: 'RAG ENGINE',
      title: 'Enterprise LLM Integration System',
      description: 'Built production-grade RAG system with vector search, context management, and multi-model support for enterprise knowledge bases.',
      tech: ['LangChain', 'OpenAI', 'Pinecone', 'FastAPI', 'Redis'],
      status: 'ACTIVE' as const,
      level: 5,
    },
    {
      callSign: 'NEXUS CORE',
      title: 'AI-Powered Backend Platform',
      description: 'Scalable microservices platform with ML model serving, real-time inference, and intelligent caching layer.',
      tech: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'RabbitMQ'],
      status: 'COMPLETED' as const,
      level: 5,
    },
    {
      callSign: 'NEURAL NET',
      title: 'Custom ML Model Suite',
      description: 'Domain-specific ML models for classification, prediction, and anomaly detection with automated retraining pipeline.',
      tech: ['PyTorch', 'Scikit-learn', 'MLflow', 'GCP', 'Airflow'],
      status: 'COMPLETED' as const,
      level: 4,
    },
    {
      callSign: 'AUTO PILOT',
      title: 'Intelligent Automation Framework',
      description: 'End-to-end automation system with AI decision-making, workflow orchestration, and adaptive learning capabilities.',
      tech: ['Python', 'Apache Airflow', 'NLP', 'APIs', 'Celery'],
      status: 'IN PROGRESS' as const,
      level: 4,
    },
  ];

  const skillsData = {
    categories: [
      {
        title: 'AI/ML',
        skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'LangChain', 'RAG Systems'],
      },
      {
        title: 'Backend & APIs',
        skills: ['FastAPI', 'Flask', 'Django', 'REST APIs', 'GraphQL', 'WebSockets', 'gRPC'],
      },
      {
        title: 'Cloud & DevOps',
        skills: ['GCP', 'Docker', 'Kubernetes', 'Apache Airflow', 'CI/CD', 'Git', 'Terraform'],
      },
      {
        title: 'Data & Databases',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Vector DBs', 'SQL', 'Data Engineering', 'ETL'],
      },
    ],
  };

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
              SHUTTING DOWN...
            </motion.div>
            <div className="text-sm font-mono text-accent/60">
              POWERING DOWN ARC REACTOR
            </div>
          </div>
        </motion.div>
      )}

      {/* Particle background */}
      <ParticleBackground />

      {/* Main container with parallax effect */}
      <div
        ref={containerRef}
        className="relative z-10 min-h-screen"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="flex">
          {/* Left sidebar - 3D Hologram */}
          <div className="w-1/3 min-h-screen flex flex-col items-center justify-center border-r border-accent/20 p-8 relative">
            {/* HUD corner brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-accent/40" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/40" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/40" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/40" />

            {/* 3D Holographic Core */}
            <div
              className="w-full h-96 mb-8 cursor-pointer group relative"
              onClick={onShutdown}
              title="Click to shutdown"
            >
              <HolographicCore3D />

              {/* Hover instruction */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-max"
              >
                <div className="font-mono text-xs text-accent/60">
                  CLICK TO SHUTDOWN
                </div>
              </motion.div>
            </div>

            {/* Identity display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="space-y-1">
                <div className="font-mono text-xs text-accent/50 tracking-widest">
                  IDENTITY CONFIRMED
                </div>
                <h2 className="font-mono text-xl font-bold text-accent tracking-wider">
                  BHAVIK RAMINA
                </h2>
                <div className="font-mono text-sm text-accent/70">
                  AI ENGINEER
                </div>
              </div>

              {/* Status indicators */}
              <div className="flex items-center justify-center space-x-4 pt-4">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-400"
                  />
                  <span className="font-mono text-xs text-accent/60">POWER CORE: ACTIVE</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-2 h-2 rounded-full bg-accent"
                  />
                  <span className="font-mono text-xs text-accent/60">STATUS: ONLINE</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right content area */}
          <div className="w-2/3 p-12 overflow-y-auto max-h-screen">
            <div className="space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-5xl font-mono font-bold text-accent mb-4 tracking-wider">
                  AI ENGINEER PORTFOLIO
                </h1>
                <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              </motion.div>

              {/* Professional Summary Panel */}
              <HolographicPanel
                title="PROFESSIONAL SUMMARY"
                icon="◈"
                delay={0.1}
                isOpen={openPanel === 'about'}
                onToggle={() => setOpenPanel(openPanel === 'about' ? null : 'about')}
              >
                <div className="space-y-3">
                  {[
                    'Aspiring Generative AI Engineer with strong foundation in Deep Learning, Machine Learning, and NLP.',
                    'Passionate about solving real-world problems with AI and building production-ready solutions.',
                    'Experienced in architecting scalable AI-powered applications and backend systems.',
                    'Strong focus on MLOps, deployment strategies, and creating high-impact AI solutions.',
                  ].map((text, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <span className="text-accent mt-1">▹</span>
                      <p className="font-mono text-sm text-accent/80 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </HolographicPanel>

              {/* Core Technical Skills Panel */}
              <HolographicPanel
                title="CORE TECHNICAL SKILLS"
                icon="◈"
                delay={0.2}
                isOpen={openPanel === 'skills'}
                onToggle={() => setOpenPanel(openPanel === 'skills' ? null : 'skills')}
              >
                <div className="grid grid-cols-2 gap-4">
                  {skillsData.categories.map((category, index) => (
                    <div
                      key={index}
                      className="border border-accent/30 p-4 hover:border-accent/60 transition-all duration-300 backdrop-blur-sm bg-accent/5"
                    >
                      <h3 className="font-mono text-xs font-bold text-accent mb-3 uppercase tracking-wider">
                        {category.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs font-mono bg-accent/10 border border-accent/30 text-accent/90 hover:bg-accent/20 hover:border-accent/50 transition-all cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicPanel>

              {/* Professional Experience Panel */}
              <HolographicPanel
                title="PROFESSIONAL EXPERIENCE"
                icon="◈"
                delay={0.3}
                isOpen={openPanel === 'experience'}
                onToggle={() => setOpenPanel(openPanel === 'experience' ? null : 'experience')}
              >
                <HolographicTimeline items={experienceData} />
              </HolographicPanel>

              {/* Key Projects Panel */}
              <HolographicPanel
                title="MISSION BRIEFINGS"
                icon="◈"
                delay={0.4}
                isOpen={openPanel === 'projects'}
                onToggle={() => setOpenPanel(openPanel === 'projects' ? null : 'projects')}
              >
                <MissionDashboard projects={projectsData} />
              </HolographicPanel>

              {/* Contact Panel */}
              <HolographicPanel
                title="GET IN TOUCH"
                icon="◈"
                delay={0.5}
                isOpen={openPanel === 'contact'}
                onToggle={() => setOpenPanel(openPanel === 'contact' ? null : 'contact')}
              >
                <div className="space-y-3">
                  {[
                    { label: 'Email', value: 'bhavikramina99@gmail.com', icon: '📧' },
                    { label: 'Location', value: 'Mumbai, Maharashtra', icon: '📍' },
                    { label: 'LinkedIn', value: 'bhavik-ramina-161076211', icon: '💼' },
                    { label: 'GitHub', value: 'Available on request', icon: '💻' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 border border-accent/30 hover:border-accent/60 transition-all duration-300 backdrop-blur-sm bg-accent/5"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="font-mono text-xs text-accent/60">{item.label}</p>
                        <p className="font-mono text-sm text-accent">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicPanel>
            </div>
          </div>
        </div>
      </div>

      {/* Scanline overlay */}
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
