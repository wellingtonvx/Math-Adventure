'use client'

import { Coins } from 'lucide-react'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'

interface CoinIndicatorProps {
  total: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CoinIndicator({
  total,
  size = 'md',
  className = '',
}: CoinIndicatorProps) {
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
      <Icon icon={Coins} size={iconSizes[size]} color="#fbbf24" />
      <Text size={textSizes[size]} weight="bold" color="primary">
        {total.toLocaleString('pt-BR')}
      </Text>
    </div>
  )
}
