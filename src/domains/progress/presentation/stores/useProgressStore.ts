import { create } from 'zustand'
import { ProgressStore, AchievementStats, Achievement } from '../../domain/types'
import { LevelSystem } from '../../domain/entities/LevelSystem'
import { StreakSystem } from '../../domain/entities/StreakSystem'
import { AchievementService } from '../../domain/services/AchievementService'
import { MissionService } from '../../domain/services/MissionService'
import { progressRepository } from '../../infrastructure/repositories/ProgressRepository'

const initialState = {
  xp: 0,
  level: 1,
  coins: 0,
  totalCoinsEarned: 0,
  streak: 0,
  maxStreak: 0,
  lastPlayedDate: null,
  achievements: AchievementService.createAllAchievements(),
  dailyMissions: MissionService.generateDailyMissions(3),
  lastMissionRefresh: new Date().toISOString(),
  stats: {
    totalPlayDays: 0,
    perfectPhasesCount: 0,
  },
  createdAt: new Date().toISOString(),
  lastUpdatedAt: new Date().toISOString(),
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...initialState,

  // Adiciona XP e verifica level up
  addXP: (amount: number) => {
    const oldLevel = get().level

    set((state) => {
      const newXP = state.xp + amount
      const newLevel = LevelSystem.getLevelFromXP(newXP)

      const updated = {
        xp: newXP,
        level: newLevel,
        lastUpdatedAt: new Date().toISOString(),
      }

      const newState = { ...state, ...updated }
      progressRepository.save(newState)

      return updated
    })

    // Dispara celebração de level up
    const newLevel = get().level
    if (newLevel > oldLevel && typeof window !== 'undefined') {
      // Importação dinâmica para evitar erro de server-side
      import('@/shared/hooks/useCelebration').then(({ useCelebration }) => {
        useCelebration.getState().showLevelUpModal(newLevel)
      })
    }

    // Verifica conquistas após adicionar XP
    get().checkAchievements()
  },

  // Retorna XP necessário para o próximo nível
  getXPForNextLevel: () => {
    const state = get()
    return LevelSystem.getXPToNextLevel(state.xp, state.level)
  },

  // Adiciona moedas
  addCoins: (amount: number) => {
    set((state) => {
      const updated = {
        coins: state.coins + amount,
        totalCoinsEarned: state.totalCoinsEarned + amount,
        lastUpdatedAt: new Date().toISOString(),
      }

      const newState = { ...state, ...updated }
      progressRepository.save(newState)

      return updated
    })

    // Verifica conquistas após adicionar moedas
    get().checkAchievements()
  },

  // Gasta moedas (retorna true se tinha moedas suficientes)
  spendCoins: (amount: number) => {
    const state = get()

    if (state.coins < amount) {
      return false
    }

    set((state) => {
      const updated = {
        coins: state.coins - amount,
        lastUpdatedAt: new Date().toISOString(),
      }

      const newState = { ...state, ...updated }
      progressRepository.save(newState)

      return updated
    })

    return true
  },

  // Atualiza streak
  updateStreak: () => {
    set((state) => {
      const { newStreak, lastPlayedDate } = StreakSystem.updateStreak(
        state.lastPlayedDate,
        state.streak
      )

      // Atualiza max streak se necessário
      const maxStreak = Math.max(state.maxStreak, newStreak)

      // Incrementa dias jogados se for um novo dia
      const isNewDay = state.lastPlayedDate !== lastPlayedDate
      const totalPlayDays = isNewDay
        ? state.stats.totalPlayDays + 1
        : state.stats.totalPlayDays

      const updated = {
        streak: newStreak,
        maxStreak,
        lastPlayedDate: lastPlayedDate,
        stats: {
          ...state.stats,
          totalPlayDays,
        },
        lastUpdatedAt: new Date().toISOString(),
      }

      const newState = { ...state, ...updated }
      progressRepository.save(newState)

      return updated
    })

    // Verifica conquistas após atualizar streak
    get().checkAchievements()

    // Atualiza missões diárias se necessário
    get().refreshDailyMissions()
  },

  // Verifica e atualiza conquistas
  checkAchievements: (learningStats?: any): Achievement[] => {
    const state = get()
    const baseStats = get().getAchievementStats()

    // Mescla com estatísticas de aprendizado se fornecidas
    const stats: AchievementStats = {
      ...baseStats,
      ...(learningStats && {
        totalQuestionsAnswered: learningStats.totalQuestionsAnswered || 0,
        totalCorrect: learningStats.totalCorrect || 0,
        totalWrong: learningStats.totalWrong || 0,
        additionCompleted: learningStats.additionCompleted || 0,
        subtractionCompleted: learningStats.subtractionCompleted || 0,
        multiplicationCompleted: learningStats.multiplicationCompleted || 0,
        divisionCompleted: learningStats.divisionCompleted || 0,
        totalPhasesCompleted: learningStats.totalPhasesCompleted || 0,
      }),
    }

    const { updated, newlyUnlocked } =
      AchievementService.checkAndUpdateAchievements(state.achievements, stats)

    if (newlyUnlocked.length > 0) {
      // Adiciona recompensas das novas conquistas
      const totalRewards = AchievementService.calculateTotalRewards(newlyUnlocked)

      set((state) => {
        const newState = {
          achievements: updated,
          xp: state.xp + totalRewards.xp,
          coins: state.coins + totalRewards.coins,
          totalCoinsEarned: state.totalCoinsEarned + totalRewards.coins,
          level: LevelSystem.getLevelFromXP(state.xp + totalRewards.xp),
          lastUpdatedAt: new Date().toISOString(),
        }

        progressRepository.save({ ...state, ...newState })
        return newState
      })

      // Dispara celebração da primeira conquista desbloqueada
      if (typeof window !== 'undefined' && newlyUnlocked[0]) {
        import('@/shared/hooks/useCelebration').then(({ useCelebration }) => {
          useCelebration.getState().showAchievementModal(newlyUnlocked[0])
        })
      }
    } else if (updated !== state.achievements) {
      set({ achievements: updated })
      progressRepository.save({ ...state, achievements: updated })
    }

    return newlyUnlocked
  },

  // Retorna estatísticas para verificação de conquistas
  getAchievementStats: (): AchievementStats => {
    const state = get()

    return {
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      totalWrong: 0,
      currentStreak: state.streak,
      maxStreak: state.maxStreak,
      currentLevel: state.level,
      totalXP: state.xp,
      totalCoins: state.totalCoinsEarned,
      additionCompleted: 0,
      subtractionCompleted: 0,
      multiplicationCompleted: 0,
      divisionCompleted: 0,
      totalPhasesCompleted: 0,
      perfectPhases: state.stats.perfectPhasesCount,
      totalPlayDays: state.stats.totalPlayDays,
      consecutiveDays: state.streak,
    }
  },

  // Atualiza missões diárias (gera novas se expiraram)
  refreshDailyMissions: () => {
    const state = get()

    if (MissionService.haveMissionsExpired(state.dailyMissions)) {
      const newMissions = MissionService.generateDailyMissions(3)

      set({
        dailyMissions: newMissions,
        lastMissionRefresh: new Date().toISOString(),
      })

      progressRepository.save({
        ...state,
        dailyMissions: newMissions,
        lastMissionRefresh: new Date().toISOString(),
      })
    }
  },

  // Atualiza progresso de uma missão
  updateMissionProgress: (
    missionId: string,
    type: string,
    amount: number
  ) => {
    set((state) => {
      const updatedMissions = state.dailyMissions.map((mission) => {
        if (mission.id === missionId || mission.type === type) {
          return MissionService.updateMissionProgress(mission, amount)
        }
        return mission
      })

      const newState = {
        dailyMissions: updatedMissions,
        lastUpdatedAt: new Date().toISOString(),
      }

      progressRepository.save({ ...state, ...newState })
      return newState
    })
  },

  // Reivindica recompensa de uma missão
  claimMissionReward: (missionId: string) => {
    const state = get()
    const mission = state.dailyMissions.find((m) => m.id === missionId)

    if (!mission || !MissionService.canClaimReward(mission)) {
      return
    }

    set((state) => {
      const updatedMissions = state.dailyMissions.map((m) =>
        m.id === missionId ? MissionService.claimMissionReward(m) : m
      )

      const newState = {
        dailyMissions: updatedMissions,
        xp: state.xp + mission.reward.xp,
        coins: state.coins + mission.reward.coins,
        totalCoinsEarned: state.totalCoinsEarned + mission.reward.coins,
        level: LevelSystem.getLevelFromXP(state.xp + mission.reward.xp),
        lastUpdatedAt: new Date().toISOString(),
      }

      progressRepository.save({ ...state, ...newState })
      return newState
    })

    // Verifica conquistas após reivindicar recompensa
    get().checkAchievements()
  },

  // Reset completo do progresso
  resetProgress: () => {
    set(initialState)
    progressRepository.clear()
  },
}))

// Carrega progresso salvo ao inicializar
if (typeof window !== 'undefined') {
  progressRepository.load().then((savedProgress) => {
    if (savedProgress) {
      // Garante que existem conquistas e missões
      const stateToLoad = {
        ...savedProgress,
        achievements:
          savedProgress.achievements ||
          AchievementService.createAllAchievements(),
        dailyMissions:
          savedProgress.dailyMissions ||
          MissionService.generateDailyMissions(3),
        lastMissionRefresh:
          savedProgress.lastMissionRefresh || new Date().toISOString(),
        totalCoinsEarned: savedProgress.totalCoinsEarned || savedProgress.coins || 0,
        maxStreak: savedProgress.maxStreak || savedProgress.streak || 0,
        stats: savedProgress.stats || {
          totalPlayDays: 0,
          perfectPhasesCount: 0,
        },
      }

      useProgressStore.setState(stateToLoad)
      // Atualiza o streak ao carregar
      useProgressStore.getState().updateStreak()
      // Verifica conquistas ao carregar
      useProgressStore.getState().checkAchievements()
    }
  })
}
