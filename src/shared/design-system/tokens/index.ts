import { colors } from './colors'
import { spacing } from './spacing'
import { radius } from './radius'
import { shadows } from './shadows'
import { typography } from './typography'
import { animations } from './animations'

export { colors, type ColorToken } from './colors'
export { spacing, type SpacingToken } from './spacing'
export { radius, type RadiusToken } from './radius'
export { shadows, type ShadowToken } from './shadows'
export { typography, type TypographyToken } from './typography'
export { animations, type AnimationToken } from './animations'

// Export consolidado para fácil acesso
export const tokens = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
  animations,
} as const
