'use client'

import { motion } from 'framer-motion'
import { Achievement } from '@/domains/progress/domain/types/achievements'
import { Text } from '../atoms/Text'
import { tokens } from '@/shared/design-system/tokens'

interface AchievementCardProps {
  achievement: Achievement
  onClick?: () => void
}

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
  const isUnlocked = !!achievement.unlockedAt
  const progressPercentage = Math.round(
    (achievement.progress / achievement.requirement) * 100
  )

  const getTierColor = () => {
    switch (achievement.tier) {
      case 'bronze':
        return 'border-yellow-700 bg-yellow-50'
      case 'silver':
        return 'border-gray-400 bg-gray-50'
      case 'gold':
        return 'border-yellow-500 bg-yellow-100'
      case 'platinum':
        return 'border-purple-500 bg-purple-100'
    }
  }

  const getTierBadge = () => {
    switch (achievement.tier) {
      case 'bronze':
        return '🥉'
      case 'silver':
        return '🥈'
      case 'gold':
        return '🥇'
      case 'platinum':
        return '💎'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
      whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border-2 cursor-pointer transition-all
        ${getTierColor()}
        ${isUnlocked ? 'opacity-100' : 'opacity-50 grayscale'}
      `}
    >
      {/* Badge do tier */}
      <div className="absolute top-2 right-2 text-lg">{getTierBadge()}</div>

      {/* Ícone e status */}
      <div className="flex items-start gap-3 mb-3">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <Text size="base" weight="bold" className="mb-1">
            {achievement.title}
          </Text>
          <Text size="xs" color="secondary">
            {achievement.description}
          </Text>
        </div>
      </div>

      {/* Barra de progresso */}
      {!isUnlocked && (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <Text size="xs" color="secondary">
              Progresso
            </Text>
            <Text size="xs" weight="semibold">
              {achievement.progress}/{achievement.requirement}
            </Text>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
      )}

      {/* Recompensas */}
      <div className="mt-3 flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1">
          <span>⭐</span>
          <Text size="xs" weight="semibold">
            +{achievement.reward.xp} XP
          </Text>
        </div>
        <div className="flex items-center gap-1">
          <span>🪙</span>
          <Text size="xs" weight="semibold">
            +{achievement.reward.coins}
          </Text>
        </div>
      </div>

      {/* Badge de desbloqueado */}
      {isUnlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold"
        >
          ✓ Desbloqueado
        </motion.div>
      )}
    </motion.div>
  )
}
