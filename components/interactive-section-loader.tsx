'use client';

import { useEffect, useState } from 'react';

interface InteractiveSectionLoaderProps {
  sectionName: string;
  delay?: number;
}

export default function InteractiveSectionLoader({ sectionName, delay = 0 }: InteractiveSectionLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500 + (delay * 1000));

    return () => clearTimeout(timer);
  }, [delay]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-4 bg-accent/20 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-accent/20 rounded w-1/2 animate-pulse" />
      </div>
    );
  }

  return null;
}
