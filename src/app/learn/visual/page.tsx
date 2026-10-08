'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppTemplate } from '@/shared/components/templates'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { Button } from '@/shared/components/atoms/Button'
import { BackButton } from '@/shared/components/atoms/BackButton'
import { VisualSum } from '@/domains/learning/presentation/components/VisualSum'
import { VisualSubtraction } from '@/domains/learning/presentation/components/VisualSubtraction'
import { VisualMultiplication } from '@/domains/learning/presentation/components/VisualMultiplication'
import { VisualDivision } from '@/domains/learning/presentation/components/VisualDivision'
import { QuestionGenerator } from '@/domains/learning/domain/services/QuestionGenerator'
import { Question, Operation } from '@/domains/learning/domain/types'

function VisualLearnPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const operationParam = searchParams.get('operation') as Operation | null

  const [currentExample, setCurrentExample] = useState(0)
  const [examples, setExamples] = useState<Question[]>([])
  const [showResult, setShowResult] = useState(false)
  const [operation, setOperation] = useState<Operation>('addition')

  useEffect(() => {
    // Define operação baseado no parâmetro ou usa adição como padrão
    const op = operationParam || 'addition'
    setOperation(op)

    // Gera exemplos visuais
    let generated

    if (op === 'multiplication') {
      // Para multiplicação, mostra exemplos de tabuadas simples
      generated = [
        ...QuestionGenerator.generateMultiplicationTable(2, 5, 2, true),
        ...QuestionGenerator.generateMultiplicationTable(3, 4, 2, true),
        ...QuestionGenerator.generateMultiplicationTable(4, 3, 1, true),
      ]
    } else if (op === 'division') {
      // Para divisão, mostra exemplos de divisões simples
      generated = [
        ...QuestionGenerator.generateDivisionQuestions(2, 5, 2, true),
        ...QuestionGenerator.generateDivisionQuestions(3, 4, 2, true),
        ...QuestionGenerator.generateDivisionQuestions(4, 3, 1, true),
      ]
    } else {
      generated = QuestionGenerator.generateProgressiveQuestions(op, 1, 10, 5)
    }

    setExamples(generated)
  }, [operationParam])

  const handleNext = () => {
    if (!showResult) {
      setShowResult(true)
      return
    }

    if (currentExample < examples.length - 1) {
      setCurrentExample(currentExample + 1)
      setShowResult(false)
    } else {
      // Completou todos os exemplos
      router.push('/learn')
    }
  }

  const handleSkip = () => {
    router.push('/learn')
  }

  if (examples.length === 0) {
    return (
      <AppTemplate>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Text size="lg">Carregando...</Text>
        </div>
      </AppTemplate>
    )
  }

  const question = examples[currentExample]

  const getTitle = () => {
    switch (operation) {
      case 'addition':
        return '🏰 Aprendendo Somas'
      case 'subtraction':
        return '🌳 Aprendendo Subtrações'
      case 'multiplication':
        return '🏴‍☠️ Aprendendo Multiplicação'
      case 'division':
        return '🚀 Aprendendo Divisão'
      default:
        return 'Aprenda Visualmente'
    }
  }

  return (
    <AppTemplate>
      <div className="space-y-6">
        {/* Botão Voltar */}
        <BackButton to="/learn" />

        {/* Header */}
        <div className="text-center space-y-2">
          <Heading level={2}>{getTitle()}</Heading>
          <Text size="sm" color="secondary">
            Exemplo {currentExample + 1} de {examples.length}
          </Text>
        </div>

        {/* Visualização */}
        {operation === 'addition' && (
          <VisualSum question={question} showResult={showResult} />
        )}
        {operation === 'subtraction' && (
          <VisualSubtraction question={question} showResult={showResult} />
        )}
        {operation === 'multiplication' && (
          <VisualMultiplication question={question} showResult={showResult} />
        )}
        {operation === 'division' && (
          <VisualDivision question={question} showResult={showResult} />
        )}

        {/* Controles */}
        <div className="flex gap-3">
          <Button variant="secondary" size="lg" onClick={handleSkip}>
            Pular
          </Button>
          <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
            {!showResult
              ? 'Ver Resultado'
              : currentExample < examples.length - 1
                ? 'Próximo'
                : 'Concluir'}
          </Button>
        </div>

        {/* Explicação (apenas para addition e subtraction, multiplication e division já tem) */}
        {showResult &&
          operation !== 'multiplication' &&
          operation !== 'division' && (
            <div
              className={`rounded-xl p-4 text-center ${
                operation === 'addition' ? 'bg-blue-50' : 'bg-green-50'
              }`}
            >
              <Text size="lg" weight="semibold">
                {operation === 'addition'
                  ? `Contando tudo, temos ${question.correctAnswer} ${question.visualElement}`
                  : `Sobraram ${question.correctAnswer} ${question.visualElement}`}
              </Text>
            </div>
          )}
      </div>
    </AppTemplate>
  )
}

export default function VisualLearnPage() {
  return (
    <Suspense
      fallback={
        <AppTemplate>
          <div className="flex items-center justify-center min-h-[50vh]">
            <Text size="lg">Carregando...</Text>
          </div>
        </AppTemplate>
      }
    >
      <VisualLearnPageContent />
    </Suspense>
  )
}
