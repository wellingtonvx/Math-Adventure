import { create } from 'zustand'
import { LearningStore, Question } from '../../domain/types'
import { learningRepository } from '../../infrastructure/repositories/LearningRepository'
import { QuestionGenerator } from '../../domain/services/QuestionGenerator'
import { LessonEntity } from '../../domain/entities/Lesson'
import { PhaseEntity } from '../../domain/entities/Phase'
import { QuestionEntity } from '../../domain/entities/Question'
import { useProgressStore } from '@/domains/progress/presentation/stores/useProgressStore'

export const useLearningStore = create<LearningStore>((set, get) => ({
  // Estado inicial
  progress: learningRepository.createInitialProgress(),
  currentLesson: null,
  isLessonActive: false,

  // Carrega progresso salvo
  loadProgress: async () => {
    const savedProgress = await learningRepository.load()

    if (savedProgress) {
      // Migração: garante que primeira fase de cada reino está desbloqueada
      const migratedPhases = savedProgress.phases.map((phase) => {
        // IDs das primeiras fases de cada reino
        const firstPhaseIds = ['addition-1', 'subtraction-1', 'multiplication-1', 'division-1']
        if (firstPhaseIds.includes(phase.id) && phase.isLocked) {
          return { ...phase, isLocked: false }
        }
        return phase
      })

      const migratedProgress = { ...savedProgress, phases: migratedPhases }
      await learningRepository.save(migratedProgress)
      set({ progress: migratedProgress })
    } else {
      // Cria progresso inicial e salva
      const initialProgress = learningRepository.createInitialProgress()
      await learningRepository.save(initialProgress)
      set({ progress: initialProgress })
    }
  },

  // Desbloqueia uma fase
  unlockPhase: (phaseId: string) => {
    set((state) => {
      const updatedPhases = state.progress.phases.map((phase) =>
        phase.id === phaseId ? PhaseEntity.unlock(phase) : phase
      )

      const updatedProgress = {
        ...state.progress,
        phases: updatedPhases,
      }

      learningRepository.save(updatedProgress)

      return {
        progress: updatedProgress,
      }
    })
  },

  // Completa uma fase
  completePhase: (phaseId: string, stars: number) => {
    set((state) => {
      const updatedPhases = state.progress.phases.map((phase) =>
        phase.id === phaseId ? PhaseEntity.complete(phase, stars) : phase
      )

      const completedPhases = state.progress.completedPhases.includes(phaseId)
        ? state.progress.completedPhases
        : [...state.progress.completedPhases, phaseId]

      const updatedProgress = {
        ...state.progress,
        phases: updatedPhases,
        completedPhases,
        lastPlayedAt: new Date().toISOString(),
      }

      learningRepository.save(updatedProgress)

      return {
        progress: updatedProgress,
      }
    })
  },

  // Inicia uma lição
  startLesson: (phaseId: string) => {
    const state = get()
    const phase = state.progress.phases.find((p) => p.id === phaseId)

    if (!phase) {
      console.error(`Fase não encontrada: ${phaseId}`)
      return
    }

    // Gera questões para a fase
    let questions

    if (phase.operation === 'multiplication') {
      // Para multiplicação, usa tabuada específica
      // maxRange define o multiplicador (2, 3, 4, 5)
      // shuffle=false para questões em ordem (1x2, 2x2, 3x2, etc)
      questions = QuestionGenerator.generateMultiplicationTable(
        phase.maxRange, // multiplicador fixo (2, 3, 4, 5)
        10, // multiplicando vai de 1 a 10
        phase.questionsCount,
        true, // com elementos visuais
        false // sem embaralhar - ordem sequencial
      )
    } else if (phase.operation === 'division') {
      // Para divisão, usa gerador de divisão (sem resto)
      // maxRange define o divisor (2, 3, 4, 5)
      // shuffle=false para questões em ordem (2÷2, 4÷2, 6÷2, etc)
      questions = QuestionGenerator.generateDivisionQuestions(
        phase.maxRange, // divisor fixo (2, 3, 4, 5)
        10, // quociente máximo
        phase.questionsCount,
        true, // com elementos visuais
        false // sem embaralhar - ordem sequencial
      )
    } else {
      // Para outras operações, usa gerador padrão
      questions = QuestionGenerator.generateQuestions(
        phase.operation,
        phase.difficulty,
        phase.minRange,
        phase.maxRange,
        phase.questionsCount,
        true // com elementos visuais
      )
    }

    // Cria a lição
    const lesson = LessonEntity.create(phaseId, questions)

    set({
      currentLesson: lesson,
      isLessonActive: true,
    })
  },

  // Responde uma questão
  answerQuestion: (answer: number): boolean => {
    const state = get()
    const lesson = state.currentLesson

    if (!lesson) return false

    const question = LessonEntity.getCurrentQuestion(lesson)
    if (!question) return false

    const isCorrect = QuestionEntity.isCorrect(question, answer)

    // Cria resposta
    const answerObj = {
      questionId: question.id,
      selectedAnswer: answer,
      isCorrect,
      timeToAnswer: 0, // TODO: implementar timer
    }

    // Atualiza lição com a resposta
    const updatedLesson = LessonEntity.addAnswer(lesson, answerObj)

    // Atualiza progresso global
    const updatedProgress = {
      ...state.progress,
      totalQuestionsAnswered: state.progress.totalQuestionsAnswered + 1,
      totalCorrect: state.progress.totalCorrect + (isCorrect ? 1 : 0),
      totalWrong: state.progress.totalWrong + (isCorrect ? 0 : 1),
    }

    learningRepository.save(updatedProgress)

    set({
      currentLesson: updatedLesson,
      progress: updatedProgress,
    })

    // Atualiza missões diárias
    const progressStore = useProgressStore.getState()
    // Atualiza missão de responder questões
    progressStore.dailyMissions.forEach((mission) => {
      if (mission.type === 'answer_questions') {
        progressStore.updateMissionProgress(mission.id, 'answer_questions', 1)
      }
      // Atualiza missão de praticar operação específica
      if (mission.type === 'practice_operation') {
        progressStore.updateMissionProgress(mission.id, 'practice_operation', 1)
      }
    })

    return isCorrect
  },

  // Avança para próxima questão
  nextQuestion: () => {
    set((state) => {
      if (!state.currentLesson) return state

      const updatedLesson = LessonEntity.nextQuestion(state.currentLesson)

      return {
        currentLesson: updatedLesson,
      }
    })
  },

  // Completa a lição
  completeLesson: () => {
    const state = get()
    const lesson = state.currentLesson

    if (!lesson) return

    const completedLesson = LessonEntity.complete(lesson)

    // Calcula estrelas
    const stars = PhaseEntity.calculateStars(
      completedLesson.totalCorrect,
      completedLesson.questions.length
    )

    // Verifica se passou na fase
    const phase = state.progress.phases.find((p) => p.id === lesson.phaseId)
    if (phase) {
      const passed = PhaseEntity.isPassed(
        completedLesson.totalCorrect,
        phase.requiredCorrect
      )

      if (passed) {
        // Completa a fase
        get().completePhase(lesson.phaseId, stars)

        // Desbloqueia próxima fase DO MESMO REINO (operação)
        const currentPhaseData = state.progress.phases.find(
          (p) => p.id === lesson.phaseId
        )
        if (currentPhaseData) {
          // Filtra fases da mesma operação
          const samePhasesOperation = state.progress.phases.filter(
            (p) => p.operation === currentPhaseData.operation
          )
          // Encontra índice da fase atual dentro do reino
          const currentIndexInOperation = samePhasesOperation.findIndex(
            (p) => p.id === lesson.phaseId
          )
          // Pega próxima fase do mesmo reino
          const nextPhaseInOperation = samePhasesOperation[currentIndexInOperation + 1]
          if (nextPhaseInOperation) {
            get().unlockPhase(nextPhaseInOperation.id)
          }
        }

        // Atualiza missões diárias de completar fase
        const progressStore = useProgressStore.getState()
        progressStore.dailyMissions.forEach((mission) => {
          if (mission.type === 'complete_phase') {
            progressStore.updateMissionProgress(mission.id, 'complete_phase', 1)
          }
        })

        // Atualiza estatísticas de conquistas se foi fase perfeita
        if (stars === 3) {
          progressStore.stats.perfectPhasesCount += 1
        }

        // Verifica conquistas com estatísticas atualizadas
        const learningStats = {
          totalQuestionsAnswered: state.progress.totalQuestionsAnswered,
          totalCorrect: state.progress.totalCorrect,
          totalWrong: state.progress.totalWrong,
          additionCompleted: state.progress.phases.filter(
            (p) => p.operation === 'addition' && p.isCompleted
          ).length,
          subtractionCompleted: state.progress.phases.filter(
            (p) => p.operation === 'subtraction' && p.isCompleted
          ).length,
          multiplicationCompleted: state.progress.phases.filter(
            (p) => p.operation === 'multiplication' && p.isCompleted
          ).length,
          divisionCompleted: state.progress.phases.filter(
            (p) => p.operation === 'division' && p.isCompleted
          ).length,
          totalPhasesCompleted: state.progress.completedPhases.length,
        }
        progressStore.checkAchievements(learningStats)
      }
    }

    set({
      currentLesson: completedLesson,
      isLessonActive: false,
    })
  },

  // Retorna a questão atual
  getCurrentQuestion: (): Question | null => {
    const state = get()
    if (!state.currentLesson) return null
    return LessonEntity.getCurrentQuestion(state.currentLesson)
  },

  // Retorna progresso da lição
  getLessonProgress: () => {
    const state = get()
    if (!state.currentLesson) {
      return { current: 0, total: 0 }
    }

    return {
      current: state.currentLesson.currentQuestionIndex,
      total: state.currentLesson.questions.length,
    }
  },

  // Reseta a lição atual
  resetLesson: () => {
    set({
      currentLesson: null,
      isLessonActive: false,
    })
  },
}))

// Carrega progresso ao inicializar
if (typeof window !== 'undefined') {
  useLearningStore.getState().loadProgress()
}
