'use client'

import { Phase } from '../../domain/types'
import { Card } from '@/shared/components/atoms/Card'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { Badge } from '@/shared/components/atoms/Badge'
import { Button } from '@/shared/components/atoms/Button'
import { Lock, Star, Trophy } from 'lucide-react'
import { Icon } from '@/shared/components/atoms/Icon'

interface PhaseSelectorProps {
  phases: Phase[]
  onSelectPhase: (phaseId: string) => void
}

export function PhaseSelector({ phases, onSelectPhase }: PhaseSelectorProps) {
  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      easy: 'Fácil',
      medium: 'Médio',
      hard: 'Difícil',
    }
    return labels[difficulty as keyof typeof labels] || difficulty
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'success' as const,
      medium: 'warning' as const,
      hard: 'error' as const,
    }
    return colors[difficulty as keyof typeof colors] || ('neutral' as const)
  }

  return (
    <div className="space-y-4">
      {phases.map((phase) => (
        <Card
          key={phase.id}
          padding="lg"
          className={`${
            phase.isLocked
              ? 'opacity-50 bg-gray-100'
              : phase.isCompleted
                ? 'border-2 border-green-300 bg-green-50'
                : 'border-2 border-blue-300'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            {/* Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                {phase.isLocked && <Icon icon={Lock} size="sm" color="#9ca3af" />}
                {phase.isCompleted && (
                  <Icon icon={Trophy} size="sm" color="#22c55e" />
                )}
                <Heading level={4}>{phase.name}</Heading>
              </div>

              <Text size="sm" color="secondary">
                {phase.description}
              </Text>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant={getDifficultyColor(phase.difficulty)}
                  size="sm"
                >
                  {getDifficultyLabel(phase.difficulty)}
                </Badge>
                <Badge variant="neutral" size="sm">
                  {phase.questionsCount} questões
                </Badge>
                <Badge variant="primary" size="sm">
                  {phase.xpReward} XP
                </Badge>
              </div>

              {/* Estrelas (se completado) */}
              {phase.isCompleted && phase.stars > 0 && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < phase.stars ? '#fbbf24' : 'none'}
                      color={i < phase.stars ? '#fbbf24' : '#d1d5db'}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Botão */}
            <Button
              variant={phase.isCompleted ? 'success' : 'primary'}
              size="md"
              onClick={() => onSelectPhase(phase.id)}
              disabled={phase.isLocked}
            >
              {phase.isCompleted ? 'Repetir' : 'Jogar'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
