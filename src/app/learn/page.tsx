'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppTemplate } from '@/shared/components/templates'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { Button } from '@/shared/components/atoms/Button'
import { BackButton } from '@/shared/components/atoms/BackButton'
import { useLearningStore } from '@/domains/learning/presentation/stores/useLearningStore'
import { PhaseSelector } from '@/domains/learning/presentation/components/PhaseSelector'

export default function LearnPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { progress } = useLearningStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Separa fases por operação
  const additionPhases = progress.phases.filter((p) => p.operation === 'addition')
  const subtractionPhases = progress.phases.filter(
    (p) => p.operation === 'subtraction'
  )
  const multiplicationPhases = progress.phases.filter(
    (p) => p.operation === 'multiplication'
  )
  const divisionPhases = progress.phases.filter((p) => p.operation === 'division')

  const handleSelectPhase = (phaseId: string) => {
    router.push(`/learn/practice?phase=${phaseId}`)
  }

  const handleVisualMode = (
    operation: 'addition' | 'subtraction' | 'multiplication' | 'division' = 'addition'
  ) => {
    router.push(`/learn/visual?operation=${operation}`)
  }

  // Renderiza placeholder durante SSR
  if (!mounted) {
    return (
      <AppTemplate>
        <div className="space-y-6">
          <BackButton to="/" />
          <div className="text-center space-y-2">
            <Heading level={1}>Aprender Matemática</Heading>
            <Text size="lg" color="secondary">
              Escolha um mundo e comece sua jornada!
            </Text>
          </div>
          <div className="space-y-4">
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
          <Heading level={1}>Aprender Matemática</Heading>
          <Text size="lg" color="secondary">
            Escolha um mundo e comece sua jornada!
          </Text>
        </div>


        {/* Reino das Somas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Heading level={2}>🏰 Reino das Somas</Heading>
              <Text size="sm" color="secondary" className="mt-1">
                Aprenda a somar de forma divertida!
              </Text>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleVisualMode('addition')}
            >
              Ver Exemplos
            </Button>
          </div>
          <PhaseSelector
            phases={additionPhases}
            onSelectPhase={handleSelectPhase}
          />
        </div>

        {/* Floresta das Subtrações */}
        {subtractionPhases.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Heading level={2}>🌳 Floresta das Subtrações</Heading>
                <Text size="sm" color="secondary" className="mt-1">
                  Aprenda a subtrair removendo elementos!
                </Text>
              </div>
              <Button
                variant="success"
                size="sm"
                onClick={() => handleVisualMode('subtraction')}
              >
                Ver Exemplos
              </Button>
            </div>
            <PhaseSelector
              phases={subtractionPhases}
              onSelectPhase={handleSelectPhase}
            />
          </div>
        )}

        {/* Ilha da Multiplicação */}
        {multiplicationPhases.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Heading level={2}>🏴‍☠️ Ilha da Multiplicação</Heading>
                <Text size="sm" color="secondary" className="mt-1">
                  Aprenda as tabuadas com grupos de elementos!
                </Text>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleVisualMode('multiplication')}
              >
                Ver Exemplos
              </Button>
            </div>
            <PhaseSelector
              phases={multiplicationPhases}
              onSelectPhase={handleSelectPhase}
            />
          </div>
        )}

        {/* Planeta da Divisão */}
        {divisionPhases.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Heading level={2}>🚀 Planeta da Divisão</Heading>
                <Text size="sm" color="secondary" className="mt-1">
                  Aprenda a dividir distribuindo igualmente!
                </Text>
              </div>
              <Button
                variant="warning"
                size="sm"
                onClick={() => handleVisualMode('division')}
              >
                Ver Exemplos
              </Button>
            </div>
            <PhaseSelector
              phases={divisionPhases}
              onSelectPhase={handleSelectPhase}
            />
          </div>
        )}
      </div>
    </AppTemplate>
  )
}
