'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  max: number
  color?: 'primary' | 'secondary' | 'success' | 'warning'
  showLabel?: boolean
  height?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ProgressBar({
  current,
  max,
  color = 'primary',
  showLabel = false,
  height = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100)

  const colorStyles = {
    primary: 'bg-blue-500',
    secondary: 'bg-purple-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
  }

  const heightStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  }

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
          <span>{current}</span>
          <span>{max}</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightStyles[height]}`}>
        <motion.div
          className={`${heightStyles[height]} ${colorStyles[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
