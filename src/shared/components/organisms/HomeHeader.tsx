'use client'

import { useState, useEffect } from 'react'
import { useProgressStore } from '@/domains/progress/presentation/stores/useProgressStore'
import { Heading } from '../atoms/Heading'
import { XPIndicator } from '../molecules/XPIndicator'
import { CoinIndicator } from '../molecules/CoinIndicator'
import { StreakIndicator } from '../molecules/StreakIndicator'
import { LevelIndicator } from '../molecules/LevelIndicator'

export function HomeHeader() {
  const [mounted, setMounted] = useState(false)
  const { xp, level, coins, streak, getXPForNextLevel } = useProgressStore()

  const xpToNextLevel = getXPForNextLevel()

  const [greeting, setGreeting] = useState('Olá')

  // Só renderiza após montar no cliente (evita hydration error)
  useEffect(() => {
    setMounted(true)

    // Define saudação baseada na hora (só no cliente)
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('Bom dia')
    } else if (hour < 18) {
      setGreeting('Boa tarde')
    } else {
      setGreeting('Boa noite')
    }
  }, [])

  // Renderiza placeholder durante SSR
  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="space-y-4">
          <div>
            <Heading level={2} color="inverse">
              Olá!
            </Heading>
          </div>
          <div className="h-20 bg-white/10 rounded-xl animate-pulse" />
          <div className="h-8 bg-white/10 rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-6 md:p-8 shadow-lg">
      <div className="space-y-4">
        {/* Saudação */}
        <div>
          <Heading level={2} color="inverse">
            {greeting}!
          </Heading>
        </div>

        {/* Nível e XP */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <LevelIndicator level={level} size="lg" />
          <div className="flex gap-4">
            <CoinIndicator total={coins} size="md" />
            <StreakIndicator days={streak} size="md" />
          </div>
        </div>

        {/* Barra de XP */}
        <XPIndicator current={xp} max={xp + xpToNextLevel} showProgress />
      </div>
    </div>
  )
}
