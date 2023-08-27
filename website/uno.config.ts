import {
  defineConfig,
  presetIcons,
  presetWind,
  transformerDirectives,
  type UserConfig,
} from 'unocss'

const config: UserConfig = defineConfig({
  presets: [presetWind(), presetIcons()],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: ['**/*.ts'],
    },
  },
})

export default config
