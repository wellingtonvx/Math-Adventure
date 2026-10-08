/**
 * Tipos compartilhados em toda a aplicação
 */

// Níveis de progresso do jogador
export interface PlayerLevel {
  current: number
  xp: number
  xpToNextLevel: number
}

// Sistema de moedas
export interface PlayerCoins {
  total: number
}

// Sistema de streak (dias consecutivos)
export interface PlayerStreak {
  current: number
  lastDate: string | null
}

// Dados gerais do progresso do jogador
export interface PlayerProgress {
  level: PlayerLevel
  coins: PlayerCoins
  streak: PlayerStreak
  createdAt: string
  lastPlayedAt: string
}
