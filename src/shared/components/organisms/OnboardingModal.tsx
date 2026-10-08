'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface OnboardingStep {
  icon: string
  title: string
  description: string
}

const steps: OnboardingStep[] = [
  {
    icon: '🎮',
    title: 'Bem-vindo ao Math Adventure!',
    description:
      'Aprenda matemática de forma divertida e gamificada. Aqui você vai resolver questões, ganhar XP, moedas e desbloquear conquistas!',
  },
  {
    icon: '🗺️',
    title: 'Explore os Mundos',
    description:
      'Viaje pelo Reino das Somas, Floresta das Subtrações, Ilha da Multiplicação e Planeta da Divisão. Cada mundo tem fases progressivas!',
  },
  {
    icon: '🏆',
    title: 'Conquistas e Missões',
    description:
      'Desbloqueie 23 conquistas e complete missões diárias para ganhar recompensas extras. Continue jogando todos os dias para manter seu streak!',
  },
  {
    icon: '⭐',
    title: 'Ganhe XP e Suba de Nível',
    description:
      'A cada questão correta você ganha XP. Acumule XP para subir de nível e mostre suas habilidades matemáticas!',
  },
  {
    icon: '🚀',
    title: 'Pronto para Começar?',
    description:
      'Agora é com você! Escolha um mundo e comece sua aventura matemática. Divirta-se aprendendo!',
  },
]

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full"
          >
            {/* Indicadores de progresso */}
            <div className="flex gap-2 mb-8 justify-center">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-purple-500'
                      : index < currentStep
                        ? 'w-2 bg-purple-300'
                        : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Conteúdo do step */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                {/* Ícone */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl"
                >
                  {steps[currentStep].icon}
                </motion.div>

                {/* Título */}
                <Heading level={2}>{steps[currentStep].title}</Heading>

                {/* Descrição */}
                <Text size="base" color="secondary">
                  {steps[currentStep].description}
                </Text>
              </motion.div>
            </AnimatePresence>

            {/* Botões */}
            <div className="mt-8 flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handlePrevious}
                  className="flex-shrink-0"
                >
                  <ChevronLeft size={20} />
                </Button>
              )}

              {currentStep < steps.length - 1 && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleSkip}
                  className="flex-1"
                >
                  Pular
                </Button>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                className="flex-1"
              >
                {currentStep === steps.length - 1 ? (
                  'Começar!'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Próximo
                    <ChevronRight size={20} />
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
