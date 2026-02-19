import { isColorMixSupported } from './css-feature-detection.ts'

/**
 * Convert a color to a color with opacity
 * @param color - The color to convert
 * @param opacity - The opacity to apply
 * @returns The converted color if color-mix is supported, otherwise undefined
 */
export function fadeColor(color: CSSStyleValue, opacity: number): string | undefined {
  if (isColorMixSupported()) {
    const transparentWeight = (1 - opacity) * 100
    const colorWeight = opacity * 100
    return `color-mix(in srgb, ${color} ${colorWeight}%, transparent ${transparentWeight}%)`
  }
}
