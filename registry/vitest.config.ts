/// <reference types="vitest/config" />
import preact from '@preact/preset-vite'
import { config } from '@prosekit/config-vitest'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import solid from 'vite-plugin-solid'
import wasm from 'vite-plugin-wasm'
import { playwrightCommands } from 'vitest-browser-commands'

import { classReplace } from './src/meta/vite-plugin-class-replace'

export default config({
  optimizeDeps: {
    include: ['preact/test-utils'],
  },
  plugins: [
    wasm(),
    classReplace(),
    tailwindcss(),
    playwrightCommands(),

    react({ include: ['**/react/**/*.tsx'] }),
    vue({ include: ['**/vue/**/*.vue'] }),
    svelte({ include: ['**/svelte/**/*.svelte'] }),
    solid({ include: ['**/solid/**/*.tsx'] }),
    preact({
      include: ['**/preact/**/*.tsx'],
      reactAliasesEnabled: false,
      prefreshEnabled: false,

      // Pass an empty `babel` object to force Preact Vite plugin to use Babel
      // instead of esbuild. If esbuild is used, it will force all
      // `jsxImportSource` usages to be `preact`. See
      // https://github.com/preactjs/preset-vite/blob/4ce2b85955d9480b1f3b699c99b5e8ac410441c6/src/index.ts#L193-L198
      babel: {},
    }),
  ],
})
