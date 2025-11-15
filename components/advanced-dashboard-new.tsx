'use client';

import { useState, useRef, useEffect } from 'react';
import { playClickSound } from '@/utils/audio-engine';
import ArcReactor from './arc-reactor';
import RotatingHologramName from './rotating-hologram-name';
import IronManCube from './iron-man-cube';
import DetailedContent from './detailed-content';

export default function AdvancedDashboard() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [dataStreamActive, setDataStreamActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sections = [
    { id: 'about', title: 'PROFESSIONAL SUMMARY', brief: 'Aspiring Generative AI Engineer with strong foundation in Deep Learning, Machine Learning, and NLP. Passionate about solving real-world problems with AI.' },
    { id: 'skills', title: 'CORE TECHNICAL SKILLS', brief: 'Python | Deep Learning | NLP | MLOps | GCP | Docker | Apache Airflow | PostgreSQL | Data Engineering' },
    { id: 'experience', title: 'PROFESSIONAL EXPERIENCE', brief: 'Lead AI & Backend Engineering at AIVision21 | AI Software Developer at T&M Services | Junior AI Developer at Tecstaq' },
    { id: 'projects', title: 'KEY PROJECTS', brief: 'LLM Integration systems, AI-powered backend systems, Custom ML models, Intelligent automation solutions' },
    { id: 'contact', title: 'GET IN TOUCH', brief: 'Email: bhavikramina99@gmail.com | Location: Mumbai, Maharashtra | LinkedIn: bhavik-ramina-161076211' },
  ];

  const handleSectionClick = (sectionId: string) => {
    playClickSound();
    setDataStreamActive(true);
    setSelectedSection(selectedSection === sectionId ? null : sectionId);
    
    setTimeout(() => setDataStreamActive(false), 1500);
  };

  // Data stream animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dataStreamActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 1,
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
      ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;

        if (particle.life > 0) {
          ctx.globalAlpha = particle.life;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dataStreamActive]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Data stream canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-20"
        style={{ display: dataStreamActive ? 'block' : 'none' }}
      />

      {/* Grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Arc Reactor + Hologram + Name */}
        <div className="w-1/3 flex flex-col items-center justify-center border-r border-accent/20 p-8">
          <div className="relative h-96 w-full flex items-center justify-center mb-12">
            {/* Iron Man Hologram */}
            <div className="absolute top-0">
              <IronManCube />
            </div>

            {/* Arc Reactor in center */}
            <div className="absolute">
              <ArcReactor active={true} />
            </div>

            {/* Rotating Name around Arc Reactor */}
            <div className="absolute">
              <RotatingHologramName name="BHAVIK RAMINA" />
            </div>
          </div>

          {/* Status Display */}
          <div className="text-center space-y-2 mt-12">
            <div className="font-mono text-xs text-accent/60">POWER CORE: ACTIVE</div>
            <div className="font-mono text-xs text-accent/60">STATUS: ONLINE</div>
          </div>
        </div>

        {/* Right side - Content Sections */}
        <div className="w-2/3 p-12 overflow-y-auto max-h-screen">
          <div className="space-y-6">
            <h1 className="text-4xl font-mono font-bold text-accent mb-12 tracking-wider">AI ENGINEER PORTFOLIO</h1>

            {sections.map((section) => (
              <div key={section.id} className="space-y-0 overflow-hidden">
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full text-left p-4 border transition-all duration-300 cursor-pointer group ${
                    selectedSection === section.id
                      ? 'border-accent/80 bg-accent/10 shadow-lg shadow-accent/20'
                      : 'border-accent/30 hover:border-accent/80 hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-mono text-sm font-bold text-accent group-hover:text-accent transition-colors">
                      {section.title}
                    </h2>
                    <span className={`font-mono text-xs text-accent/60 transition-transform duration-300 ${
                      selectedSection === section.id ? 'rotate-180' : ''
                    }`}>
                      [{selectedSection === section.id ? '−' : '+'}]
                    </span>
                  </div>
                </button>

                <div
                  className={`border-l border-r border-b border-accent/30 bg-accent/5 transition-all duration-500 ease-in-out overflow-hidden ${
                    selectedSection === section.id
                      ? 'max-h-[800px] opacity-100 p-6'
                      : 'max-h-0 opacity-0 p-0'
                  }`}
                >
                  <div className={`${selectedSection === section.id ? 'max-h-[750px] overflow-y-auto pr-2' : ''}`}>
                    {selectedSection === section.id && (
                      <DetailedContent sectionId={section.id} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
