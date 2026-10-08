'use client'

import { useState, useEffect } from 'react'
import { AppTemplate } from '@/shared/components/templates'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { BackButton } from '@/shared/components/atoms/BackButton'
import { MissionCard } from '@/shared/components/molecules/MissionCard'
import { useProgressStore } from '@/domains/progress/presentation/stores/useProgressStore'
import { MissionService } from '@/domains/progress/domain/services/MissionService'

export default function MissionsPage() {
  const [mounted, setMounted] = useState(false)
  const { dailyMissions, claimMissionReward } = useProgressStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = MissionService.getMissionStats(dailyMissions)
  const unclaimedRewards =
    MissionService.getTotalUnclaimedRewards(dailyMissions)

  // Calcula tempo restante até expirar
  const getTimeRemaining = () => {
    if (!mounted || dailyMissions.length === 0) return ''

    const now = new Date()
    const expiresAt = new Date(dailyMissions[0].expiresAt)
    const diff = expiresAt.getTime() - now.getTime()

    if (diff <= 0) return 'Expirado'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  // Renderiza placeholder durante SSR
  if (!mounted) {
    return (
      <AppTemplate>
        <div className="space-y-6">
          <BackButton to="/" />
          <div className="text-center space-y-2">
            <Heading level={1}>🎯 Missões Diárias</Heading>
            <Text size="lg" color="secondary">
              Complete missões e ganhe recompensas extras!
            </Text>
          </div>
          <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
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
          <Heading level={1}>🎯 Missões Diárias</Heading>
          <Text size="lg" color="secondary">
            Complete missões e ganhe recompensas extras!
          </Text>
        </div>

        {/* Progresso geral */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Text size="sm" className="text-white opacity-90">
                Missões Concluídas
              </Text>
              <Heading level={2} className="text-white">
                {stats.completed}/{stats.total}
              </Heading>
            </div>
            <div className="text-5xl">⏱️</div>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Text size="xs" className="text-white opacity-90">
              {stats.percentage}% completo
            </Text>
            <Text size="xs" className="text-white opacity-90">
              ⏰ Renova em: {getTimeRemaining()}
            </Text>
          </div>
        </div>

        {/* Recompensas não reivindicadas */}
        {stats.unclaimed > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <Text size="base" weight="bold" className="mb-1">
                  🎁 Recompensas Disponíveis
                </Text>
                <Text size="sm" color="secondary">
                  {stats.unclaimed} {stats.unclaimed === 1 ? 'missão' : 'missões'}{' '}
                  completa
                  {stats.unclaimed === 1 ? '' : 's'}!
                </Text>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span>⭐</span>
                  <Text size="sm" weight="bold">
                    +{unclaimedRewards.xp} XP
                  </Text>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span>🪙</span>
                  <Text size="sm" weight="bold">
                    +{unclaimedRewards.coins}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de missões */}
        <div className="space-y-4">
          <Text size="base" weight="bold">
            Missões de Hoje
          </Text>
          {dailyMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onClaim={claimMissionReward}
            />
          ))}
        </div>

        {/* Informação sobre renovação */}
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <Text size="sm" color="secondary">
            💡 As missões renovam automaticamente todo dia às 00:00
          </Text>
        </div>
      </div>
    </AppTemplate>
  )
}
