'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface HolographicPanelProps {
  title: string;
  children: ReactNode;
  icon?: string;
  delay?: number;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function HolographicPanel({
  title,
  children,
  icon = '▸',
  delay = 0,
  isOpen = false,
  onToggle,
}: HolographicPanelProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glass morphism panel */}
      <div className="relative overflow-hidden">
        {/* Animated border glow */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
          animate={{
            backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Main panel */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-accent/5 via-background/90 to-accent/5 border border-accent/30 rounded-lg overflow-hidden">
          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
            }}
            animate={{
              y: isOpen ? [0, 100] : 0,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent/50" />

          {/* Title bar */}
          <button
            onClick={onToggle}
            className="w-full p-5 relative z-10 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-accent text-xl font-mono"
                >
                  {icon}
                </motion.span>
                <h3 className="font-mono text-sm font-bold text-accent tracking-wider uppercase">
                  {title}
                </h3>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-2 h-2 rounded-full bg-accent"
                />
                <span className="font-mono text-xs text-accent/60">
                  {isOpen ? '[ACTIVE]' : '[STANDBY]'}
                </span>
              </div>
            </div>

            {/* Holographic light beam */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ width: '0%' }}
              animate={{ width: isHovered ? '100%' : '0%' }}
              transition={{ duration: 0.5 }}
            />
          </button>

          {/* Content area with expansion animation */}
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{
              height: { duration: 0.5, ease: 'easeInOut' },
              opacity: { duration: 0.3, delay: isOpen ? 0.2 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 relative">
              {/* Holographic separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-4" />

              {/* Content with holographic overlay */}
              <div className="relative">
                {children}

                {/* Light flare effect when open */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1, 1.5] }}
                    transition={{ duration: 1 }}
                    className="absolute -top-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Hexagonal pattern overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Floating particles around panel when hovered */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
