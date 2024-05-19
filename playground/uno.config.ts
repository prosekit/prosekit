import presetProseKit from '@prosekit/unocss-preset'
import { defineConfig, transformerDirectives, type UserConfig } from 'unocss'

const config: UserConfig = defineConfig({
  presets: [presetProseKit()],
  content: {
    filesystem: [
      './examples/**/*.{vue,tsx,jsx,ts,js,svelte}',
      './layouts/**/*.{astro,ts}',
    ],
    pipeline: {
      include: /\.(vue|svelte|[jt]sx?|mdx?|astro|html)($|\?)/,
    },
  },
  transformers: [transformerDirectives()],
})

export default config
