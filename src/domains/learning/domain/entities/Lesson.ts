import { Lesson, Question, Answer } from '../types'

/**
 * Entidade Lesson
 * Representa uma sessão de aprendizado
 */
export class LessonEntity {
  /**
   * Cria uma nova lição
   */
  static create(phaseId: string, questions: Question[]): Lesson {
    return {
      id: this.generateId(),
      phaseId,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      startedAt: new Date().toISOString(),
      totalCorrect: 0,
      totalWrong: 0,
    }
  }

  /**
   * Gera ID único
   */
  private static generateId(): string {
    return `lesson_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Adiciona uma resposta à lição
   */
  static addAnswer(lesson: Lesson, answer: Answer): Lesson {
    return {
      ...lesson,
      answers: [...lesson.answers, answer],
      totalCorrect: lesson.totalCorrect + (answer.isCorrect ? 1 : 0),
      totalWrong: lesson.totalWrong + (answer.isCorrect ? 0 : 1),
    }
  }

  /**
   * Avança para próxima questão
   */
  static nextQuestion(lesson: Lesson): Lesson {
    return {
      ...lesson,
      currentQuestionIndex: lesson.currentQuestionIndex + 1,
    }
  }

  /**
   * Completa a lição
   */
  static complete(lesson: Lesson): Lesson {
    return {
      ...lesson,
      completedAt: new Date().toISOString(),
    }
  }

  /**
   * Verifica se a lição está completa
   */
  static isComplete(lesson: Lesson): boolean {
    return lesson.currentQuestionIndex >= lesson.questions.length
  }

  /**
   * Obtém a questão atual
   */
  static getCurrentQuestion(lesson: Lesson): Question | null {
    if (this.isComplete(lesson)) return null
    return lesson.questions[lesson.currentQuestionIndex]
  }

  /**
   * Calcula a porcentagem de acertos
   */
  static getAccuracyPercentage(lesson: Lesson): number {
    const total = lesson.totalCorrect + lesson.totalWrong
    if (total === 0) return 0
    return (lesson.totalCorrect / total) * 100
  }
}
