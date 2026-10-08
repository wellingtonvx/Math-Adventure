export type AchievementCategory =
  | 'learning'
  | 'streak'
  | 'mastery'
  | 'exploration'
  | 'progress'

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: AchievementCategory
  tier: AchievementTier
  requirement: number // Valor necessário para desbloquear
  reward: {
    xp: number
    coins: number
  }
  unlockedAt: string | null
  progress: number // Progresso atual
}

export interface AchievementDefinition {
  id: string
  title: string
  description: string
  icon: string
  category: AchievementCategory
  tier: AchievementTier
  requirement: number
  reward: {
    xp: number
    coins: number
  }
  checkCondition: (stats: AchievementStats) => number
}

export interface AchievementStats {
  // Estatísticas gerais
  totalQuestionsAnswered: number
  totalCorrect: number
  totalWrong: number
  currentStreak: number
  maxStreak: number
  currentLevel: number
  totalXP: number
  totalCoins: number

  // Estatísticas por operação
  additionCompleted: number
  subtractionCompleted: number
  multiplicationCompleted: number
  divisionCompleted: number

  // Fases
  totalPhasesCompleted: number
  perfectPhases: number // Fases com 100% de acerto

  // Sessões
  totalPlayDays: number
  consecutiveDays: number
}
