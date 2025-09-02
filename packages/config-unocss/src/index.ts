import {
  presetIcons,
  presetWind3,
  type PresetFactory,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'

import {
  getWatchFilePaths,
  loadClasses,
} from './files'

export const preset: PresetFactory = () => {
  return ({
    name: 'prosekit',
    presets: [presetWind3(), presetIcons(), presetAnimations()],
    content: {
      pipeline: {
        include: [/\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/],
      },
    },
    safelist: Array.from(new Set(Object.values(loadClasses()).flatMap(value => value.split(' ')))),
    configDeps: [...getWatchFilePaths({ includeClasses: false })],
  })
}
