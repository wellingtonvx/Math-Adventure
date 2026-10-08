'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Question } from '../../domain/types'
import { QuestionEntity } from '../../domain/entities/Question'
import { Button } from '@/shared/components/atoms/Button'

interface AnswerOptionsProps {
  question: Question
  onAnswer: (answer: number) => void
  disabled?: boolean
}

export function AnswerOptions({
  question,
  onAnswer,
  disabled = false,
}: AnswerOptionsProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const options = QuestionEntity.generateOptions(question, 4)

  // Reseta a seleção quando a questão muda
  useEffect(() => {
    setSelectedAnswer(null)
  }, [question.id])

  const handleSelect = (answer: number) => {
    if (disabled || selectedAnswer !== null) return

    setSelectedAnswer(answer)
    setTimeout(() => {
      onAnswer(answer)
    }, 300)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => handleSelect(option)}
            disabled={disabled || selectedAnswer !== null}
            className={`text-3xl h-24 ${
              selectedAnswer === option
                ? 'ring-4 ring-blue-400 scale-95'
                : ''
            }`}
          >
            {option}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
