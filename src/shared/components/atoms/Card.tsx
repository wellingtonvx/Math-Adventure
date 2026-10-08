'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  interactive?: boolean
}

export function Card({
  children,
  className = '',
  padding = 'md',
  onClick,
  interactive = false,
}: CardProps) {
  const baseStyles = 'bg-white rounded-2xl shadow-md'

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:shadow-lg transition-shadow'
    : ''

  const Component = interactive ? motion.div : 'div'

  const motionProps = interactive
    ? {
        whileTap: { scale: 0.98 },
        whileHover: { scale: 1.02 },
        transition: { duration: 0.2 },
      }
    : {}

  return (
    <Component
      className={`${baseStyles} ${paddingStyles[padding]} ${interactiveStyles} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  )
}
