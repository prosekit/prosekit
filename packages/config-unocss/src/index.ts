import {
  presetIcons,
  presetWind4,
  type PresetFactory,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'

import { Colors } from './colors'
import {
  getWatchFilePaths,
  loadClasses,
} from './files'

export const preset: PresetFactory = () => {
  return ({
    name: 'prosekit',
    presets: [presetWind4(), presetIcons(), presetAnimations()],
    content: {
      pipeline: {
        include: [/\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/],
      },
    },
    safelist: Array.from(new Set(Object.values(loadClasses()).flatMap(value => value.split(' ')))),
    shortcuts: Colors,
    configDeps: [...getWatchFilePaths({ includeClasses: false })],
  })
}
