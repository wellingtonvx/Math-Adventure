'use client'

import { motion } from 'framer-motion'
import { Question } from '../../domain/types'
import { VisualElementGenerator } from '../../domain/services/VisualElementGenerator'
import { Text } from '@/shared/components/atoms/Text'

interface VisualSubtractionProps {
  question: Question
  showResult?: boolean
}

export function VisualSubtraction({
  question,
  showResult = false,
}: VisualSubtractionProps) {
  const element = question.visualElement || '🍎'

  const { initial, removed, remaining } =
    VisualElementGenerator.generateForSubtraction(
      element,
      question.operand1,
      question.operand2
    )

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Elementos iniciais */}
      <div>
        <Text size="lg" color="secondary" align="center" className="mb-4">
          Temos {question.operand1} {element}
        </Text>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full sm:max-w-md px-4"
        >
          {initial.map((el, index) => (
            <motion.span
              key={`initial-${index}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl"
            >
              {el}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Sinal de - e texto de remoção */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-500 mb-2">−</div>
        <Text size="lg" color="secondary">
          Vamos remover {removed}
        </Text>
      </motion.div>

      {/* Elementos sendo removidos (animação de saída) */}
      {showResult && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full sm:max-w-md px-4"
          >
            {initial.map((el, index) => {
              const shouldRemove = index >= remaining.length
              return (
                <motion.span
                  key={`removing-${index}`}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{
                    scale: shouldRemove ? 0 : 1,
                    opacity: shouldRemove ? 0 : 1,
                  }}
                  transition={{
                    delay: 1.5 + index * 0.1,
                    duration: 0.3,
                  }}
                  className={`text-3xl sm:text-4xl md:text-5xl ${shouldRemove ? 'text-gray-300' : ''}`}
                >
                  {el}
                </motion.span>
              )
            })}
          </motion.div>

          {/* Sinal de = */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-500"
          >
            =
          </motion.div>

          {/* Resultado */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2.7 }}
              className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full sm:max-w-md px-4"
            >
              {remaining.map((el, index) => (
                <motion.span
                  key={`result-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.7 + index * 0.05 }}
                  className="text-3xl sm:text-4xl md:text-5xl"
                >
                  {el}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0 }}
              className="mt-4"
            >
              <Text size="xl" weight="bold" color="primary" align="center">
                {question.operand1} − {question.operand2} ={' '}
                {question.correctAnswer}
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
            >
              <Text size="lg" color="secondary" align="center" className="mt-2">
                Sobraram {question.correctAnswer} {element}
              </Text>
            </motion.div>
          </div>
        </>
      )}
    </div>
  )
}
