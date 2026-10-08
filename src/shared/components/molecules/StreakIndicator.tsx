'use client'

import { Flame } from 'lucide-react'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'

interface StreakIndicatorProps {
  days: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StreakIndicator({
  days,
  size = 'md',
  className = '',
}: StreakIndicatorProps) {
  const iconSizes = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  }

  const textSizes = {
    sm: 'sm' as const,
    md: 'lg' as const,
    lg: 'xl' as const,
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon icon={Flame} size={iconSizes[size]} color="#f97316" />
      <Text size={textSizes[size]} weight="bold" color="primary">
        {days} {days === 1 ? 'dia' : 'dias'}
      </Text>
    </div>
  )
}
