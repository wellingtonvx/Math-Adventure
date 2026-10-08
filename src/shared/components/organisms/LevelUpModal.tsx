'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Confetti } from '../molecules/Confetti'

interface LevelUpModalProps {
  newLevel: number | null
  onClose: () => void
}

export function LevelUpModal({ newLevel, onClose }: LevelUpModalProps) {
  if (!newLevel) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Confetti */}
        <Confetti duration={3000} particleCount={40} />

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
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4"
        >
          {/* Estrelas animadas */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity },
            }}
            className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 text-4xl sm:text-6xl"
          >
            ⭐
          </motion.div>
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2.5, repeat: Infinity },
            }}
            className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 text-3xl sm:text-5xl"
          >
            ✨
          </motion.div>

          {/* Conteúdo */}
          <div className="text-center space-y-4 sm:space-y-6 text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Text
                size="sm"
                className="uppercase tracking-wider text-white opacity-90 text-xs sm:text-sm"
              >
                Parabéns!
              </Text>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="text-6xl sm:text-8xl font-bold"
            >
              🎉
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Heading level={1} className="text-white text-3xl sm:text-5xl">
                Nível {newLevel}
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Text size="md" className="text-white text-base sm:text-lg">
                Você subiu de nível!
              </Text>
              <Text size="sm" className="text-white opacity-90 mt-2 text-sm">
                Continue assim e você chegará longe! 🚀
              </Text>
            </motion.div>

            {/* Botão */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-2 sm:pt-4"
            >
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={onClose}
                className="!bg-white !text-orange-600 hover:!bg-gray-100 font-semibold"
              >
                Continuar
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
