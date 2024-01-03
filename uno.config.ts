import { defineConfig, presetIcons, presetWind, type UserConfig } from 'unocss'

import { shortcuts } from './config/unocss-shortcut.mjs'

const config: UserConfig = defineConfig({
  presets: [presetWind(), presetIcons()],
  shortcuts,
  configDeps: ['./config/unocss-shortcut.mjs'],
})

export default config
