'use client'

import { motion } from 'framer-motion'
import { Question } from '../../domain/types'
import { Text } from '@/shared/components/atoms/Text'

interface VisualDivisionProps {
  question: Question
  showResult?: boolean
}

export function VisualDivision({
  question,
  showResult = false,
}: VisualDivisionProps) {
  const element = question.visualElement || '🍎'
  const dividend = question.operand1 // Total de elementos
  const divisor = question.operand2 // Número de grupos
  const quotient = question.correctAnswer // Elementos por grupo

  // Gera grupos de distribuição (divisor grupos, cada um com quotient elementos)
  const groups = Array.from({ length: divisor }, (_, groupIndex) =>
    Array.from({ length: quotient }, () => element)
  )

  // Todos os elementos iniciais (para mostrar antes da divisão)
  const allElements = Array.from({ length: dividend }, () => element)

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Título explicativo */}
      <Text size="lg" color="secondary" align="center">
        {dividend} {element} divididos em {divisor} grupos
      </Text>

      {/* Todos os elementos antes da divisão */}
      {!showResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Text size="sm" color="secondary" weight="medium">
            Todos os {element} juntos
          </Text>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-200 max-w-full sm:max-w-xl md:max-w-2xl">
            {allElements.map((el, index) => (
              <motion.span
                key={`initial-${index}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="text-2xl sm:text-3xl md:text-4xl"
              >
                {el}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Operação matemática */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: showResult ? 0 : allElements.length * 0.05 + 0.3 }}
        className="text-center"
      >
        <Text size="xl" weight="bold" color="primary">
          {dividend} ÷ {divisor}
        </Text>
        <Text size="sm" color="secondary" className="mt-1">
          {dividend} dividido por {divisor}
        </Text>
      </motion.div>

      {/* Grupos após a divisão */}
      {showResult && (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl font-bold text-blue-500"
          >
            =
          </motion.div>

          {/* Distribuição em grupos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full"
          >
            <Text size="lg" color="secondary" align="center" className="mb-4">
              Distribuindo igualmente
            </Text>

            <div className="space-y-4">
              {groups.map((group, groupIndex) => (
                <motion.div
                  key={`group-${groupIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + groupIndex * 0.3 }}
                  className="flex flex-col items-center gap-2"
                >
                  {/* Número do grupo */}
                  <Text size="sm" color="secondary" weight="medium">
                    Grupo {groupIndex + 1}
                  </Text>

                  {/* Elementos do grupo */}
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 p-3 sm:p-4 bg-green-50 rounded-xl border-2 border-green-200 max-w-full">
                    {group.map((el, elIndex) => (
                      <motion.span
                        key={`g${groupIndex}-e${elIndex}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.7 + groupIndex * 0.3 + elIndex * 0.1,
                        }}
                        className="text-2xl sm:text-3xl md:text-4xl"
                      >
                        {el}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resultado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + groups.length * 0.3 + 0.5 }}
            className="text-center"
          >
            <Text size="lg" color="secondary" className="mb-2">
              Cada grupo recebeu
            </Text>
            <div className="text-5xl font-bold text-gray-900">
              {quotient}
            </div>
            <Text size="sm" color="secondary" className="mt-1">
              {element} por grupo
            </Text>
          </motion.div>

          {/* Verificação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + groups.length * 0.3 + 1.0 }}
            className="bg-purple-50 rounded-xl p-4 text-center"
          >
            <Text size="sm" color="secondary">
              Verificando:
            </Text>
            <Text size="lg" weight="semibold" className="mt-1">
              {divisor} grupos × {quotient} {element} = {dividend} {element}
            </Text>
          </motion.div>
        </>
      )}
    </div>
  )
}
