import { StorageProvider } from './StorageProvider'

/**
 * Implementação de StorageProvider usando LocalStorage
 * Primeira versão do MVP - funcionamento offline sem login
 */
export class LocalStorageProvider implements StorageProvider {
  private prefix = 'math-adventure:'

  /**
   * Adiciona prefixo à chave para evitar conflitos
   */
  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  /**
   * Verifica se está no ambiente do navegador
   */
  private isClient(): boolean {
    return typeof window !== 'undefined'
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    if (!this.isClient()) return

    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(this.getKey(key), serialized)
    } catch (error) {
      console.error(`Erro ao salvar no localStorage: ${key}`, error)
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    if (!this.isClient()) return null

    try {
      const item = localStorage.getItem(this.getKey(key))
      if (!item) return null
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Erro ao ler do localStorage: ${key}`, error)
      return null
    }
  }

  async removeItem(key: string): Promise<void> {
    if (!this.isClient()) return

    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.error(`Erro ao remover do localStorage: ${key}`, error)
    }
  }

  async clear(): Promise<void> {
    if (!this.isClient()) return

    try {
      // Remove apenas as chaves do app
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Erro ao limpar localStorage', error)
    }
  }

  async hasItem(key: string): Promise<boolean> {
    if (!this.isClient()) return false

    try {
      return localStorage.getItem(this.getKey(key)) !== null
    } catch (error) {
      console.error(`Erro ao verificar item no localStorage: ${key}`, error)
      return false
    }
  }
}

// Singleton - instância única compartilhada
export const localStorageProvider = new LocalStorageProvider()
