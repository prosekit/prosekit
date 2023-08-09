import { defineConfig, presetIcons, presetWind, type UserConfig } from 'unocss'

const config: UserConfig = defineConfig({
  presets: [presetWind(), presetIcons()],
  content: {
    pipeline: {
      include: ['**/*.ts'],
    },
  },
})

export default config
