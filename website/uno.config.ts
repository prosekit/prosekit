import {
  defineConfig,
  presetIcons,
  presetWind,
  transformerDirectives,
  type UserConfig,
} from 'unocss'

import { shortcuts } from '../config/unocss-shortcut.mjs'

const config: UserConfig = defineConfig({
  presets: [presetWind(), presetIcons()],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.md'],
    },
  },
  shortcuts,
})

export default config
