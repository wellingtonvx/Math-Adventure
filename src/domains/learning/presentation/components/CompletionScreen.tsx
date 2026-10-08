'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Coins, Sparkles } from 'lucide-react'
import { Card } from '@/shared/components/atoms/Card'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { Button } from '@/shared/components/atoms/Button'
import { Icon } from '@/shared/components/atoms/Icon'
import { Confetti } from '@/shared/components/molecules/Confetti'

interface CompletionScreenProps {
  totalQuestions: number
  correctAnswers: number
  stars: number
  xpEarned: number
  coinsEarned: number
  passed: boolean
  onContinue: () => void
  onRetry: () => void
  currentPhaseName?: string
  nextPhaseName?: string
  onNextPhase?: () => void
}

export function CompletionScreen({
  totalQuestions,
  correctAnswers,
  stars,
  xpEarned,
  coinsEarned,
  passed,
  onContinue,
  onRetry,
  currentPhaseName,
  nextPhaseName,
  onNextPhase,
}: CompletionScreenProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)

  // Verifica se é tabuada (multiplicação ou divisão)
  const isTabuada = currentPhaseName?.includes('Tabuada') || currentPhaseName?.includes('Dividindo')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-3">
      {/* Confetti se passou */}
      {passed && <Confetti duration={5000} particleCount={80} />}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl w-full"
      >
        <Card
          padding="md"
          className={`text-center ${
            passed
              ? 'bg-gradient-to-br from-green-50 to-yellow-50 border-4 border-green-300'
              : 'bg-gradient-to-br from-orange-50 to-red-50 border-4 border-orange-300'
          }`}
        >
          <div className="space-y-6">
            {/* Ícone principal */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: passed ? 360 : 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="flex justify-center"
            >
              <div className="w-20 h-20 md:w-32 md:h-32">
                <Icon
                  icon={Trophy}
                  size="xl"
                  color={passed ? '#22c55e' : '#f97316'}
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            {/* Título */}
            <div>
              <Heading level={2} className="mb-2 text-xl md:text-3xl">
                {passed ? 'Parabéns! 🎉' : 'Continue tentando! 💪'}
              </Heading>
              <Text size="lg" color="secondary" className="text-sm md:text-lg">
                {passed
                  ? 'Você completou a fase!'
                  : 'Você pode tentar novamente'}
              </Text>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card padding="sm" className="bg-white">
                <div className="flex flex-col items-center gap-1">
                  <Text size="xs" color="secondary" className="text-[10px] md:text-xs">
                    Acertos
                  </Text>
                  <Heading level={4} className="text-green-600 text-lg md:text-2xl">
                    {correctAnswers}/{totalQuestions}
                  </Heading>
                </div>
              </Card>

              <Card padding="sm" className="bg-white">
                <div className="flex flex-col items-center gap-1">
                  <Text size="xs" color="secondary" className="text-[10px] md:text-xs">
                    Performance
                  </Text>
                  <Heading level={4} className="text-blue-600 text-lg md:text-2xl">
                    {percentage}%
                  </Heading>
                </div>
              </Card>

              {passed && (
                <>
                  <Card padding="sm" className="bg-white">
                    <div className="flex flex-col items-center gap-1">
                      <Icon icon={Sparkles} size="sm" color="#8b5cf6" />
                      <Heading level={4} className="text-purple-600 text-lg md:text-2xl">
                        +{xpEarned}
                      </Heading>
                      <Text size="xs" color="secondary" className="text-[10px] md:text-xs">
                        XP
                      </Text>
                    </div>
                  </Card>

                  <Card padding="sm" className="bg-white">
                    <div className="flex flex-col items-center gap-1">
                      <Icon icon={Coins} size="sm" color="#fbbf24" />
                      <Heading level={4} className="text-yellow-600 text-lg md:text-2xl">
                        +{coinsEarned}
                      </Heading>
                      <Text size="xs" color="secondary" className="text-[10px] md:text-xs">
                        Moedas
                      </Text>
                    </div>
                  </Card>
                </>
              )}
            </div>

            {/* Estrelas */}
            {passed && stars > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-2 md:gap-3"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.7 + i * 0.2,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    className="w-8 h-8 md:w-12 md:h-12"
                  >
                    <Star
                      className="w-full h-full"
                      fill={i < stars ? '#fbbf24' : 'none'}
                      color={i < stars ? '#fbbf24' : '#d1d5db'}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Mensagem especial para tabuadas */}
            {isTabuada && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`border-2 rounded-xl p-3 text-center ${
                  passed
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-orange-50 border-orange-200'
                }`}
              >
                <Text size="sm" weight="semibold" className={passed ? 'text-blue-700' : 'text-orange-700'}>
                  {passed
                    ? `🎯 Completou todos os ${totalQuestions} exercícios!`
                    : `Você fez ${totalQuestions} exercícios. Continue praticando!`
                  }
                </Text>
                {passed && nextPhaseName && (
                  <Text size="xs" color="secondary" className="mt-1">
                    Próxima: {nextPhaseName}
                  </Text>
                )}
              </motion.div>
            )}

            {/* Botões */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={onRetry}
                >
                  {isTabuada ? 'Repetir Tabuada' : 'Tentar Novamente'}
                </Button>
                {isTabuada && passed && nextPhaseName && onNextPhase ? (
                  <Button
                    variant="success"
                    size="md"
                    fullWidth
                    onClick={onNextPhase}
                  >
                    Próxima Tabuada →
                  </Button>
                ) : (
                  <Button
                    variant={passed ? 'success' : 'primary'}
                    size="md"
                    fullWidth
                    onClick={onContinue}
                  >
                    {passed ? 'Continuar' : 'Voltar'}
                  </Button>
                )}
              </div>
              {isTabuada && passed && nextPhaseName && (
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={onContinue}
                >
                  Voltar ao Menu
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
