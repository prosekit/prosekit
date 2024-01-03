import {
  defineConfig,
  presetIcons,
  presetWind,
  transformerDirectives,
  type UserConfig,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'

import { shortcuts } from '../config/unocss-shortcut.mjs'

const config: UserConfig = defineConfig({
  presets: [presetWind(), presetIcons(), presetAnimations()],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.md'],
    },
  },
  configDeps: ['../config/unocss-shortcut.mjs'],
  shortcuts,
})

export default config
