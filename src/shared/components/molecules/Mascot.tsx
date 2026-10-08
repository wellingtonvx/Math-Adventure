'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Text } from '../atoms/Text'
import { useState } from 'react'

type MascotMood = 'happy' | 'excited' | 'thinking' | 'celebration' | 'encouraging'

interface MascotProps {
  message?: string
  mood?: MascotMood
  onClose?: () => void
  position?: 'bottom-right' | 'bottom-left' | 'center'
  autoHide?: number // ms para fechar automaticamente
}

const mascotEmojis: Record<MascotMood, string> = {
  happy: '😊',
  excited: '🤩',
  thinking: '🤔',
  celebration: '🎉',
  encouraging: '💪',
}

const mascotMessages: Record<MascotMood, string[]> = {
  happy: [
    'Você está indo muito bem!',
    'Continue assim!',
    'Ótimo trabalho!',
  ],
  excited: [
    'Incrível! Você é demais!',
    'Uau! Que desempenho!',
    'Você está arrasando!',
  ],
  thinking: [
    'Hmm... pense com calma!',
    'Você consegue!',
    'Não tenha pressa!',
  ],
  celebration: [
    '🎊 Parabéns! 🎊',
    'Você conquistou!',
    'Isso é digno de festa!',
  ],
  encouraging: [
    'Não desista!',
    'Você está quase lá!',
    'Força! Você consegue!',
  ],
}

const positionClasses = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

export function Mascot({
  message,
  mood = 'happy',
  onClose,
  position = 'bottom-right',
  autoHide,
}: MascotProps) {
  const [isVisible, setIsVisible] = useState(true)

  const defaultMessage =
    mascotMessages[mood][Math.floor(Math.random() * mascotMessages[mood].length)]
  const displayMessage = message || defaultMessage

  // Auto-hide
  if (autoHide && isVisible) {
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, autoHide)
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className={`fixed ${positionClasses[position]} z-50 ${
            position === 'center' ? 'w-80' : 'max-w-xs'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200 p-4 relative">
            {/* Botão de fechar */}
            {onClose && (
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}

            {/* Mascote */}
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="text-5xl flex-shrink-0"
              >
                {mascotEmojis[mood]}
              </motion.div>

              {/* Mensagem */}
              <div className="flex-1 pt-2">
                <div className="bg-purple-50 rounded-xl p-3 relative">
                  {/* Balão de fala */}
                  <div className="absolute -left-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-purple-50 border-b-[8px] border-b-transparent" />

                  <Text size="sm" weight="medium">
                    {displayMessage}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
