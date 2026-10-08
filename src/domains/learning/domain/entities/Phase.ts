import { Phase, Operation, Difficulty } from '../types'

/**
 * Entidade Phase
 * Representa uma fase/nível de aprendizado
 */
export class PhaseEntity {
  /**
   * Cria uma nova fase
   */
  static create(
    id: string,
    name: string,
    description: string,
    operation: Operation,
    difficulty: Difficulty,
    minRange: number,
    maxRange: number,
    questionsCount: number,
    requiredCorrect: number,
    xpReward: number,
    coinsReward: number,
    isLocked: boolean = true
  ): Phase {
    return {
      id,
      name,
      description,
      operation,
      difficulty,
      minRange,
      maxRange,
      questionsCount,
      requiredCorrect,
      xpReward,
      coinsReward,
      isLocked,
      isCompleted: false,
      stars: 0,
    }
  }

  /**
   * Calcula estrelas baseado na performance
   */
  static calculateStars(correctAnswers: number, totalQuestions: number): number {
    const percentage = (correctAnswers / totalQuestions) * 100

    if (percentage === 100) return 3
    if (percentage >= 80) return 2
    if (percentage >= 60) return 1
    return 0
  }

  /**
   * Verifica se a fase foi concluída com sucesso
   */
  static isPassed(correctAnswers: number, requiredCorrect: number): boolean {
    return correctAnswers >= requiredCorrect
  }

  /**
   * Desbloqueia uma fase
   */
  static unlock(phase: Phase): Phase {
    return {
      ...phase,
      isLocked: false,
    }
  }

  /**
   * Completa uma fase
   */
  static complete(phase: Phase, stars: number): Phase {
    return {
      ...phase,
      isCompleted: true,
      stars: Math.max(phase.stars, stars), // Mantém a melhor pontuação
    }
  }
}
