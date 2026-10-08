'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import { Card } from '@/shared/components/atoms/Card'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { Button } from '@/shared/components/atoms/Button'
import { Icon } from '@/shared/components/atoms/Icon'

interface FeedbackModalProps {
  isOpen: boolean
  isCorrect: boolean
  correctAnswer: number
  selectedAnswer?: number
  xpEarned?: number
  onNext: () => void
}

export function FeedbackModal({
  isOpen,
  isCorrect,
  correctAnswer,
  selectedAnswer,
  xpEarned = 10,
  onNext,
}: FeedbackModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onNext}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full"
          >
            <Card
              padding="md"
              className={`text-center ${
                isCorrect
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border-4 border-green-300'
                  : 'bg-gradient-to-br from-red-50 to-red-100 border-4 border-red-300'
              }`}
            >
              <div className="space-y-4">
                {/* Ícone */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1,
                  }}
                  className="flex justify-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                    {isCorrect ? (
                      <Icon
                        icon={CheckCircle}
                        size="xl"
                        color="#22c55e"
                        className="w-full h-full"
                      />
                    ) : (
                      <Icon
                        icon={XCircle}
                        size="xl"
                        color="#ef4444"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Mensagem */}
                <div>
                  <Heading level={3} className="mb-2 text-xl sm:text-2xl">
                    {isCorrect ? 'Parabéns! 🎉' : 'Quase lá! 💪'}
                  </Heading>
                  <Text size="base" color="secondary" className="text-sm sm:text-base">
                    {isCorrect
                      ? 'Você acertou!'
                      : `A resposta correta é ${correctAnswer}`}
                  </Text>
                </div>

                {/* XP ganho */}
                {isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-purple-100 rounded-xl p-3"
                  >
                    <Text size="base" weight="bold" color="primary" className="text-base sm:text-lg">
                      +{xpEarned} XP
                    </Text>
                  </motion.div>
                )}

                {/* Explicação (se errou) */}
                {!isCorrect && selectedAnswer !== undefined && (
                  <div className="bg-white rounded-xl p-3">
                    <Text size="sm" color="secondary">
                      Você respondeu: {selectedAnswer}
                    </Text>
                    <Text size="sm" color="secondary">
                      Resposta correta: {correctAnswer}
                    </Text>
                  </div>
                )}

                {/* Botão */}
                <Button
                  variant={isCorrect ? 'success' : 'primary'}
                  size="md"
                  fullWidth
                  onClick={onNext}
                >
                  Continuar
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
