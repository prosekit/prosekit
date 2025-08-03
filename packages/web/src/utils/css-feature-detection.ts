import { once } from '@ocavue/utils'

export const isColorMixSupported: () => boolean = once(() => {
  try {
    return CSS.supports('background-color', 'color-mix(in srgb, red, blue)')
  } catch {
    return false
  }
})
