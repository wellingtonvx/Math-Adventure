'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Achievement } from '@/domains/progress/domain/types/achievements'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Confetti } from '../molecules/Confetti'

interface AchievementUnlockedModalProps {
  achievement: Achievement | null
  onClose: () => void
}

const getTierEmoji = (tier: string) => {
  switch (tier) {
    case 'bronze':
      return '🥉'
    case 'silver':
      return '🥈'
    case 'gold':
      return '🥇'
    case 'platinum':
      return '💎'
    default:
      return '🏆'
  }
}

export function AchievementUnlockedModal({
  achievement,
  onClose,
}: AchievementUnlockedModalProps) {
  if (!achievement) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Confetti */}
        <Confetti duration={4000} particleCount={60} />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4"
        >
          {/* Badge do tier */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 text-4xl sm:text-6xl"
          >
            {getTierEmoji(achievement.tier)}
          </motion.div>

          {/* Conteúdo */}
          <div className="text-center space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Text size="xs" color="secondary" className="uppercase tracking-wide text-[10px] sm:text-xs">
                Conquista Desbloqueada
              </Text>
              <Heading level={3} className="mt-2 text-lg sm:text-2xl">
                {achievement.icon} {achievement.title}
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Text size="sm" color="secondary" className="text-sm">
                {achievement.description}
              </Text>
            </motion.div>

            {/* Recompensas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 sm:gap-6 py-3 sm:py-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1">⭐</div>
                <Text size="md" weight="bold" className="text-base sm:text-lg">
                  +{achievement.reward.xp}
                </Text>
                <Text size="xs" color="secondary" className="text-[10px] sm:text-xs">
                  XP
                </Text>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1">🪙</div>
                <Text size="md" weight="bold" className="text-base sm:text-lg">
                  +{achievement.reward.coins}
                </Text>
                <Text size="xs" color="secondary" className="text-[10px] sm:text-xs">
                  Moedas
                </Text>
              </div>
            </motion.div>

            {/* Botão */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button variant="primary" size="md" fullWidth onClick={onClose}>
                Continuar
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
