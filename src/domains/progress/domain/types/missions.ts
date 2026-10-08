export type MissionType =
  | 'answer_questions'
  | 'correct_streak'
  | 'complete_phase'
  | 'earn_xp'
  | 'practice_operation'

export type MissionDifficulty = 'easy' | 'medium' | 'hard'

export interface DailyMission {
  id: string
  title: string
  description: string
  icon: string
  type: MissionType
  difficulty: MissionDifficulty
  target: number // Objetivo a atingir
  progress: number // Progresso atual
  reward: {
    xp: number
    coins: number
  }
  completed: boolean
  claimedAt: string | null
  expiresAt: string // Data de expiração (final do dia)
}

export interface MissionDefinition {
  type: MissionType
  difficulties: {
    [K in MissionDifficulty]: {
      title: string
      description: string
      icon: string
      target: number
      reward: {
        xp: number
        coins: number
      }
    }
  }
}
