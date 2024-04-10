import { defineConfig, presetIcons, presetWind, type UserConfig } from 'unocss'
import presetAnimations from 'unocss-preset-animations'

import { shortcuts } from './config/unocss-shortcut.mjs'

const config: UserConfig = defineConfig({
  presets: [presetWind(), presetIcons(), presetAnimations()],
  shortcuts,
  configDeps: ['./config/unocss-shortcut.mjs'],
})

export default config
