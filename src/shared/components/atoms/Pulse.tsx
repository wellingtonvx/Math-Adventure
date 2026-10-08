'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PulseProps {
  children: ReactNode
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Pulse({ children, color = '#8b5cf6', size = 'md' }: PulseProps) {
  const sizeMap = {
    sm: 6,
    md: 8,
    lg: 12,
  }

  const pulseSize = sizeMap[size]

  return (
    <div className="relative inline-flex">
      {children}

      {/* Pulso animado */}
      <motion.span
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 right-0 flex h-3 w-3"
        style={{
          width: pulseSize,
          height: pulseSize,
        }}
      >
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: color }}
        />
      </motion.span>
    </div>
  )
}
