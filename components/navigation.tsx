'use client';

import { useState, useEffect } from 'react';

interface NavigationProps {
  sections: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ sections, activeSection, onSectionChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-lg border-b border-accent/20' : 'bg-background/50 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
          <div className="w-8 h-8 border-2 border-accent rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/30 transition-all">
            <div className="w-4 h-4 bg-accent rounded-full animate-pulse" />
          </div>
          <span className="font-mono font-bold text-accent tracking-wider text-lg">BR</span>
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`text-sm font-mono tracking-widest transition-all duration-300 uppercase relative ${
                activeSection === section
                  ? 'text-accent'
                  : 'text-foreground/50 hover:text-foreground/80'
              }`}
            >
              {section}
              {activeSection === section && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent to-accent/60" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
