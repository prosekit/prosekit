import { defineConfig, presetIcons, presetWind, type UserConfig } from 'unocss'

import { shortcuts } from './config/unocss-shortcut.mjs'

const config: UserConfig = defineConfig({
  presets: [presetWind(), presetIcons()],
  shortcuts,
})

export default config
