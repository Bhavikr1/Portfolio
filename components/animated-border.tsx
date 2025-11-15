'use client';

interface AnimatedBorderProps {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedBorder({ children, delay = 0 }: AnimatedBorderProps) {
  return (
    <div
      className="relative group"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-500" />

      {/* Content */}
      <div className="relative bg-background rounded-lg p-4 border border-accent/30 group-hover:border-accent/60 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
}
