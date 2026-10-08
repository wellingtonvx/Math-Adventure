'use client'

import { useState, useEffect } from 'react'
import { AppTemplate } from '@/shared/components/templates'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { BackButton } from '@/shared/components/atoms/BackButton'
import { AchievementCard } from '@/shared/components/molecules/AchievementCard'
import { useProgressStore } from '@/domains/progress/presentation/stores/useProgressStore'
import { AchievementService } from '@/domains/progress/domain/services/AchievementService'
import { AchievementCategory } from '@/domains/progress/domain/types/achievements'

const categories: { id: AchievementCategory; label: string; icon: string }[] = [
  { id: 'learning', label: 'Aprendizado', icon: '📚' },
  { id: 'streak', label: 'Consistência', icon: '🔥' },
  { id: 'mastery', label: 'Maestria', icon: '🎯' },
  { id: 'exploration', label: 'Exploração', icon: '🗺️' },
  { id: 'progress', label: 'Progresso', icon: '⬆️' },
]

export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false)
  const { achievements } = useProgressStore()
  const [selectedCategory, setSelectedCategory] =
    useState<AchievementCategory | 'all'>('all')

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = AchievementService.getAchievementProgress(achievements)

  const filteredAchievements =
    selectedCategory === 'all'
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory)

  const unlockedCount = filteredAchievements.filter((a) => a.unlockedAt).length

  // Renderiza placeholder durante SSR
  if (!mounted) {
    return (
      <AppTemplate>
        <div className="space-y-6">
          <BackButton to="/" />
          <div className="text-center space-y-2">
            <Heading level={1}>🏆 Conquistas</Heading>
            <Text size="lg" color="secondary">
              Desbloqueie conquistas e ganhe recompensas!
            </Text>
          </div>
          <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </AppTemplate>
    )
  }

  return (
    <AppTemplate>
      <div className="space-y-6">
        {/* Botão Voltar */}
        <BackButton to="/" />

        {/* Header */}
        <div className="text-center space-y-2">
          <Heading level={1}>🏆 Conquistas</Heading>
          <Text size="lg" color="secondary">
            Desbloqueie conquistas e ganhe recompensas!
          </Text>
        </div>

        {/* Progresso geral */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Text size="sm" className="text-white opacity-90">
                Progresso Total
              </Text>
              <Heading level={2} className="text-white">
                {stats.unlocked}/{stats.total}
              </Heading>
            </div>
            <div className="text-5xl">🎖️</div>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <Text size="xs" className="text-white opacity-90 mt-2">
            {stats.percentage}% completo
          </Text>
        </div>

        {/* Estatísticas por tier */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-yellow-50 border-2 border-yellow-700 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">🥉</div>
            <Text size="sm" weight="semibold">
              Bronze
            </Text>
            <Text size="xs" color="secondary">
              {stats.byTier.bronze.unlocked}/{stats.byTier.bronze.total}
            </Text>
          </div>
          <div className="bg-gray-50 border-2 border-gray-400 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">🥈</div>
            <Text size="sm" weight="semibold">
              Prata
            </Text>
            <Text size="xs" color="secondary">
              {stats.byTier.silver.unlocked}/{stats.byTier.silver.total}
            </Text>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">🥇</div>
            <Text size="sm" weight="semibold">
              Ouro
            </Text>
            <Text size="xs" color="secondary">
              {stats.byTier.gold.unlocked}/{stats.byTier.gold.total}
            </Text>
          </div>
          <div className="bg-purple-50 border-2 border-purple-500 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">💎</div>
            <Text size="sm" weight="semibold">
              Platina
            </Text>
            <Text size="xs" color="secondary">
              {stats.byTier.platinum.unlocked}/{stats.byTier.platinum.total}
            </Text>
          </div>
        </div>

        {/* Filtros por categoria */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
              ${
                selectedCategory === 'all'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            🌟 Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${
                  selectedCategory === cat.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Contador da categoria */}
        <Text size="sm" color="secondary">
          {unlockedCount} de {filteredAchievements.length} desbloqueadas
        </Text>

        {/* Grid de conquistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </AppTemplate>
  )
}
