import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetTypography, presetUno, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetUno(),
    presetTypography({
      compatibility: {
        noColonWhere: true,
        noColonIs: true,
        noColonNot: true,
      },
      selectorName: 'my-awesome-editor',
    }),
  ],
  transformers: [transformerDirectives()],
})
