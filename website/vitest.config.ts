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

import { classReplace } from './build/vite-plugin-class-replace'

const debug = false

export default config({
  plugins: [
    wasm(),
    classReplace(),
    tailwindcss(),
    playwrightCommands(),

    react({ include: ['**/react/**/*.tsx'] }),
    vue({ include: ['**/vue/**/*.vue'] }),
    svelte({ include: ['**/svelte/**/*.svelte'] }),
    solid({ include: ['**/solid/**/*.tsx'] }),
    preact({ include: ['**/preact/**/*.tsx'] }),
  ],
  test: {
    include: ['test/**/*.test.ts'],
    browser: {
      headless: !debug,
      ui: debug,
    },
  },
})
