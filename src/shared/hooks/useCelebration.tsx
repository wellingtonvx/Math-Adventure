'use client'

import { create } from 'zustand'
import { Achievement } from '@/domains/progress/domain/types/achievements'

interface CelebrationState {
  // Conquista desbloqueada
  unlockedAchievement: Achievement | null
  showAchievementModal: (achievement: Achievement) => void
  hideAchievementModal: () => void

  // Level up
  newLevel: number | null
  showLevelUpModal: (level: number) => void
  hideLevelUpModal: () => void

  // Mascote
  mascotMessage: string | null
  mascotMood: 'happy' | 'excited' | 'thinking' | 'celebration' | 'encouraging'
  showMascot: (
    message: string,
    mood?: 'happy' | 'excited' | 'thinking' | 'celebration' | 'encouraging'
  ) => void
  hideMascot: () => void
}

export const useCelebration = create<CelebrationState>((set) => ({
  // Achievement
  unlockedAchievement: null,
  showAchievementModal: (achievement) =>
    set({ unlockedAchievement: achievement }),
  hideAchievementModal: () => set({ unlockedAchievement: null }),

  // Level Up
  newLevel: null,
  showLevelUpModal: (level) => set({ newLevel: level }),
  hideLevelUpModal: () => set({ newLevel: null }),

  // Mascot
  mascotMessage: null,
  mascotMood: 'happy',
  showMascot: (message, mood = 'happy') =>
    set({ mascotMessage: message, mascotMood: mood }),
  hideMascot: () => set({ mascotMessage: null }),
}))
