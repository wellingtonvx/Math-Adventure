import { MissionDefinition } from '../types/missions'

/**
 * Definições de todos os tipos de missões diárias
 */
export const missionDefinitions: MissionDefinition[] = [
  {
    type: 'answer_questions',
    difficulties: {
      easy: {
        title: 'Prática Diária',
        description: 'Responda 5 questões',
        icon: '📝',
        target: 5,
        reward: { xp: 20, coins: 10 },
      },
      medium: {
        title: 'Sessão de Estudos',
        description: 'Responda 15 questões',
        icon: '📖',
        target: 15,
        reward: { xp: 50, coins: 25 },
      },
      hard: {
        title: 'Maratona Matemática',
        description: 'Responda 30 questões',
        icon: '🎯',
        target: 30,
        reward: { xp: 100, coins: 50 },
      },
    },
  },
  {
    type: 'correct_streak',
    difficulties: {
      easy: {
        title: 'Acertos Seguidos',
        description: 'Acerte 3 questões seguidas',
        icon: '✅',
        target: 3,
        reward: { xp: 30, coins: 15 },
      },
      medium: {
        title: 'Sequência Perfeita',
        description: 'Acerte 5 questões seguidas',
        icon: '🎪',
        target: 5,
        reward: { xp: 60, coins: 30 },
      },
      hard: {
        title: 'Combo Incrível',
        description: 'Acerte 10 questões seguidas',
        icon: '🔥',
        target: 10,
        reward: { xp: 120, coins: 60 },
      },
    },
  },
  {
    type: 'complete_phase',
    difficulties: {
      easy: {
        title: 'Explorador',
        description: 'Complete 1 fase',
        icon: '🗺️',
        target: 1,
        reward: { xp: 40, coins: 20 },
      },
      medium: {
        title: 'Aventureiro',
        description: 'Complete 2 fases',
        icon: '⚔️',
        target: 2,
        reward: { xp: 80, coins: 40 },
      },
      hard: {
        title: 'Desbravador',
        description: 'Complete 3 fases',
        icon: '🏆',
        target: 3,
        reward: { xp: 150, coins: 75 },
      },
    },
  },
  {
    type: 'earn_xp',
    difficulties: {
      easy: {
        title: 'Ganhador de XP',
        description: 'Ganhe 50 XP',
        icon: '⭐',
        target: 50,
        reward: { xp: 25, coins: 15 },
      },
      medium: {
        title: 'Caçador de XP',
        description: 'Ganhe 150 XP',
        icon: '🌟',
        target: 150,
        reward: { xp: 50, coins: 30 },
      },
      hard: {
        title: 'Mestre do XP',
        description: 'Ganhe 300 XP',
        icon: '✨',
        target: 300,
        reward: { xp: 100, coins: 50 },
      },
    },
  },
  {
    type: 'practice_operation',
    difficulties: {
      easy: {
        title: 'Prática Focada',
        description: 'Complete 5 questões de uma operação específica',
        icon: '🎓',
        target: 5,
        reward: { xp: 30, coins: 15 },
      },
      medium: {
        title: 'Especialização',
        description: 'Complete 10 questões de uma operação específica',
        icon: '📐',
        target: 10,
        reward: { xp: 60, coins: 30 },
      },
      hard: {
        title: 'Domínio Total',
        description: 'Complete 20 questões de uma operação específica',
        icon: '🧮',
        target: 20,
        reward: { xp: 120, coins: 60 },
      },
    },
  },
]
