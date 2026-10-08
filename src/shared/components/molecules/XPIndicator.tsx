'use client'

import { Sparkles } from 'lucide-react'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'
import { ProgressBar } from '../atoms/ProgressBar'

interface XPIndicatorProps {
  current: number
  max: number
  showProgress?: boolean
  className?: string
}

export function XPIndicator({
  current,
  max,
  showProgress = true,
  className = '',
}: XPIndicatorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Icon icon={Sparkles} size="sm" color="#8b5cf6" />
        <Text size="sm" weight="semibold" color="primary">
          {current} / {max} XP
        </Text>
      </div>
      {showProgress && (
        <ProgressBar current={current} max={max} color="secondary" height="sm" />
      )}
    </div>
  )
}
