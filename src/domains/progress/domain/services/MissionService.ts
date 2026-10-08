import { DailyMission, MissionDifficulty } from '../types/missions'
import { missionDefinitions } from '../data/missionDefinitions'

/**
 * Serviço para gerenciar missões diárias
 */
export class MissionService {
  /**
   * Gera missões diárias aleatórias
   */
  static generateDailyMissions(count: number = 3): DailyMission[] {
    const missions: DailyMission[] = []
    const usedTypes = new Set<string>()

    // Embaralha as definições
    const shuffled = [...missionDefinitions].sort(() => Math.random() - 0.5)

    for (const definition of shuffled) {
      if (missions.length >= count) break
      if (usedTypes.has(definition.type)) continue

      // Escolhe dificuldade aleatória
      const difficulties: MissionDifficulty[] = ['easy', 'medium', 'hard']
      const difficulty =
        difficulties[Math.floor(Math.random() * difficulties.length)]

      const config = definition.difficulties[difficulty]

      const mission: DailyMission = {
        id: `${definition.type}_${difficulty}_${Date.now()}`,
        title: config.title,
        description: config.description,
        icon: config.icon,
        type: definition.type,
        difficulty,
        target: config.target,
        progress: 0,
        reward: config.reward,
        completed: false,
        claimedAt: null,
        expiresAt: this.getEndOfDay(),
      }

      missions.push(mission)
      usedTypes.add(definition.type)
    }

    return missions
  }

  /**
   * Verifica se as missões expiraram (novo dia)
   */
  static haveMissionsExpired(missions: DailyMission[]): boolean {
    if (missions.length === 0) return true

    const now = new Date()
    const expiresAt = new Date(missions[0].expiresAt)

    return now > expiresAt
  }

  /**
   * Atualiza progresso de uma missão
   */
  static updateMissionProgress(
    mission: DailyMission,
    increment: number
  ): DailyMission {
    const newProgress = Math.min(mission.progress + increment, mission.target)
    const completed = newProgress >= mission.target

    return {
      ...mission,
      progress: newProgress,
      completed,
    }
  }

  /**
   * Reivindica recompensa de uma missão
   */
  static claimMissionReward(mission: DailyMission): DailyMission {
    if (!mission.completed || mission.claimedAt) {
      return mission
    }

    return {
      ...mission,
      claimedAt: new Date().toISOString(),
    }
  }

  /**
   * Calcula estatísticas das missões
   */
  static getMissionStats(missions: DailyMission[]): {
    total: number
    completed: number
    claimed: number
    unclaimed: number
    percentage: number
  } {
    const total = missions.length
    const completed = missions.filter((m) => m.completed).length
    const claimed = missions.filter((m) => m.claimedAt).length
    const unclaimed = completed - claimed

    return {
      total,
      completed,
      claimed,
      unclaimed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  }

  /**
   * Retorna o final do dia atual (23:59:59)
   */
  private static getEndOfDay(): string {
    const now = new Date()
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    )
    return endOfDay.toISOString()
  }

  /**
   * Verifica se uma missão está disponível para reivindicar
   */
  static canClaimReward(mission: DailyMission): boolean {
    return mission.completed && !mission.claimedAt
  }

  /**
   * Retorna total de recompensas disponíveis para reivindicar
   */
  static getTotalUnclaimedRewards(missions: DailyMission[]): {
    xp: number
    coins: number
  } {
    return missions
      .filter((m) => this.canClaimReward(m))
      .reduce(
        (acc, mission) => ({
          xp: acc.xp + mission.reward.xp,
          coins: acc.coins + mission.reward.coins,
        }),
        { xp: 0, coins: 0 }
      )
  }
}
