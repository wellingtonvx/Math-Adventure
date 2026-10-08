/**
 * Mensagens contextuais do mascote
 */

export const mascotMessages = {
  // Primeira visita
  welcome: {
    message: 'Olá! Bem-vindo ao Math Adventure! Vamos aprender matemática brincando? 🎮',
    mood: 'excited' as const,
  },

  // Completou primeira questão
  firstQuestion: {
    message: 'Sua primeira resposta! Continue assim! 👏',
    mood: 'happy' as const,
  },

  // Acertou muitas seguidas
  streak3: {
    message: '3 acertos seguidos! Você está em chamas! 🔥',
    mood: 'excited' as const,
  },

  streak5: {
    message: '5 seguidos! Incrível! Continue assim! ⚡',
    mood: 'celebration' as const,
  },

  // Errou depois de acertos
  brokeStreak: {
    message: 'Tudo bem errar! Vamos tentar de novo? 💪',
    mood: 'encouraging' as const,
  },

  // Completou fase
  phaseComplete: {
    message: 'Parabéns! Você completou a fase! 🎉',
    mood: 'celebration' as const,
  },

  // Não passou na fase
  phaseFailed: {
    message: 'Quase lá! Vamos tentar de novo com mais atenção! 🎯',
    mood: 'encouraging' as const,
  },

  // Primeira conquista
  firstAchievement: {
    message: 'Sua primeira conquista! Muitas mais virão! 🏆',
    mood: 'celebration' as const,
  },

  // Completou missão
  missionComplete: {
    message: 'Missão completa! Não esqueça de resgatar sua recompensa! 🎁',
    mood: 'happy' as const,
  },

  // Todas missões do dia
  allMissionsComplete: {
    message: 'Todas as missões do dia completas! Você é incrível! 🌟',
    mood: 'celebration' as const,
  },

  // Voltou depois de um tempo
  welcomeBack: {
    message: 'Que bom te ver de novo! Vamos continuar? 😊',
    mood: 'happy' as const,
  },

  // Manteve streak
  streakMaintained: {
    message: 'Sequência mantida! Continue jogando todos os dias! 🔥',
    mood: 'excited' as const,
  },

  // Incentivo geral
  encouragement: [
    'Você consegue! 💪',
    'Está indo muito bem! 😊',
    'Continue assim! ⭐',
    'Você é demais! 🌟',
    'Acredite em você! 🚀',
  ],
}

/**
 * Retorna uma mensagem de incentivo aleatória
 */
export function getRandomEncouragement() {
  const messages = mascotMessages.encouragement
  return {
    message: messages[Math.floor(Math.random() * messages.length)],
    mood: 'happy' as const,
  }
}
