'use client'

import { motion } from 'framer-motion'
import { DailyMission } from '@/domains/progress/domain/types/missions'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'

interface MissionCardProps {
  mission: DailyMission
  onClaim?: (missionId: string) => void
}

export function MissionCard({ mission, onClaim }: MissionCardProps) {
  const progressPercentage = Math.round((mission.progress / mission.target) * 100)
  const canClaim = mission.completed && !mission.claimedAt

  const getDifficultyColor = () => {
    switch (mission.difficulty) {
      case 'easy':
        return 'border-green-300 bg-green-50'
      case 'medium':
        return 'border-yellow-300 bg-yellow-50'
      case 'hard':
        return 'border-red-300 bg-red-50'
    }
  }

  const getDifficultyLabel = () => {
    switch (mission.difficulty) {
      case 'easy':
        return '⭐ Fácil'
      case 'medium':
        return '⭐⭐ Médio'
      case 'hard':
        return '⭐⭐⭐ Difícil'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative p-4 rounded-xl border-2 transition-all
        ${getDifficultyColor()}
        ${mission.claimedAt ? 'opacity-60' : 'opacity-100'}
      `}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl">{mission.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Text size="base" weight="bold">
              {mission.title}
            </Text>
            <span className="text-xs">{getDifficultyLabel()}</span>
          </div>
          <Text size="xs" color="secondary">
            {mission.description}
          </Text>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="space-y-1 mb-3">
        <div className="flex justify-between items-center">
          <Text size="xs" color="secondary">
            Progresso
          </Text>
          <Text size="xs" weight="semibold">
            {mission.progress}/{mission.target}
          </Text>
        </div>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-gray-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${
              mission.completed
                ? 'bg-gradient-to-r from-green-400 to-green-600'
                : 'bg-gradient-to-r from-blue-400 to-purple-500'
            }`}
          />
        </div>
      </div>

      {/* Recompensas */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <Text size="xs" weight="semibold">
              +{mission.reward.xp} XP
            </Text>
          </div>
          <div className="flex items-center gap-1">
            <span>🪙</span>
            <Text size="xs" weight="semibold">
              +{mission.reward.coins}
            </Text>
          </div>
        </div>

        {/* Botão de reivindicar */}
        {canClaim && onClaim && (
          <Button
            variant="success"
            size="sm"
            onClick={() => onClaim(mission.id)}
          >
            Resgatar
          </Button>
        )}

        {mission.claimedAt && (
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            ✓ Resgatado
          </div>
        )}
      </div>

      {/* Badge de completo */}
      {mission.completed && !mission.claimedAt && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-lg"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  )
}
