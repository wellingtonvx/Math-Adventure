export const spacing = {
  // Espaçamentos base
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px

  // Espaçamentos específicos para componentes
  button: {
    padding: {
      sm: '0.5rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem',
    },
  },

  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
  },

  // Área de toque mínima para mobile (acessibilidade)
  touchTarget: '44px',
} as const

export type SpacingToken = typeof spacing
