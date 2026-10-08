'use client'

import { motion } from 'framer-motion'
import { Question } from '../../domain/types'
import { VisualElementGenerator } from '../../domain/services/VisualElementGenerator'
import { Text } from '@/shared/components/atoms/Text'

interface VisualSumProps {
  question: Question
  showResult?: boolean
}

export function VisualSum({ question, showResult = false }: VisualSumProps) {
  const element = question.visualElement || '🍎'

  const { group1, group2, total } = VisualElementGenerator.generateForAddition(
    element,
    question.operand1,
    question.operand2
  )

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Primeiro grupo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full sm:max-w-md px-4"
      >
        {group1.map((el, index) => (
          <motion.span
            key={`g1-${index}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl"
          >
            {el}
          </motion.span>
        ))}
      </motion.div>

      {/* Sinal de + */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500"
      >
        +
      </motion.div>

      {/* Segundo grupo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full sm:max-w-md px-4"
      >
        {group2.map((el, index) => (
          <motion.span
            key={`g2-${index}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl"
          >
            {el}
          </motion.span>
        ))}
      </motion.div>

      {/* Resultado visual (se showResult) */}
      {showResult && (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-500"
          >
            =
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full sm:max-w-md px-4"
          >
            {total.map((el, index) => (
              <motion.span
                key={`total-${index}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.7 + index * 0.05 }}
                className="text-3xl sm:text-4xl md:text-5xl"
              >
                {el}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
          >
            <Text size="xl" weight="bold" color="primary" align="center">
              {question.operand1} + {question.operand2} = {question.correctAnswer}
            </Text>
          </motion.div>
        </>
      )}
    </div>
  )
}
