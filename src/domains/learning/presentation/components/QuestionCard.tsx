'use client'

import { Question } from '../../domain/types'
import { Card } from '@/shared/components/atoms/Card'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'

interface QuestionCardProps {
  question: Question
}

export function QuestionCard({ question }: QuestionCardProps) {
  const getOperationSymbol = () => {
    switch (question.operation) {
      case 'addition':
        return '+'
      case 'subtraction':
        return '-'
      case 'multiplication':
        return '×'
      case 'division':
        return '÷'
    }
  }

  return (
    <Card padding="md" className="bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-4 sm:space-y-6">
        {/* Elemento visual (se houver) */}
        {question.visualElement && (
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-full px-2">
            {Array(question.operand1)
              .fill(question.visualElement)
              .map((el, i) => (
                <span key={`v1-${i}`} className="text-2xl sm:text-3xl md:text-4xl">
                  {el}
                </span>
              ))}
            <span className="text-xl sm:text-2xl md:text-3xl text-gray-400 mx-1 sm:mx-2">
              {getOperationSymbol()}
            </span>
            {Array(question.operand2)
              .fill(question.visualElement)
              .map((el, i) => (
                <span key={`v2-${i}`} className="text-2xl sm:text-3xl md:text-4xl">
                  {el}
                </span>
              ))}
          </div>
        )}

        {/* Questão numérica */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
          <Heading level={1} className="text-4xl sm:text-5xl md:text-6xl">
            {question.operand1}
          </Heading>
          <Text size="xl" className="text-3xl sm:text-4xl md:text-5xl text-blue-500">
            {getOperationSymbol()}
          </Text>
          <Heading level={1} className="text-4xl sm:text-5xl md:text-6xl">
            {question.operand2}
          </Heading>
          <Text size="xl" className="text-3xl sm:text-4xl md:text-5xl text-green-500">
            =
          </Text>
          <Heading level={1} className="text-4xl sm:text-5xl md:text-6xl text-purple-500">
            ?
          </Heading>
        </div>

        <Text size="base" color="secondary" className="text-sm sm:text-base md:text-lg">
          Quanto é o resultado?
        </Text>
      </div>
    </Card>
  )
}
