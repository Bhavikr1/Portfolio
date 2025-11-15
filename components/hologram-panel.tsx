'use client';

import ScrollReveal from './scroll-reveal';

interface HologramPanelProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export default function HologramPanel({ title, children, delay = 0 }: HologramPanelProps) {
  return (
    <ScrollReveal delay={delay}>
      <div className="max-w-4xl mx-auto mb-16">
        {/* Panel header with glowing line */}
        <div className="mb-6 flex items-center gap-4 group">
          <div className="h-px flex-1 bg-gradient-to-r from-accent to-transparent group-hover:from-accent/60 transition-all" />
          <h2 className="text-lg font-mono font-bold text-accent tracking-widest whitespace-nowrap group-hover:text-accent/80 transition-colors">
            {title}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-accent to-transparent group-hover:from-accent/60 transition-all" />
        </div>

        {/* Content panel */}
        <div className="hologram-panel p-8 rounded-lg glow-border hover:shadow-lg hover:shadow-accent/10 transition-all duration-300">
          {children}
        </div>

        {/* Bottom accent line */}
        <div className="mt-4 h-px bg-gradient-to-r from-accent/40 via-accent/60 to-accent/40" />
      </div>
    </ScrollReveal>
  );
}
