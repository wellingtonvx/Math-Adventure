import { localStorageProvider } from '@/infrastructure/storage'
import { ProgressState } from '../../domain/types'

const STORAGE_KEY = 'player-progress'

export class ProgressRepository {
  /**
   * Salva o progresso no storage
   */
  async save(progress: ProgressState): Promise<void> {
    await localStorageProvider.setItem(STORAGE_KEY, progress)
  }

  /**
   * Carrega o progresso do storage
   */
  async load(): Promise<ProgressState | null> {
    return await localStorageProvider.getItem<ProgressState>(STORAGE_KEY)
  }

  /**
   * Remove o progresso do storage
   */
  async clear(): Promise<void> {
    await localStorageProvider.removeItem(STORAGE_KEY)
  }

  /**
   * Verifica se existe progresso salvo
   */
  async exists(): Promise<boolean> {
    return await localStorageProvider.hasItem(STORAGE_KEY)
  }
}

export const progressRepository = new ProgressRepository()
