import {
  configDeps,
  preset,
} from '@prosekit/unocss-preset'
import {
  defineConfig,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [preset()],
  configDeps: configDeps(),
  content: {
    filesystem: [
      './src/**/*.{vue,tsx,jsx,ts,js,svelte,astro,ts}',
    ],
    pipeline: {
      include: /\.(vue|svelte|[jt]sx?|mdx?|astro|html)($|\?)/,
    },
  },
  transformers: [transformerDirectives()],
  theme: {
    breakpoints: {
      // Match Starlight breakpoints
      // https://github.com/withastro/starlight/blob/893be3b4a106ab75b706142bbd06b00268ccc298/packages/starlight/style/util.css#L22-L43
      'sm': '30rem',
      'md': '50rem',
      'lg': '72rem',
      'xl': '90rem',
      '2xl': '120rem',
    },
  },
})
