import {
  configDeps,
  preset,
} from '@prosekit/config-unocss'
import {
  defineConfig,
  transformerDirectives,
} from 'unocss'

const css = String.raw

const preflight = css`
  @layer base, starlight, nova;
  @layer base {
    *, ::after, ::before, ::backdrop, ::file-selector-button {
      box-sizing: border-box;
      border: 0 solid;
    }
  }
`

export default defineConfig({
  presets: [preset()],
  configDeps: configDeps(),
  content: {
    filesystem: ['./src/**/*.{vue,tsx,jsx,ts,js,svelte,astro,ts}'],
    pipeline: {
      include: /\.(vue|svelte|[jt]sx?|mdx?|astro|html)($|\?)/,
    },
  },
  transformers: [transformerDirectives()],
  preflights: [{ getCSS: () => preflight }],
})
