/**
 * Sistema de níveis e XP
 * Calcula quanto XP é necessário para o próximo nível
 */
export class LevelSystem {
  /**
   * Calcula XP necessário para atingir um nível específico
   * Progressão exponencial para manter engajamento
   */
  static getXPForLevel(level: number): number {
    if (level <= 1) return 0

    // Nível 2 → 100 XP
    // Nível 3 → 250 XP
    // Nível 4 → 500 XP
    // Nível 5 → 1000 XP
    const baseXP = 100
    const multiplier = 1.5

    return Math.floor(baseXP * Math.pow(multiplier, level - 2))
  }

  /**
   * Calcula o nível baseado no XP total
   */
  static getLevelFromXP(xp: number): number {
    let level = 1
    let xpRequired = 0

    while (xp >= xpRequired + this.getXPForLevel(level + 1)) {
      xpRequired += this.getXPForLevel(level + 1)
      level++
    }

    return level
  }

  /**
   * Calcula quanto XP falta para o próximo nível
   */
  static getXPToNextLevel(currentXP: number, currentLevel: number): number {
    const xpForNextLevel = this.getXPForLevel(currentLevel + 1)
    let xpAccumulated = 0

    for (let i = 2; i <= currentLevel; i++) {
      xpAccumulated += this.getXPForLevel(i)
    }

    const xpInCurrentLevel = currentXP - xpAccumulated
    return xpForNextLevel - xpInCurrentLevel
  }
}
