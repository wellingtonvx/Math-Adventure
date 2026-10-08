'use client'

import { ArrowLeft } from 'lucide-react'
import { Heading } from '@/shared/components/atoms/Heading'
import { Text } from '@/shared/components/atoms/Text'
import { ProgressBar } from '@/shared/components/atoms/ProgressBar'
import { Button } from '@/shared/components/atoms/Button'

interface LessonHeaderProps {
  title: string
  current: number
  total: number
  onBack: () => void
}

export function LessonHeader({
  title,
  current,
  total,
  onBack,
}: LessonHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
      <div className="space-y-4">
        {/* Título e botão voltar */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={onBack}
            className="!px-3"
          >
            <ArrowLeft size={20} />
          </Button>
          <Heading level={3} className="flex-1 text-center">
            {title}
          </Heading>
          <div className="w-12" /> {/* Spacer para centralizar */}
        </div>

        {/* Progresso */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Text size="sm" color="secondary">
              Questão {current + 1} de {total}
            </Text>
            <Text size="sm" color="secondary">
              {Math.round(((current + 1) / total) * 100)}%
            </Text>
          </div>
          <ProgressBar
            current={current + 1}
            max={total}
            color="success"
            height="md"
          />
        </div>
      </div>
    </div>
  )
}
