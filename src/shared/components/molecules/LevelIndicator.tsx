'use client'

import { Trophy } from 'lucide-react'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'

interface LevelIndicatorProps {
  level: number
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export function LevelIndicator({
  level,
  size = 'md',
  showIcon = true,
  className = '',
}: LevelIndicatorProps) {
  const iconSizes = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  }

  const badgeSizes = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && <Icon icon={Trophy} size={iconSizes[size]} color="#fbbf24" />}
      <Badge variant="warning" size={badgeSizes[size]}>
        Nível {level}
      </Badge>
    </div>
  )
}
