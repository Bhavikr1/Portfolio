'use client';

interface StatDisplayProps {
  label: string;
  value: string | number;
  icon?: string;
}

export default function StatDisplay({ label, value, icon }: StatDisplayProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors">
      {icon && <span className="text-accent text-lg">{icon}</span>}
      <div className="flex-1 min-w-0">
        <p className="text-muted-foreground text-xs font-mono tracking-wider uppercase">{label}</p>
        <p className="text-accent font-mono font-bold truncate">{value}</p>
      </div>
    </div>
  );
}
