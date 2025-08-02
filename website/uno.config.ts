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

    /*
      1. Inherit font styles in all browsers.
      2. Remove border radius in all browsers.
      3. Remove background color in all browsers.
      4. Ensure consistent opacity for disabled states in all browsers.
    */
    button,
    input,
    select,
    optgroup,
    textarea,
    ::file-selector-button {
      font: inherit; /* 1 */
      font-feature-settings: inherit; /* 1 */
      font-variation-settings: inherit; /* 1 */
      letter-spacing: inherit; /* 1 */
      color: inherit; /* 1 */
      border-radius: 0; /* 2 */
      background-color: transparent; /* 3 */
      opacity: 1; /* 4 */
    }
  }
`

export default defineConfig({
  presets: [preset()],
  configDeps: configDeps(),
  content: {
    filesystem: ['./src/**/*.{vue,tsx,jsx,ts,js,svelte,astro}'],
    // pipeline: {
    //   include: /\.(vue|svelte|[jt]sx?|mdx?|astro|html)($|\?)/,
    // },
  },
  transformers: [transformerDirectives()],
  preflights: [{ getCSS: () => preflight }],
})
