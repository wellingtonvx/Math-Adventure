/**
 * Interface abstrata para persistência de dados
 * Permite migração futura para Supabase sem alterar regras de negócio
 */
export interface StorageProvider {
  /**
   * Salva um valor no storage
   */
  setItem<T>(key: string, value: T): Promise<void>

  /**
   * Recupera um valor do storage
   */
  getItem<T>(key: string): Promise<T | null>

  /**
   * Remove um valor do storage
   */
  removeItem(key: string): Promise<void>

  /**
   * Limpa todo o storage
   */
  clear(): Promise<void>

  /**
   * Verifica se uma chave existe
   */
  hasItem(key: string): Promise<boolean>
}
