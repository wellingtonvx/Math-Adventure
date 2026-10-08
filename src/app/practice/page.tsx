'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppTemplate } from '@/shared/components/templates'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { BackButton } from '@/shared/components/atoms/BackButton'
import { Card } from '@/shared/components/atoms/Card'
import { Badge } from '@/shared/components/atoms/Badge'
import { Icon } from '@/shared/components/atoms/Icon'
import { useLearningStore } from '@/domains/learning/presentation/stores/useLearningStore'
import { Lock, Star } from 'lucide-react'

export default function PracticePage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { progress } = useLearningStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSelectPhase = (phaseId: string, isLocked: boolean) => {
    if (!isLocked) {
      router.push(`/learn/practice?phase=${phaseId}`)
    }
  }

  // Agrupa fases por operação
  const operations = [
    {
      id: 'addition',
      name: '🏰 Reino das Somas',
      color: 'blue',
      phases: progress.phases.filter((p) => p.operation === 'addition'),
    },
    {
      id: 'subtraction',
      name: '🌳 Floresta das Subtrações',
      color: 'green',
      phases: progress.phases.filter((p) => p.operation === 'subtraction'),
    },
    {
      id: 'multiplication',
      name: '🏴‍☠️ Ilha da Multiplicação',
      color: 'purple',
      phases: progress.phases.filter((p) => p.operation === 'multiplication'),
    },
    {
      id: 'division',
      name: '🚀 Planeta da Divisão',
      color: 'orange',
      phases: progress.phases.filter((p) => p.operation === 'division'),
    },
  ]

  // Renderiza placeholder durante SSR
  if (!mounted) {
    return (
      <AppTemplate>
        <div className="space-y-6">
          <BackButton to="/" />
          <div className="text-center space-y-2">
            <Heading level={1}>Modo Prática</Heading>
            <Text size="lg" color="secondary">
              Escolha uma fase e comece a praticar!
            </Text>
          </div>
          <div className="space-y-4">
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
          <Heading level={1}>Modo Prática</Heading>
          <Text size="lg" color="secondary">
            Escolha uma fase e comece a praticar!
          </Text>
        </div>

        {/* Lista de operações */}
        {operations.map((operation) => {
          // Só mostra operações que têm fases
          if (operation.phases.length === 0) return null

          return (
            <div key={operation.id} className="space-y-3">
              <Heading level={3}>{operation.name}</Heading>

              {/* Lista de fases */}
              <div className="grid gap-3">
                {operation.phases.map((phase) => (
                  <Card
                    key={phase.id}
                    padding="md"
                    interactive={!phase.isLocked}
                    onClick={() => handleSelectPhase(phase.id, phase.isLocked)}
                    className={`${
                      phase.isLocked ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Info da fase */}
                      <div className="flex items-center gap-3">
                        {phase.isLocked ? (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Icon icon={Lock} size="sm" color="#9ca3af" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Text size="lg">{phase.emoji}</Text>
                          </div>
                        )}

                        <div>
                          <Text weight="semibold">{phase.name}</Text>
                          <Text size="sm" color="secondary">
                            {phase.questionsCount} questões • {phase.difficulty}
                          </Text>
                        </div>
                      </div>

                      {/* Status da fase */}
                      <div className="flex items-center gap-2">
                        {phase.isCompleted && (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: phase.stars }).map((_, i) => (
                              <Icon
                                key={i}
                                icon={Star}
                                size="sm"
                                color="#fbbf24"
                                fill="#fbbf24"
                              />
                            ))}
                          </div>
                        )}

                        {!phase.isLocked && !phase.isCompleted && (
                          <Badge variant="primary">Nova</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </AppTemplate>
  )
}
