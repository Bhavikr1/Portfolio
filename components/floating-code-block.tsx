'use client';

interface FloatingCodeBlockProps {
  code: string;
  language?: string;
  position: { top: string; right: string } | { bottom: string; left: string };
}

export default function FloatingCodeBlock({
  code,
  language = 'python',
  position,
}: FloatingCodeBlockProps) {
  return (
    <div
      className="fixed hidden lg:block z-20 max-w-sm p-4 border border-accent/20 rounded-lg bg-background/40 backdrop-blur-sm hover:border-accent/60 transition-all duration-300"
      style={position}
    >
      <div className="text-xs font-mono text-accent/60 mb-2">{language}</div>
      <pre className="text-xs font-mono text-accent/70 overflow-auto max-h-32 whitespace-pre-wrap break-words">
        {code}
      </pre>
    </div>
  );
}
