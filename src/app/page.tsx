'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Gamepad2, Trophy, Target } from 'lucide-react'
import { AppTemplate } from '@/shared/components/templates'
import { HomeHeader } from '@/shared/components/organisms'
import { JourneyPreview } from '@/shared/components/organisms'
import { DailyMissionPreview } from '@/shared/components/organisms'
import { OnboardingModal } from '@/shared/components/organisms/OnboardingModal'
import { Card } from '@/shared/components/atoms/Card'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { useProgressStore } from '@/domains/progress/presentation/stores/useProgressStore'

export default function Home() {
  const router = useRouter()
  const { updateStreak } = useProgressStore()
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Atualiza streak ao carregar a página
  useEffect(() => {
    updateStreak()

    // Verifica se é a primeira visita (só no cliente)
    if (typeof window !== 'undefined') {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
      if (!hasSeenOnboarding) {
        setShowOnboarding(true)
      }
    }
  }, [updateStreak])

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem('hasSeenOnboarding', 'true')
  }

  const menuCards = [
    {
      id: 'learn',
      title: 'Aprender',
      description: 'Aprenda matemática de forma visual',
      icon: BookOpen,
      color: 'blue',
      available: true,
      path: '/learn',
    },
    {
      id: 'practice',
      title: 'Praticar',
      description: 'Pratique o que aprendeu',
      icon: Gamepad2,
      color: 'purple',
      available: true,
      path: '/practice',
    },
    {
      id: 'challenges',
      title: 'Desafios',
      description: 'Teste suas habilidades',
      icon: Target,
      color: 'orange',
      available: false,
      path: '#',
    },
    {
      id: 'achievements',
      title: 'Conquistas',
      description: 'Suas medalhas e troféus',
      icon: Trophy,
      color: 'yellow',
      available: true,
      path: '/achievements',
    },
  ]

  const handleCardClick = (card: typeof menuCards[0]) => {
    if (card.available) {
      router.push(card.path)
    }
  }

  return (
    <AppTemplate>
      {/* Onboarding na primeira visita */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleCloseOnboarding}
      />

      <div className="space-y-6">
        {/* Header com informações do jogador */}
        <HomeHeader />

        {/* Menu Principal */}
        <div className="grid grid-cols-2 gap-4">
          {menuCards.map((card) => (
            <Card
              key={card.id}
              padding="md"
              interactive={card.available}
              onClick={() => handleCardClick(card)}
              className={`${
                !card.available ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-${card.color}-100 flex items-center justify-center shrink-0`}
                >
                  <Icon
                    icon={card.icon}
                    size="md"
                    color={
                      card.color === 'blue'
                        ? '#3b82f6'
                        : card.color === 'purple'
                          ? '#a855f7'
                          : card.color === 'orange'
                            ? '#f97316'
                            : '#fbbf24'
                    }
                  />
                </div>
                <div className="min-w-0">
                  <Heading level={4} className="mb-1 text-sm sm:text-base">
                    {card.title}
                  </Heading>
                  <Text size="xs" color="secondary" className="text-xs leading-tight">
                    {card.description}
                  </Text>
                  {!card.available && (
                    <Text size="xs" color="tertiary" className="mt-2">
                      Em breve
                    </Text>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Jornada Preview */}
        <JourneyPreview />

        {/* Missões Diárias Preview */}
        <DailyMissionPreview />
      </div>
    </AppTemplate>
  )
}
