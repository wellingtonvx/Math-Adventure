import { Achievement, AchievementStats } from './achievements'
import { DailyMission } from './missions'

export interface ProgressState {
  // Sistema de XP e Níveis
  xp: number
  level: number

  // Sistema de Moedas
  coins: number
  totalCoinsEarned: number // Total acumulado (para conquistas)

  // Sistema de Streak
  streak: number
  maxStreak: number
  lastPlayedDate: string | null

  // Conquistas
  achievements: Achievement[]

  // Missões Diárias
  dailyMissions: DailyMission[]
  lastMissionRefresh: string | null

  // Estatísticas (para conquistas)
  stats: {
    totalPlayDays: number
    perfectPhasesCount: number
  }

  // Metadados
  createdAt: string
  lastUpdatedAt: string
}

export interface ProgressActions {
  // XP
  addXP: (amount: number) => void
  getXPForNextLevel: () => number

  // Moedas
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean

  // Streak
  updateStreak: () => void

  // Conquistas
  checkAchievements: (learningStats?: any) => Achievement[]
  getAchievementStats: () => AchievementStats

  // Missões
  refreshDailyMissions: () => void
  updateMissionProgress: (
    missionId: string,
    type: string,
    amount: number
  ) => void
  claimMissionReward: (missionId: string) => void

  // Reset
  resetProgress: () => void
}

export type ProgressStore = ProgressState & ProgressActions

// Re-export tipos
export type { Achievement, AchievementStats } from './achievements'
export type { DailyMission } from './missions'
