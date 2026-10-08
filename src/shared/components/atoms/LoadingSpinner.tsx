'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

const sizeMap = {
  sm: 20,
  md: 40,
  lg: 60,
}

export function LoadingSpinner({
  size = 'md',
  color = '#3b82f6',
}: LoadingSpinnerProps) {
  const spinnerSize = sizeMap[size]

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `${spinnerSize / 10}px solid rgba(59, 130, 246, 0.1)`,
          borderTopColor: color,
          borderRadius: '50%',
        }}
      />
    </div>
  )
}
