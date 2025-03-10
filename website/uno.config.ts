import {
  configDeps,
  preset,
} from '@prosekit/unocss-preset'
import {
  defineConfig,
  transformerDirectives,
} from 'unocss'

const css = String.raw

const preflight = css`
  /*
  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
  2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
  2. [UnoCSS]: allow to override the default border color with css var --un-default-border-color
  */

  *,
  ::before,
  ::after {
    box-sizing: border-box; /* 1 */
    border-width: 0; /* 2 */
    border-style: solid; /* 2 */
    border-color: var(--un-default-border-color, #e5e7eb); /* 2 */
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
