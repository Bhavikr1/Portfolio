'use client';

import { useState } from 'react';
import { useGlobalAudio } from '@/hooks/use-global-audio';
import HologramPanel from './hologram-panel';
import Navigation from './navigation';
import HudGrid from './hud-grid';
import ParticleBackground from './particle-background';
import NeuralNetwork from './neural-network';
import StatDisplay from './stat-display';
import SkillBar from './skill-bar';
import RotatingHologram from './rotating-hologram';
import RotatingName from './rotating-name';
import { portfolioData } from '@/utils/portfolio-data';

export default function Dashboard() {
  useGlobalAudio();
  const [activeSection, setActiveSection] = useState('about');

  const sections = ['about', 'skills', 'projects', 'experience', 'contact'];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <HudGrid />
      <ParticleBackground />
      <NeuralNetwork />

      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent" />
      </div>

      <Navigation 
        sections={sections} 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="fixed top-24 right-4 z-40 space-y-2 w-48">
        <StatDisplay label="System Status" value="ONLINE" icon="●" />
        <StatDisplay label="Section" value={activeSection.toUpperCase()} />
      </div>

      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <RotatingName name="BHAVIK RAMINA" />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <RotatingHologram name="BHAVIK RAMINA" />
        </div>
      </div>

      <div className="relative z-10 pt-32 px-4 sm:px-8 pb-16">
        {activeSection === 'about' && (
          <HologramPanel title={portfolioData.about.title} delay={0.1}>
            <div className="space-y-4 text-foreground/90">
              {portfolioData.about.content.map((paragraph, i) => (
                <p key={i} className={i === 2 ? 'text-sm text-foreground/60 font-mono' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </HologramPanel>
        )}

        {activeSection === 'skills' && (
          <HologramPanel title={portfolioData.skills.title} delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-accent font-bold mb-6 flex items-center tracking-wide">
                  <span className="w-2 h-2 bg-accent mr-3 animate-pulse" /> TECHNICAL PROFICIENCY
                </h3>
                <div className="space-y-4">
                  {portfolioData.skills.technical.map((skill, i) => (
                    <SkillBar key={skill.name} label={skill.name} level={skill.level} delay={i} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-accent font-bold mb-6 flex items-center tracking-wide">
                  <span className="w-2 h-2 bg-accent mr-3 animate-pulse" /> SPECIALIZATIONS
                </h3>
                <div className="space-y-4">
                  {portfolioData.skills.specializations.map((skill, i) => (
                    <SkillBar key={skill.name} label={skill.name} level={skill.level} delay={i + 3} />
                  ))}
                </div>
              </div>
            </div>
          </HologramPanel>
        )}

        {activeSection === 'projects' && (
          <HologramPanel title="PROJECTS" delay={0.1}>
            <div className="space-y-6">
              {portfolioData.projects.map((project, i) => (
                <div key={i} className="border-l-4 border-accent/40 pl-4 hover:border-accent hover:pl-6 transition-all duration-300 group cursor-pointer">
                  <h3 className="text-accent font-bold group-hover:text-accent/80 transition-colors">{project.title}</h3>
                  <p className="text-foreground/70 text-sm mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          </HologramPanel>
        )}

        {activeSection === 'experience' && (
          <HologramPanel title="EXPERIENCE" delay={0.1}>
            <div className="space-y-6">
              {portfolioData.experience.map((exp, i) => (
                <div key={i} className="border-l-4 border-accent/40 pl-4 hover:border-accent hover:pl-6 transition-all duration-300 group cursor-pointer">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <h3 className="text-accent font-bold group-hover:text-accent/80 transition-colors">{exp.role}</h3>
                    <span className="text-muted-foreground text-sm font-mono">{exp.period}</span>
                  </div>
                  <p className="text-foreground/70 text-sm">{exp.company} - {exp.description}</p>
                </div>
              ))}
            </div>
          </HologramPanel>
        )}

        {activeSection === 'contact' && (
          <HologramPanel title="GET IN TOUCH" delay={0.1}>
            <div className="space-y-4">
              <div className="p-4 border border-accent/20 rounded hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group cursor-pointer">
                <p className="text-muted-foreground text-xs font-mono tracking-wider uppercase mb-1">EMAIL</p>
                <a href={`mailto:${portfolioData.contact.email}`} className="text-accent hover:text-accent/80 font-mono break-all group-hover:glow-border transition-all">
                  {portfolioData.contact.email}
                </a>
              </div>
              <div className="p-4 border border-accent/20 rounded hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group cursor-pointer">
                <p className="text-muted-foreground text-xs font-mono tracking-wider uppercase mb-1">LOCATION</p>
                <p className="text-foreground/90">{portfolioData.contact.location}</p>
              </div>
              <div className="p-4 border border-accent/20 rounded hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group cursor-pointer">
                <p className="text-muted-foreground text-xs font-mono tracking-wider uppercase mb-1">CONNECT</p>
                <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 font-mono group-hover:glow-border transition-all inline-flex items-center gap-2">
                  LinkedIn Profile <span className="text-accent/60">→</span>
                </a>
              </div>
            </div>
          </HologramPanel>
        )}
      </div>
    </div>
  );
}
