'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Target, CheckCircle, ChevronRight } from 'lucide-react'
import { Card } from '../atoms/Card'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { ProgressBar } from '../atoms/ProgressBar'
import { Button } from '../atoms/Button'
import { useProgressStore } from '@/domains/progress/presentation/stores/useProgressStore'
import { MissionService } from '@/domains/progress/domain/services/MissionService'

export function DailyMissionPreview() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { dailyMissions } = useProgressStore()

  // Só renderiza após montar no cliente (evita hydration error)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Renderiza placeholder durante SSR
  if (!mounted) {
    return (
      <Card padding="lg" className="border-2 border-purple-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Icon icon={Target} size="lg" color="#a855f7" />
            <Heading level={3}>Missões Diárias</Heading>
          </div>
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </Card>
    )
  }

  const stats = MissionService.getMissionStats(dailyMissions)
  const unclaimedRewards = MissionService.getTotalUnclaimedRewards(dailyMissions)

  // Mostra no máximo 2 missões no preview
  const previewMissions = dailyMissions.slice(0, 2)

  return (
    <Card padding="lg" className="border-2 border-purple-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon icon={Target} size="lg" color="#a855f7" />
            <Heading level={3}>Missões Diárias</Heading>
          </div>
          <Text size="sm" color="secondary">
            {stats.completed}/{stats.total}
          </Text>
        </div>

        {/* Recompensas não reivindicadas */}
        {stats.unclaimed > 0 && (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <Text size="sm" weight="semibold">
                  {stats.unclaimed} {stats.unclaimed === 1 ? 'recompensa' : 'recompensas'}
                </Text>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>⭐ +{unclaimedRewards.xp}</span>
                <span>🪙 +{unclaimedRewards.coins}</span>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Missões (preview) */}
        <div className="space-y-3">
          {previewMissions.map((mission) => (
            <div
              key={mission.id}
              className={`p-3 rounded-xl ${
                mission.completed ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{mission.icon}</span>
                  <Text size="sm" weight="medium">
                    {mission.title}
                  </Text>
                </div>
                {mission.completed && !mission.claimedAt && (
                  <span className="text-lg">✓</span>
                )}
                {mission.claimedAt && (
                  <Icon icon={CheckCircle} size="sm" color="#22c55e" />
                )}
              </div>
              {!mission.completed && (
                <ProgressBar
                  current={mission.progress}
                  max={mission.target}
                  color="success"
                  height="sm"
                />
              )}
            </div>
          ))}
        </div>

        {/* Mensagem de incentivo ou botão */}
        {stats.completed === stats.total ? (
          <div className="bg-green-100 text-green-700 rounded-xl p-3 text-center">
            <Text size="sm" weight="semibold">
              🎉 Todas as missões completas!
            </Text>
          </div>
        ) : (
          <Text size="sm" color="secondary" align="center">
            Continue jogando para completar suas missões!
          </Text>
        )}

        {/* Botão para ver todas */}
        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={() => router.push('/missions')}
        >
          <span className="flex items-center justify-center gap-2">
            Ver Todas as Missões
            <Icon icon={ChevronRight} size="sm" color="currentColor" />
          </span>
        </Button>
      </div>
    </Card>
  )
}
