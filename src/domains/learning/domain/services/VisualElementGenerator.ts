import { VisualElement } from '../types'

/**
 * Serviço para gerar representações visuais de números
 */
export class VisualElementGenerator {
  /**
   * Gera array de elementos visuais
   */
  static generate(element: VisualElement, count: number): VisualElement[] {
    return Array(count).fill(element)
  }

  /**
   * Gera elementos visuais organizados em grupos
   * Útil para representar multiplicação (ex: 3 grupos de 4)
   */
  static generateGroups(
    element: VisualElement,
    groups: number,
    itemsPerGroup: number
  ): VisualElement[][] {
    const result: VisualElement[][] = []

    for (let i = 0; i < groups; i++) {
      result.push(this.generate(element, itemsPerGroup))
    }

    return result
  }

  /**
   * Gera dois grupos de elementos para representar soma
   */
  static generateForAddition(
    element: VisualElement,
    operand1: number,
    operand2: number
  ): {
    group1: VisualElement[]
    group2: VisualElement[]
    total: VisualElement[]
  } {
    return {
      group1: this.generate(element, operand1),
      group2: this.generate(element, operand2),
      total: this.generate(element, operand1 + operand2),
    }
  }

  /**
   * Gera elementos para representar subtração
   */
  static generateForSubtraction(
    element: VisualElement,
    total: number,
    toRemove: number
  ): {
    initial: VisualElement[]
    removed: number
    remaining: VisualElement[]
  } {
    return {
      initial: this.generate(element, total),
      removed: toRemove,
      remaining: this.generate(element, total - toRemove),
    }
  }

  /**
   * Retorna emoji baseado no nome
   */
  static getElementByName(name: string): VisualElement {
    const map: Record<string, VisualElement> = {
      apple: '🍎',
      star: '⭐',
      blue: '🟦',
      banana: '🍌',
      strawberry: '🍓',
      sparkle: '🌟',
      yellow: '🟨',
      green: '🟩',
    }

    return map[name] || '🍎'
  }

  /**
   * Agrupa elementos em linhas (para melhor visualização)
   */
  static groupInRows(
    elements: VisualElement[],
    itemsPerRow: number
  ): VisualElement[][] {
    const rows: VisualElement[][] = []

    for (let i = 0; i < elements.length; i += itemsPerRow) {
      rows.push(elements.slice(i, i + itemsPerRow))
    }

    return rows
  }
}
