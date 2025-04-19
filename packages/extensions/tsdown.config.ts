import { config } from '@prosekit/config-tsdown'
import { defineConfig } from 'tsdown'

export default defineConfig(config({
  entry: {
    // Ensure that we get dist/shiki-highlighter-chunk.js instead of dist/shiki-highlighter-chunk-C5VVQ2TD.js.
    'shiki-highlighter-chunk': './src/code-block/shiki-highlighter-chunk.ts',
  },
}))
