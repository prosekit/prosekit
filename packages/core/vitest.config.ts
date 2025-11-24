/// <reference types="vitest/config" />
import { config } from '@prosekit/config-vitest'
import { playwrightCommands } from 'vitest-browser-commands'

export default config({
  plugins: [
    playwrightCommands(),
  ],
})
