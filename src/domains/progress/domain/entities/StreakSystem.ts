/**
 * Sistema de streak (dias consecutivos)
 * Verifica se o jogador manteve a sequência
 */
export class StreakSystem {
  /**
   * Verifica se duas datas são do mesmo dia
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  /**
   * Verifica se duas datas são dias consecutivos
   */
  static isConsecutiveDay(lastDate: Date, currentDate: Date): boolean {
    const yesterday = new Date(currentDate)
    yesterday.setDate(yesterday.getDate() - 1)

    return this.isSameDay(lastDate, yesterday)
  }

  /**
   * Atualiza o streak baseado na última data jogada
   */
  static updateStreak(
    lastPlayedDate: string | null,
    currentStreak: number
  ): { newStreak: number; lastPlayedDate: string } {
    const now = new Date()
    const today = now.toISOString().split('T')[0]

    // Primeiro acesso
    if (!lastPlayedDate) {
      return {
        newStreak: 1,
        lastPlayedDate: today,
      }
    }

    const lastDate = new Date(lastPlayedDate)

    // Já jogou hoje, mantém streak
    if (this.isSameDay(lastDate, now)) {
      return {
        newStreak: currentStreak,
        lastPlayedDate: lastPlayedDate,
      }
    }

    // Jogou ontem, incrementa streak
    if (this.isConsecutiveDay(lastDate, now)) {
      return {
        newStreak: currentStreak + 1,
        lastPlayedDate: today,
      }
    }

    // Perdeu o streak, reinicia
    return {
      newStreak: 1,
      lastPlayedDate: today,
    }
  }
}
