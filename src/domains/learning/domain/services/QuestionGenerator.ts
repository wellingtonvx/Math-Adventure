import { Question, Operation, Difficulty, VisualElement } from '../types'
import { QuestionEntity } from '../entities/Question'

/**
 * Serviço para gerar questões matemáticas
 */
export class QuestionGenerator {
  /**
   * Gera múltiplas questões baseado nos parâmetros
   */
  static generateQuestions(
    operation: Operation,
    difficulty: Difficulty,
    minRange: number,
    maxRange: number,
    count: number,
    withVisuals: boolean = false
  ): Question[] {
    const questions: Question[] = []

    for (let i = 0; i < count; i++) {
      const question = this.generateQuestion(
        operation,
        difficulty,
        minRange,
        maxRange,
        withVisuals
      )
      questions.push(question)
    }

    return questions
  }

  /**
   * Gera uma única questão
   */
  static generateQuestion(
    operation: Operation,
    difficulty: Difficulty,
    minRange: number,
    maxRange: number,
    withVisuals: boolean = false
  ): Question {
    const operand1 = this.randomInRange(minRange, maxRange)
    const operand2 = this.randomInRange(minRange, maxRange)

    const visualElement = withVisuals
      ? this.getRandomVisualElement()
      : undefined

    return QuestionEntity.create(
      operation,
      operand1,
      operand2,
      difficulty,
      visualElement
    )
  }

  /**
   * Gera número aleatório em um intervalo
   */
  private static randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Retorna um elemento visual aleatório
   */
  private static getRandomVisualElement(): VisualElement {
    const elements: VisualElement[] = [
      '🍎',
      '⭐',
      '🟦',
      '🍌',
      '🍓',
      '🌟',
      '🟨',
      '🟩',
    ]
    return elements[Math.floor(Math.random() * elements.length)]
  }

  /**
   * Gera questões progressivas (aumenta dificuldade gradualmente)
   */
  static generateProgressiveQuestions(
    operation: Operation,
    startRange: number,
    endRange: number,
    count: number
  ): Question[] {
    const questions: Question[] = []
    const step = (endRange - startRange) / count

    for (let i = 0; i < count; i++) {
      const currentMax = Math.floor(startRange + step * (i + 1))
      const difficulty = this.getDifficultyForRange(currentMax)

      const question = this.generateQuestion(
        operation,
        difficulty,
        1,
        currentMax,
        i < count / 2 // Primeira metade com visuais
      )

      questions.push(question)
    }

    return questions
  }

  /**
   * Determina dificuldade baseado no range
   */
  private static getDifficultyForRange(range: number): Difficulty {
    if (range <= 5) return 'easy'
    if (range <= 10) return 'medium'
    return 'hard'
  }

  /**
   * Gera questões de tabuada (um operando fixo)
   * Ex: tabuada do 2 = 2×1, 2×2, 2×3... 2×10
   */
  static generateMultiplicationTable(
    multiplier: number,
    maxMultiplicand: number = 10,
    count: number = 12,
    withVisuals: boolean = true,
    shuffle: boolean = true
  ): Question[] {
    const questions: Question[] = []
    const difficulty = this.getDifficultyForRange(multiplier)

    if (shuffle) {
      // Gera questões aleatórias da tabuada
      for (let i = 0; i < count; i++) {
        const multiplicand = this.randomInRange(1, maxMultiplicand)

        const visualElement = withVisuals
          ? this.getRandomVisualElement()
          : undefined

        questions.push(
          QuestionEntity.create(
            'multiplication',
            multiplier,
            multiplicand,
            difficulty,
            visualElement
          )
        )
      }
    } else {
      // Gera questões em ordem sequencial (1, 2, 3, 4... até maxMultiplicand)
      // Limita count ao maxMultiplicand para evitar repetição
      const actualCount = Math.min(count, maxMultiplicand)

      for (let i = 0; i < actualCount; i++) {
        const multiplicand = i + 1

        const visualElement = withVisuals
          ? this.getRandomVisualElement()
          : undefined

        questions.push(
          QuestionEntity.create(
            'multiplication',
            multiplier,
            multiplicand,
            difficulty,
            visualElement
          )
        )
      }
    }

    return questions
  }

  /**
   * Gera questões de divisão garantindo divisão exata (sem resto)
   * Usa fatos de multiplicação invertidos para garantir resultado inteiro
   * Ex: divisor 2 = 2÷2, 4÷2, 6÷2... 20÷2
   */
  static generateDivisionQuestions(
    divisor: number,
    maxQuotient: number = 10,
    count: number = 12,
    withVisuals: boolean = true,
    shuffle: boolean = true
  ): Question[] {
    const questions: Question[] = []
    const difficulty = this.getDifficultyForRange(divisor)

    if (shuffle) {
      // Gera questões aleatórias de divisão
      for (let i = 0; i < count; i++) {
        // Quociente (resultado) aleatório
        const quotient = this.randomInRange(1, maxQuotient)

        // Dividendo = divisor × quociente (garante divisão exata)
        const dividend = divisor * quotient

        const visualElement = withVisuals
          ? this.getRandomVisualElement()
          : undefined

        questions.push(
          QuestionEntity.create(
            'division',
            dividend,  // operand1 = dividendo
            divisor,   // operand2 = divisor
            difficulty,
            visualElement
          )
        )
      }
    } else {
      // Gera questões em ordem sequencial (1, 2, 3, 4... até maxQuotient)
      // Limita count ao maxQuotient para evitar repetição
      const actualCount = Math.min(count, maxQuotient)

      for (let i = 0; i < actualCount; i++) {
        const quotient = i + 1

        // Dividendo = divisor × quociente (garante divisão exata)
        const dividend = divisor * quotient

        const visualElement = withVisuals
          ? this.getRandomVisualElement()
          : undefined

        questions.push(
          QuestionEntity.create(
            'division',
            dividend,  // operand1 = dividendo
            divisor,   // operand2 = divisor
            difficulty,
            visualElement
          )
        )
      }
    }

    return questions
  }
}
