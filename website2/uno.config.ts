import { configDeps, preset } from '@prosekit/unocss-preset'
import { defineConfig, transformerDirectives } from 'unocss'
import { colors } from 'unocss/preset-mini'

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

  :root {
    --sl-content-width: 50rem;
  }

  :root {
    /* Dark mode Starlight theme variables. */
    --sl-color-white: white;
    --sl-color-gray-1: ${colors.gray[200]};
    --sl-color-gray-2: ${colors.gray[300]};
    --sl-color-gray-3: ${colors.gray[400]};
    --sl-color-gray-4: ${colors.gray[600]};
    --sl-color-gray-5: ${colors.gray[700]};
    --sl-color-gray-6: ${colors.gray[800]};
    --sl-color-black: ${colors.gray[900]};
    --sl-color-accent-low: ${colors.gray[950]};
    --sl-color-accent: ${colors.gray[600]};
    --sl-color-accent-high: ${colors.gray[200]};
  }

  :root[data-theme='light'] {
    /* Light mode Starlight theme variables */
    --sl-color-white: ${colors.gray[900]};
    --sl-color-gray-1: ${colors.gray[800]};
    --sl-color-gray-2: ${colors.gray[700]};
    --sl-color-gray-3: ${colors.gray[500]};
    --sl-color-gray-4: ${colors.gray[400]};
    --sl-color-gray-5: ${colors.gray[300]};
    --sl-color-gray-6: ${colors.gray[200]};
    --sl-color-gray-7: ${colors.gray[100]};
    --sl-color-black: ${colors.gray[900]};
    --sl-color-accent-low: ${colors.gray[200]};
    --sl-color-accent: ${colors.gray[600]};
    --sl-color-accent-high: ${colors.gray[900]};
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
  theme: {
    breakpoints: {
      // Match Starlight breakpoints
      // https://github.com/withastro/starlight/blob/893be3b4a106ab75b706142bbd06b00268ccc298/packages/starlight/style/util.css#L22-L43
      sm: '30rem',
      md: '50rem',
      lg: '72rem',
      xl: '90rem',
      '2xl': '120rem',
    },
  },
})
