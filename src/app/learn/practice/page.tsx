'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppTemplate } from '@/shared/components/templates'
import { BackButton } from '@/shared/components/atoms/BackButton'
import { useLearningStore } from '@/domains/learning/presentation/stores/useLearningStore'
import { useProgressStore } from '@/domains/progress/presentation/stores/useProgressStore'
import { LessonHeader } from '@/domains/learning/presentation/components/LessonHeader'
import { QuestionCard } from '@/domains/learning/presentation/components/QuestionCard'
import { AnswerOptions } from '@/domains/learning/presentation/components/AnswerOptions'
import { FeedbackModal } from '@/domains/learning/presentation/components/FeedbackModal'
import { CompletionScreen } from '@/domains/learning/presentation/components/CompletionScreen'
import { PhaseEntity } from '@/domains/learning/domain/entities/Phase'
import { Text } from '@/shared/components/atoms/Text'

function PracticePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phaseId = searchParams.get('phase')

  const {
    currentLesson,
    isLessonActive,
    progress,
    startLesson,
    answerQuestion,
    nextQuestion,
    completeLesson,
    getCurrentQuestion,
    getLessonProgress,
    resetLesson,
  } = useLearningStore()

  const { addXP, addCoins } = useProgressStore()

  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<{
    isCorrect: boolean
    selectedAnswer: number
  } | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentPhase = progress.phases.find((p) => p.id === phaseId)

  useEffect(() => {
    if (!phaseId || !currentPhase) {
      router.push('/learn')
      return
    }

    if (currentPhase.isLocked) {
      router.push('/learn')
      return
    }

    // Inicia a lição
    startLesson(phaseId)

    return () => {
      resetLesson()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseId])

  const handleAnswer = (answer: number) => {
    const isCorrect = answerQuestion(answer)

    // Adiciona XP se acertou
    if (isCorrect) {
      addXP(10)
    }

    setLastAnswer({ isCorrect, selectedAnswer: answer })
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)
    setLastAnswer(null)

    const lessonProgress = getLessonProgress()

    if (lessonProgress.current + 1 >= lessonProgress.total) {
      // Última questão - completa a lição
      completeLesson()

      if (currentLesson && currentPhase) {
        const totalCorrect = currentLesson.totalCorrect + (lastAnswer?.isCorrect ? 1 : 0)
        const passed = PhaseEntity.isPassed(totalCorrect, currentPhase.requiredCorrect)

        if (passed) {
          addXP(currentPhase.xpReward)
          addCoins(currentPhase.coinsReward)
        }
      }

      setIsCompleted(true)
    } else {
      nextQuestion()
    }
  }

  const handleBackToLearn = () => {
    router.push('/learn')
  }

  const handleRetry = () => {
    setIsCompleted(false)
    if (phaseId) {
      startLesson(phaseId)
    }
  }

  const handleNextPhase = () => {
    if (!currentPhase) return

    // Encontra próxima fase da mesma operação
    const samePhasesOperation = progress.phases.filter(
      (p) => p.operation === currentPhase.operation
    )
    const currentIndexInOperation = samePhasesOperation.findIndex(
      (p) => p.id === phaseId
    )
    const nextPhase = samePhasesOperation[currentIndexInOperation + 1]

    if (nextPhase && !nextPhase.isLocked) {
      // Navega para próxima fase
      router.push(`/learn/practice?phase=${nextPhase.id}`)
    }
  }

  if (!currentLesson || !currentPhase) {
    return (
      <AppTemplate>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Text size="lg">Carregando...</Text>
        </div>
      </AppTemplate>
    )
  }

  // Tela de conclusão
  if (isCompleted) {
    const stars = PhaseEntity.calculateStars(
      currentLesson.totalCorrect,
      currentLesson.questions.length
    )
    const passed = PhaseEntity.isPassed(
      currentLesson.totalCorrect,
      currentPhase.requiredCorrect
    )

    // Encontra próxima fase da mesma operação
    const samePhasesOperation = progress.phases.filter(
      (p) => p.operation === currentPhase.operation
    )
    const currentIndexInOperation = samePhasesOperation.findIndex(
      (p) => p.id === phaseId
    )
    const nextPhase = samePhasesOperation[currentIndexInOperation + 1]
    const hasNextPhase = nextPhase && !nextPhase.isLocked

    return (
      <CompletionScreen
        totalQuestions={currentLesson.questions.length}
        correctAnswers={currentLesson.totalCorrect}
        stars={stars}
        xpEarned={passed ? currentPhase.xpReward : 0}
        coinsEarned={passed ? currentPhase.coinsReward : 0}
        passed={passed}
        onContinue={handleBackToLearn}
        onRetry={handleRetry}
        currentPhaseName={currentPhase.name}
        nextPhaseName={hasNextPhase ? nextPhase.name : undefined}
        onNextPhase={hasNextPhase ? handleNextPhase : undefined}
      />
    )
  }

  const currentQuestion = getCurrentQuestion()
  const lessonProgress = getLessonProgress()

  if (!currentQuestion) {
    return (
      <AppTemplate>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Text size="lg">Erro ao carregar questão</Text>
        </div>
      </AppTemplate>
    )
  }

  return (
    <AppTemplate>
      <div className="space-y-6">
        {/* Header com progresso */}
        <LessonHeader
          title={currentPhase.name}
          current={lessonProgress.current}
          total={lessonProgress.total}
          onBack={handleBackToLearn}
        />

        {/* Questão */}
        <QuestionCard question={currentQuestion} />

        {/* Opções de resposta */}
        <AnswerOptions
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabled={showFeedback}
        />

        {/* Modal de feedback */}
        <FeedbackModal
          isOpen={showFeedback}
          isCorrect={lastAnswer?.isCorrect || false}
          correctAnswer={currentQuestion.correctAnswer}
          selectedAnswer={lastAnswer?.selectedAnswer}
          xpEarned={10}
          onNext={handleNextQuestion}
        />
      </div>
    </AppTemplate>
  )
}

export default function PracticePage() {
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
      <PracticePageContent />
    </Suspense>
  )
}
