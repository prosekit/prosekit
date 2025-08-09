import { preset } from '@prosekit/config-unocss'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [preset()],
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/],
    },
  },
})
