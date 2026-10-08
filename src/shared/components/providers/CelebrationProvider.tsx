'use client'

import { useCelebration } from '@/shared/hooks/useCelebration'
import { AchievementUnlockedModal } from '../organisms/AchievementUnlockedModal'
import { LevelUpModal } from '../organisms/LevelUpModal'
import { Mascot } from '../molecules/Mascot'

export function CelebrationProvider({ children }: { children: React.ReactNode }) {
  const {
    unlockedAchievement,
    hideAchievementModal,
    newLevel,
    hideLevelUpModal,
    mascotMessage,
    mascotMood,
    hideMascot,
  } = useCelebration()

  return (
    <>
      {children}

      {/* Modal de conquista desbloqueada */}
      {unlockedAchievement && (
        <AchievementUnlockedModal
          achievement={unlockedAchievement}
          onClose={hideAchievementModal}
        />
      )}

      {/* Modal de level up */}
      {newLevel && <LevelUpModal newLevel={newLevel} onClose={hideLevelUpModal} />}

      {/* Mascote */}
      {mascotMessage && (
        <Mascot
          message={mascotMessage}
          mood={mascotMood}
          onClose={hideMascot}
          autoHide={5000}
        />
      )}
    </>
  )
}
