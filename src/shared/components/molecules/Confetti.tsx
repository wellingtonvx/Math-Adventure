'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ConfettiProps {
  duration?: number // ms
  particleCount?: number
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
  delay: number
}

const colors = [
  '#FF6B6B', // vermelho
  '#4ECDC4', // azul
  '#FFE66D', // amarelo
  '#95E1D3', // verde água
  '#F38181', // rosa
  '#AA96DA', // roxo
  '#FCBAD3', // rosa claro
  '#A8D8EA', // azul claro
]

export function Confetti({ duration = 3000, particleCount = 50 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Gera partículas
    const newParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // posição horizontal em %
        y: -10, // começa acima da tela
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4, // 4-12px
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5, // delay de até 500ms
      })
    }
    setParticles(newParticles)

    // Remove após a duração
    const timer = setTimeout(() => {
      setParticles([])
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, particleCount])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: particle.y,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            y: '110vh', // cai até sair da tela
            rotate: particle.rotation + 720, // 2 rotações completas
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: duration / 1000,
            delay: particle.delay,
            ease: 'easeIn',
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}
