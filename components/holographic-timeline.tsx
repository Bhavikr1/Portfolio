'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
  title: string;
  company: string;
  period: string;
  points: string[];
  status?: 'current' | 'past';
}

interface HolographicTimelineProps {
  items: TimelineItem[];
}

export default function HolographicTimeline({ items }: HolographicTimelineProps) {
  return (
    <div className="relative">
      {/* Central vertical beam */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent to-transparent" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative pl-20"
          >
            {/* Pulsing node on timeline */}
            <motion.div
              animate={{
                scale: item.status === 'current' ? [1, 1.3, 1] : 1,
                opacity: item.status === 'current' ? [0.5, 1, 0.5] : 0.7,
              }}
              transition={{
                duration: 2,
                repeat: item.status === 'current' ? Infinity : 0,
                ease: 'easeInOut',
              }}
              className="absolute left-6 top-6 w-4 h-4 -translate-x-1/2"
            >
              <div className={`w-full h-full rounded-full ${
                item.status === 'current' ? 'bg-accent' : 'bg-accent/60'
              } shadow-lg shadow-accent/50`} />

              {/* Outer ring */}
              <div className={`absolute inset-0 rounded-full border-2 ${
                item.status === 'current' ? 'border-accent' : 'border-accent/40'
              } animate-ping`} style={{ animationDuration: '3s' }} />
            </motion.div>

            {/* Connecting line to card */}
            <div className="absolute left-8 top-6 w-12 h-0.5 bg-gradient-to-r from-accent/50 to-accent/20" />

            {/* Experience card with hologram effect */}
            <div className="group relative">
              {/* Holographic border glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

              {/* Main card */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-accent/10 via-background/80 to-accent/5 border border-accent/30 rounded-lg p-6 hover:border-accent/60 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-mono text-base font-bold text-accent mb-1">
                      {item.title}
                    </h3>
                    <p className="font-mono text-sm text-accent/70">{item.company}</p>
                  </div>

                  {/* Period badge */}
                  <div className="relative">
                    <div className="px-3 py-1 bg-accent/10 border border-accent/30 rounded font-mono text-xs text-accent">
                      {item.period}
                    </div>
                    {item.status === 'current' && (
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"
                      />
                    )}
                  </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-accent/30 via-accent/10 to-transparent mb-4" />

                {/* Achievement points */}
                <ul className="space-y-2">
                  {item.points.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + pointIndex * 0.1 }}
                      className="flex items-start space-x-2 group/item"
                    >
                      <span className="text-accent mt-1 text-xs">▹</span>
                      <span className="font-mono text-xs text-accent/80 leading-relaxed group-hover/item:text-accent transition-colors">
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Holographic corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Scan line effect on hover */}
                <motion.div
                  initial={{ y: '-100%' }}
                  animate={{ y: '200%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute left-8 -bottom-8 w-0.5 h-8 bg-gradient-to-b from-accent to-transparent" />
    </div>
  );
}
