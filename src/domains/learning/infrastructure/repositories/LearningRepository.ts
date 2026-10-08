import { localStorageProvider } from '@/infrastructure/storage'
import { LearningProgress, Phase } from '../../domain/types'
import { PhaseEntity } from '../../domain/entities/Phase'

const STORAGE_KEY = 'learning-progress'

/**
 * Repository para persistir progresso de aprendizado
 */
export class LearningRepository {
  /**
   * Salva o progresso
   */
  async save(progress: LearningProgress): Promise<void> {
    await localStorageProvider.setItem(STORAGE_KEY, progress)
  }

  /**
   * Carrega o progresso
   */
  async load(): Promise<LearningProgress | null> {
    return await localStorageProvider.getItem<LearningProgress>(STORAGE_KEY)
  }

  /**
   * Limpa o progresso
   */
  async clear(): Promise<void> {
    await localStorageProvider.removeItem(STORAGE_KEY)
  }

  /**
   * Cria progresso inicial com fases do Reino das Somas e Floresta das Subtrações
   */
  createInitialProgress(): LearningProgress {
    const phases: Phase[] = [
      // ========== REINO DAS SOMAS 🏰 ==========

      // Fase 1: Somas até 5 (muito fácil)
      PhaseEntity.create(
        'addition-1',
        '🏰 Primeiros Passos',
        'Aprenda somas simples até 5',
        'addition',
        'easy',
        1,
        5,
        10,
        7, // precisa acertar 7 de 10
        50, // XP
        10, // Moedas
        false // primeira fase desbloqueada
      ),

      // Fase 2: Somas até 10
      PhaseEntity.create(
        'addition-2',
        '🏰 Crescendo',
        'Somas até 10',
        'addition',
        'medium',
        1,
        10,
        15,
        12, // precisa acertar 12 de 15
        100,
        20,
        true // bloqueada inicialmente
      ),

      // Fase 3: Somas até 20
      PhaseEntity.create(
        'addition-3',
        '🏰 Desafio das Somas',
        'Somas até 20',
        'addition',
        'hard',
        5,
        20,
        20,
        16, // precisa acertar 16 de 20
        200,
        50,
        true // bloqueada inicialmente
      ),

      // ========== FLORESTA DAS SUBTRAÇÕES 🌳 ==========

      // Fase 4: Subtrações até 5
      PhaseEntity.create(
        'subtraction-1',
        '🌳 Aprendendo a Tirar',
        'Subtrações simples até 5',
        'subtraction',
        'easy',
        1,
        5,
        10,
        7,
        50,
        10,
        false // primeira fase do reino desbloqueada
      ),

      // Fase 5: Subtrações até 10
      PhaseEntity.create(
        'subtraction-2',
        '🌳 Tirando Mais',
        'Subtrações até 10',
        'subtraction',
        'medium',
        1,
        10,
        15,
        12,
        100,
        20,
        true
      ),

      // Fase 6: Subtrações até 20
      PhaseEntity.create(
        'subtraction-3',
        '🌳 Mestre das Subtrações',
        'Subtrações até 20',
        'subtraction',
        'hard',
        5,
        20,
        20,
        16,
        200,
        50,
        true
      ),

      // ========== ILHA DA MULTIPLICAÇÃO 🏴‍☠️ ==========

      // Fase 7: Tabuada do 2
      PhaseEntity.create(
        'multiplication-1',
        '🏴‍☠️ Tabuada do 2',
        '10 exercícios: 2×1 até 2×10',
        'multiplication',
        'easy',
        1,
        2, // operand2 fixo em 2
        10, // 10 questões (2×1 até 2×10)
        8, // precisa acertar 8 de 10
        60,
        15,
        false // desbloqueada desde o início
      ),

      // Fase 8: Tabuada do 3
      PhaseEntity.create(
        'multiplication-2',
        '🏴‍☠️ Tabuada do 3',
        '10 exercícios: 3×1 até 3×10',
        'multiplication',
        'medium',
        1,
        3,
        10, // 10 questões (3×1 até 3×10)
        8, // precisa acertar 8 de 10
        80,
        20,
        true
      ),

      // Fase 9: Tabuada do 4
      PhaseEntity.create(
        'multiplication-3',
        '🏴‍☠️ Tabuada do 4',
        '10 exercícios: 4×1 até 4×10',
        'multiplication',
        'medium',
        1,
        4,
        10, // 10 questões (4×1 até 4×10)
        8, // precisa acertar 8 de 10
        100,
        25,
        true
      ),

      // Fase 10: Tabuada do 5
      PhaseEntity.create(
        'multiplication-4',
        '🏴‍☠️ Tabuada do 5',
        '10 exercícios: 5×1 até 5×10',
        'multiplication',
        'hard',
        1,
        5,
        10, // 10 questões (5×1 até 5×10)
        8, // precisa acertar 8 de 10
        120,
        30,
        true
      ),

      // Fase 11: Tabuada do 6
      PhaseEntity.create(
        'multiplication-5',
        '🏴‍☠️ Tabuada do 6',
        '10 exercícios: 6×1 até 6×10',
        'multiplication',
        'hard',
        1,
        6,
        10,
        8,
        140,
        35,
        true
      ),

      // Fase 12: Tabuada do 7
      PhaseEntity.create(
        'multiplication-6',
        '🏴‍☠️ Tabuada do 7',
        '10 exercícios: 7×1 até 7×10',
        'multiplication',
        'hard',
        1,
        7,
        10,
        8,
        160,
        40,
        true
      ),

      // Fase 13: Tabuada do 8
      PhaseEntity.create(
        'multiplication-7',
        '🏴‍☠️ Tabuada do 8',
        '10 exercícios: 8×1 até 8×10',
        'multiplication',
        'hard',
        1,
        8,
        10,
        8,
        180,
        45,
        true
      ),

      // Fase 14: Tabuada do 9
      PhaseEntity.create(
        'multiplication-8',
        '🏴‍☠️ Tabuada do 9',
        '10 exercícios: 9×1 até 9×10',
        'multiplication',
        'hard',
        1,
        9,
        10,
        8,
        200,
        50,
        true
      ),

      // Fase 15: Tabuada do 10
      PhaseEntity.create(
        'multiplication-9',
        '🏴‍☠️ Tabuada do 10',
        '10 exercícios: 10×1 até 10×10',
        'multiplication',
        'hard',
        1,
        10,
        10,
        8,
        220,
        55,
        true
      ),

      // ========== PLANETA DA DIVISÃO 🚀 ==========

      // Fase 16: Divisão por 2
      PhaseEntity.create(
        'division-1',
        '🚀 Dividindo por 2',
        '10 exercícios de divisão por 2',
        'division',
        'easy',
        1,
        2, // divisor fixo em 2
        10, // 10 questões (2÷2, 4÷2... 20÷2)
        8, // precisa acertar 8 de 10
        70,
        15,
        false // desbloqueada desde o início
      ),

      // Fase 17: Divisão por 3
      PhaseEntity.create(
        'division-2',
        '🚀 Dividindo por 3',
        '10 exercícios de divisão por 3',
        'division',
        'medium',
        1,
        3,
        10, // 10 questões (3÷3, 6÷3... 30÷3)
        8, // precisa acertar 8 de 10
        90,
        20,
        true
      ),

      // Fase 18: Divisão por 4
      PhaseEntity.create(
        'division-3',
        '🚀 Dividindo por 4',
        '10 exercícios de divisão por 4',
        'division',
        'medium',
        1,
        4,
        10, // 10 questões (4÷4, 8÷4... 40÷4)
        8, // precisa acertar 8 de 10
        110,
        25,
        true
      ),

      // Fase 19: Divisão por 5
      PhaseEntity.create(
        'division-4',
        '🚀 Dividindo por 5',
        '10 exercícios de divisão por 5',
        'division',
        'hard',
        1,
        5,
        10, // 10 questões (5÷5, 10÷5... 50÷5)
        8, // precisa acertar 8 de 10
        130,
        30,
        true
      ),

      // Fase 20: Divisão por 6
      PhaseEntity.create(
        'division-5',
        '🚀 Dividindo por 6',
        '10 exercícios de divisão por 6',
        'division',
        'hard',
        1,
        6,
        10,
        8,
        150,
        35,
        true
      ),

      // Fase 21: Divisão por 7
      PhaseEntity.create(
        'division-6',
        '🚀 Dividindo por 7',
        '10 exercícios de divisão por 7',
        'division',
        'hard',
        1,
        7,
        10,
        8,
        170,
        40,
        true
      ),

      // Fase 22: Divisão por 8
      PhaseEntity.create(
        'division-7',
        '🚀 Dividindo por 8',
        '10 exercícios de divisão por 8',
        'division',
        'hard',
        1,
        8,
        10,
        8,
        190,
        45,
        true
      ),

      // Fase 23: Divisão por 9
      PhaseEntity.create(
        'division-8',
        '🚀 Dividindo por 9',
        '10 exercícios de divisão por 9',
        'division',
        'hard',
        1,
        9,
        10,
        8,
        210,
        50,
        true
      ),

      // Fase 24: Divisão por 10
      PhaseEntity.create(
        'division-9',
        '🚀 Dividindo por 10',
        '10 exercícios de divisão por 10',
        'division',
        'hard',
        1,
        10,
        10,
        8,
        230,
        55,
        true
      ),
    ]

    return {
      phases,
      completedPhases: [],
      currentPhaseId: 'addition-1',
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      totalWrong: 0,
      lastPlayedAt: null,
    }
  }
}

export const learningRepository = new LearningRepository()
