'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, ReactNode } from 'react'
import { Text } from './Text'

interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({
  content,
  children,
  position = 'top',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50 ${positionClasses[position]}
              pointer-events-none whitespace-nowrap
            `}
          >
            <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg">
              <Text size="xs" className="text-white">
                {content}
              </Text>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
