'use client';

interface RotatingNameProps {
  name: string;
}

export default function RotatingName({ name }: RotatingNameProps) {
  const letters = name.split('');

  return (
    <svg className="absolute w-96 h-96 pointer-events-none" viewBox="0 0 400 400">
      <defs>
        <path id="circlePath" d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
        <style>{`
          @keyframes rotate-text {
            from { startOffset: 0%; }
            to { startOffset: 100%; }
          }
          .rotating-text {
            animation: rotate-text 15s linear infinite;
            font-family: monospace;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 8px;
            fill: #00ffff;
            filter: drop-shadow(0 0 5px #00ffff);
          }
        `}</style>
      </defs>
      
      <text className="rotating-text">
        <textPath href="#circlePath" startOffset="0%">
          ● {name.toUpperCase()} ● AI ENGINEER ● GENERATIVE AI ●
        </textPath>
      </text>
    </svg>
  );
}
