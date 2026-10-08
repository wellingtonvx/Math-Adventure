import {
  Achievement,
  AchievementDefinition,
  AchievementStats,
} from '../types/achievements'
import { achievementDefinitions } from '../data/achievementDefinitions'

/**
 * Serviço para gerenciar conquistas
 */
export class AchievementService {
  /**
   * Cria uma conquista inicial (não desbloqueada)
   */
  static createInitialAchievement(
    definition: AchievementDefinition
  ): Achievement {
    return {
      id: definition.id,
      title: definition.title,
      description: definition.description,
      icon: definition.icon,
      category: definition.category,
      tier: definition.tier,
      requirement: definition.requirement,
      reward: definition.reward,
      unlockedAt: null,
      progress: 0,
    }
  }

  /**
   * Cria todas as conquistas iniciais
   */
  static createAllAchievements(): Achievement[] {
    return achievementDefinitions.map((def) =>
      this.createInitialAchievement(def)
    )
  }

  /**
   * Verifica e atualiza o progresso de todas as conquistas
   * Retorna as conquistas recém-desbloqueadas
   */
  static checkAndUpdateAchievements(
    achievements: Achievement[],
    stats: AchievementStats
  ): { updated: Achievement[]; newlyUnlocked: Achievement[] } {
    const updated: Achievement[] = []
    const newlyUnlocked: Achievement[] = []

    achievements.forEach((achievement) => {
      // Se já foi desbloqueada, pula
      if (achievement.unlockedAt) {
        updated.push(achievement)
        return
      }

      // Encontra a definição
      const definition = achievementDefinitions.find(
        (def) => def.id === achievement.id
      )

      if (!definition) {
        updated.push(achievement)
        return
      }

      // Calcula o progresso atual
      const currentProgress = definition.checkCondition(stats)

      // Atualiza o progresso
      const updatedAchievement: Achievement = {
        ...achievement,
        progress: Math.min(currentProgress, achievement.requirement),
      }

      // Verifica se foi desbloqueada
      if (currentProgress >= achievement.requirement) {
        updatedAchievement.unlockedAt = new Date().toISOString()
        newlyUnlocked.push(updatedAchievement)
      }

      updated.push(updatedAchievement)
    })

    return { updated, newlyUnlocked }
  }

  /**
   * Calcula o total de recompensas de conquistas desbloqueadas
   */
  static calculateTotalRewards(achievements: Achievement[]): {
    xp: number
    coins: number
  } {
    return achievements
      .filter((a) => a.unlockedAt)
      .reduce(
        (acc, achievement) => ({
          xp: acc.xp + achievement.reward.xp,
          coins: acc.coins + achievement.reward.coins,
        }),
        { xp: 0, coins: 0 }
      )
  }

  /**
   * Retorna estatísticas de conquistas
   */
  static getAchievementProgress(achievements: Achievement[]): {
    total: number
    unlocked: number
    percentage: number
    byTier: {
      bronze: { total: number; unlocked: number }
      silver: { total: number; unlocked: number }
      gold: { total: number; unlocked: number }
      platinum: { total: number; unlocked: number }
    }
  } {
    const total = achievements.length
    const unlocked = achievements.filter((a) => a.unlockedAt).length

    const byTier = {
      bronze: {
        total: achievements.filter((a) => a.tier === 'bronze').length,
        unlocked: achievements.filter(
          (a) => a.tier === 'bronze' && a.unlockedAt
        ).length,
      },
      silver: {
        total: achievements.filter((a) => a.tier === 'silver').length,
        unlocked: achievements.filter(
          (a) => a.tier === 'silver' && a.unlockedAt
        ).length,
      },
      gold: {
        total: achievements.filter((a) => a.tier === 'gold').length,
        unlocked: achievements.filter((a) => a.tier === 'gold' && a.unlockedAt)
          .length,
      },
      platinum: {
        total: achievements.filter((a) => a.tier === 'platinum').length,
        unlocked: achievements.filter(
          (a) => a.tier === 'platinum' && a.unlockedAt
        ).length,
      },
    }

    return {
      total,
      unlocked,
      percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0,
      byTier,
    }
  }
}
