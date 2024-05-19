import presetProseKit from '@prosekit/unocss-preset'
import { defineConfig, transformerDirectives, type UserConfig } from 'unocss'

const config: UserConfig = defineConfig({
  presets: [presetProseKit()],
  transformers: [transformerDirectives()],
  content: {
    pipeline: {
      include: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.md'],
    },
  },
})

export default config
