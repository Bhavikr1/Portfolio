'use client';

import { useState } from 'react';
import ArcReactorInteractive from './arc-reactor-interactive';
import IronManCube from './iron-man-cube';
import RotatingHologramName from './rotating-hologram-name';
import InteractiveContentPanel from './interactive-content-panel';
import SpaceDataStream from './space-data-stream';
import { useGlobalAudio } from '@/hooks/use-global-audio';
import HudGrid from './hud-grid';
import ParticleBackground from './particle-background';
import NeuralNetwork from './neural-network';

export default function DashboardAdvanced() {
  const { playClickSound } = useGlobalAudio();
  const [isShutdown, setIsShutdown] = useState(false);

  const contentSections = [
    {
      title: 'PROFESSIONAL SUMMARY',
      content: 'Aspiring Generative AI Engineer with strong foundation in Deep Learning, ML, and NLP.',
    },
    {
      title: 'CORE SKILLS',
      content: 'Python • Deep Learning • NLP • Machine Learning • GCP • Docker • MLOps • Apache Airflow • PostgreSQL',
    },
    {
      title: 'CURRENT ROLE',
      content: 'Lead AI & Backend Engineering at AIVision21 (Oct 2025 - Present)',
    },
    {
      title: 'CERTIFICATIONS',
      content: 'Generative AI • Machine Learning • Prompt Engineering • LangChain • MLOps',
    },
    {
      title: 'EDUCATION',
      content: 'Master\'s: Mathematics & Computer Science - Chandigarh University (2022-2024)\nBachelor\'s: Physics - Thakur College (2019-2022)',
    },
  ];

  const handleShutdown = () => {
    setIsShutdown(true);
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 2000);
  };

  if (isShutdown) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-2xl font-mono text-gray-500 animate-pulse">
            SYSTEM OFFLINE
          </div>
          <div className="text-sm font-mono text-gray-600">
            Goodbye...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden" onClick={() => playClickSound()}>
      <HudGrid />
      <ParticleBackground />
      <NeuralNetwork />
      <SpaceDataStream />

      <div className="relative z-10 min-h-screen flex items-center px-8 py-12">
        
        {/* Left Section: Arc Reactor + Hologram + Name */}
        <div className="flex flex-col items-center space-y-8 min-w-max">
          {/* Iron Man Rotating Cube Hologram */}
          <div className="relative">
            <IronManCube />
          </div>

          {/* Rotating Name Hologram */}
          <div className="relative -mt-12">
            <RotatingHologramName name="BHAVIK" radius={100} />
          </div>

          {/* Arc Reactor - Interactive Shutdown */}
          <div className="pt-8">
            <ArcReactorInteractive onShutdown={handleShutdown} />
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="flex-1 ml-16 max-w-2xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-accent tracking-widest mb-3">
              BHAVIK RAMINA
            </h1>
            <p className="text-accent/70 font-mono text-sm tracking-wider">
              AI ENGINEER • GENERATIVE AI SPECIALIST • ML ENTHUSIAST
            </p>
          </div>

          {/* Interactive Content Sections */}
          <InteractiveContentPanel items={contentSections} />

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-accent/20 space-y-3">
            <p className="text-accent/60 font-mono text-xs">
              📧 bhavikramina99@gmail.com
            </p>
            <p className="text-accent/60 font-mono text-xs">
              📍 Mumbai, Maharashtra, India
            </p>
            <a
              href="https://www.linkedin.com/in/bhavik-ramina-161076211/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 font-mono text-xs inline-flex items-center gap-2 transition-colors"
            >
              🔗 LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
