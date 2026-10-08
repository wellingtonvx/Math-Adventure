'use client'

import { useState, useEffect } from 'react'
import { Map, Lock } from 'lucide-react'
import { Card } from '../atoms/Card'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'

export function JourneyPreview() {
  const [mounted, setMounted] = useState(false)

  // Só renderiza após montar no cliente (evita hydration error)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Renderiza placeholder durante SSR
  if (!mounted) {
    return (
      <Card padding="lg" className="border-2 border-blue-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Icon icon={Map} size="lg" color="#3b82f6" />
            <Heading level={3}>Sua Jornada</Heading>
          </div>
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </Card>
    )
  }

  return (
    <Card padding="lg" className="border-2 border-blue-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Icon icon={Map} size="lg" color="#3b82f6" />
          <Heading level={3}>Sua Jornada</Heading>
        </div>

        {/* Descrição */}
        <Text color="secondary">
          Explore mundos incríveis e aprenda matemática se divertindo!
        </Text>

        {/* Mundos Preview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <Text size="lg" weight="bold">
              🏰
            </Text>
            <Text size="sm" weight="medium" className="mt-1">
              Reino das Somas
            </Text>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-center opacity-50">
            <Icon icon={Lock} size="sm" color="#9ca3af" className="mx-auto" />
            <Text size="sm" weight="medium" color="tertiary" className="mt-1">
              Em breve
            </Text>
          </div>
        </div>

        {/* Botão */}
        <Button variant="primary" fullWidth size="lg">
          Ver Jornada
        </Button>
      </div>
    </Card>
  )
}
