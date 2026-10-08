import { Operation, Question, Difficulty, VisualElement } from '../types'

/**
 * Entidade Question
 * Representa uma questão matemática
 */
export class QuestionEntity {
  /**
   * Cria uma nova questão
   */
  static create(
    operation: Operation,
    operand1: number,
    operand2: number,
    difficulty: Difficulty,
    visualElement?: VisualElement
  ): Question {
    const correctAnswer = this.calculate(operation, operand1, operand2)

    return {
      id: this.generateId(),
      operation,
      operand1,
      operand2,
      correctAnswer,
      difficulty,
      visualElement,
    }
  }

  /**
   * Calcula o resultado correto
   */
  static calculate(operation: Operation, operand1: number, operand2: number): number {
    switch (operation) {
      case 'addition':
        return operand1 + operand2
      case 'subtraction':
        return operand1 - operand2
      case 'multiplication':
        return operand1 * operand2
      case 'division':
        return operand1 / operand2
      default:
        throw new Error(`Operação não suportada: ${operation}`)
    }
  }

  /**
   * Gera um ID único para a questão
   */
  private static generateId(): string {
    return `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Verifica se a resposta está correta
   */
  static isCorrect(question: Question, answer: number): boolean {
    return question.correctAnswer === answer
  }

  /**
   * Gera opções de resposta (incluindo a correta)
   */
  static generateOptions(question: Question, count: number = 4): number[] {
    const options = new Set<number>()
    options.add(question.correctAnswer)

    const { correctAnswer } = question
    const range = Math.max(5, Math.floor(correctAnswer * 0.5))

    while (options.size < count) {
      const offset = Math.floor(Math.random() * range * 2) - range
      const option = correctAnswer + offset

      if (option >= 0 && option !== correctAnswer) {
        options.add(option)
      }
    }

    // Embaralha as opções
    return Array.from(options).sort(() => Math.random() - 0.5)
  }
}
