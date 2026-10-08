/**
 * Tipos do domínio de aprendizado
 */

// Tipos de operação matemática
export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division'

// Tipos de modo de aprendizado
export type LearningMode = 'visual' | 'practice'

// Tipos de elementos visuais
export type VisualElement = '🍎' | '⭐' | '🟦' | '🍌' | '🍓' | '🌟' | '🟨' | '🟩'

// Dificuldade das questões
export type Difficulty = 'easy' | 'medium' | 'hard'

// Questão matemática
export interface Question {
  id: string
  operation: Operation
  operand1: number
  operand2: number
  correctAnswer: number
  difficulty: Difficulty
  visualElement?: VisualElement
}

// Resposta do usuário
export interface Answer {
  questionId: string
  selectedAnswer: number
  isCorrect: boolean
  timeToAnswer: number // em segundos
}

// Fase de aprendizado
export interface Phase {
  id: string
  name: string
  description: string
  operation: Operation
  difficulty: Difficulty
  minRange: number // valor mínimo dos operandos
  maxRange: number // valor máximo dos operandos
  questionsCount: number // quantidade de questões
  requiredCorrect: number // quantidade mínima de acertos para passar
  xpReward: number
  coinsReward: number
  isLocked: boolean
  isCompleted: boolean
  stars: number // 0-3 estrelas baseado na performance
}

// Lição (conjunto de questões)
export interface Lesson {
  id: string
  phaseId: string
  questions: Question[]
  currentQuestionIndex: number
  answers: Answer[]
  startedAt: string
  completedAt?: string
  totalCorrect: number
  totalWrong: number
}

// Progresso de aprendizado
export interface LearningProgress {
  phases: Phase[]
  completedPhases: string[]
  currentPhaseId: string | null
  totalQuestionsAnswered: number
  totalCorrect: number
  totalWrong: number
  lastPlayedAt: string | null
}

// Estado da store de aprendizado
export interface LearningState {
  progress: LearningProgress
  currentLesson: Lesson | null
  isLessonActive: boolean
}

// Ações da store de aprendizado
export interface LearningActions {
  // Fases
  loadProgress: () => Promise<void>
  unlockPhase: (phaseId: string) => void
  completePhase: (phaseId: string, stars: number) => void

  // Lições
  startLesson: (phaseId: string) => void
  answerQuestion: (answer: number) => boolean
  nextQuestion: () => void
  completeLesson: () => void

  // Helpers
  getCurrentQuestion: () => Question | null
  getLessonProgress: () => { current: number; total: number }
  resetLesson: () => void
}

export type LearningStore = LearningState & LearningActions
