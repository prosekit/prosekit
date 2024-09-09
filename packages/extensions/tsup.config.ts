import { config } from '@prosekit/dev/config-tsup'
import { defineConfig } from 'tsup'

export default defineConfig(
  config({
    entry: {
      // Ensure that we get dist/shiki-highlighter-chunk.js instead of dist/shiki-highlighter-chunk-C5VVQ2TD.js.
      'shiki-highlighter-chunk': './src/code-block/shiki-highlighter-chunk.ts',
    },
  }),
)
