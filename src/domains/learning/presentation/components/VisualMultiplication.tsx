'use client'

import { motion } from 'framer-motion'
import { Question } from '../../domain/types'
import { VisualElementGenerator } from '../../domain/services/VisualElementGenerator'
import { Text } from '@/shared/components/atoms/Text'

interface VisualMultiplicationProps {
  question: Question
  showResult?: boolean
}

export function VisualMultiplication({
  question,
  showResult = false,
}: VisualMultiplicationProps) {
  const element = question.visualElement || '🍎'

  // Gera grupos (ex: 3 grupos de 4 elementos)
  const groups = VisualElementGenerator.generateGroups(
    element,
    question.operand1,
    question.operand2
  )

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Título explicativo */}
      <Text size="lg" color="secondary" align="center">
        {question.operand1} grupos de {question.operand2} {element}
      </Text>

      {/* Grupos visuais */}
      <div className="space-y-6">
        {groups.map((group, groupIndex) => (
          <motion.div
            key={`group-${groupIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: groupIndex * 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            {/* Número do grupo */}
            <Text size="sm" color="secondary" weight="medium">
              Grupo {groupIndex + 1}
            </Text>

            {/* Elementos do grupo */}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 p-3 sm:p-4 bg-purple-50 rounded-xl border-2 border-purple-200 max-w-full">
              {group.map((el, elIndex) => (
                <motion.span
                  key={`g${groupIndex}-e${elIndex}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: groupIndex * 0.3 + elIndex * 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl"
                >
                  {el}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Operação matemática */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: groups.length * 0.3 + 0.5 }}
        className="text-center"
      >
        <Text size="xl" weight="bold" color="primary">
          {question.operand1} × {question.operand2}
        </Text>
        <Text size="sm" color="secondary" className="mt-1">
          {question.operand1} vezes {question.operand2}
        </Text>
      </motion.div>

      {/* Resultado */}
      {showResult && (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: groups.length * 0.3 + 1.0 }}
            className="text-6xl font-bold text-purple-500"
          >
            =
          </motion.div>

          {/* Todos os elementos juntos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: groups.length * 0.3 + 1.2 }}
          >
            <Text size="lg" color="secondary" align="center" className="mb-4">
              Contando todos os {element}
            </Text>

            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full sm:max-w-xl md:max-w-2xl p-4 sm:p-6 bg-green-50 rounded-xl border-2 border-green-300">
              {Array.from({ length: question.correctAnswer }).map((_, index) => (
                <motion.span
                  key={`total-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: groups.length * 0.3 + 1.2 + index * 0.03,
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl"
                >
                  {element}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groups.length * 0.3 + 2.0 }}
              className="mt-4"
            >
              <div className="text-5xl font-bold text-gray-900 text-center">
                {question.correctAnswer}
              </div>
            </motion.div>
          </motion.div>

          {/* Explicação alternativa (soma) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: groups.length * 0.3 + 2.5 }}
            className="bg-blue-50 rounded-xl p-4 text-center"
          >
            <Text size="sm" color="secondary">
              Isso é o mesmo que:
            </Text>
            <Text size="lg" weight="semibold" className="mt-1">
              {Array.from({ length: question.operand1 })
                .map(() => question.operand2)
                .join(' + ')}{' '}
              = {question.correctAnswer}
            </Text>
          </motion.div>
        </>
      )}
    </div>
  )
}
