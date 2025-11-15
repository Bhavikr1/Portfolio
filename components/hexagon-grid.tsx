'use client';

export default function HexagonGrid() {
  return (
    <svg className="fixed inset-0 w-full h-full opacity-3 pointer-events-none" viewBox="0 0 1200 800">
      <defs>
        <pattern id="hexagons-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M50,5 L93,29 L93,77 L50,101 L7,77 L7,29 Z"
            fill="none"
            stroke="#00ffff"
            strokeWidth="1"
            opacity="0.1"
          />
        </pattern>
      </defs>
      <rect width="1200" height="800" fill="url(#hexagons-bg)" />
    </svg>
  );
}
