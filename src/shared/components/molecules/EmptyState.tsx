'use client'

import { motion } from 'framer-motion'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-12 px-4"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="text-7xl mb-6"
      >
        {icon}
      </motion.div>

      <Heading level={3} className="mb-2">
        {title}
      </Heading>

      <Text size="base" color="secondary" className="mb-6 max-w-md">
        {description}
      </Text>

      {actionLabel && onAction && (
        <Button variant="primary" size="lg" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}
