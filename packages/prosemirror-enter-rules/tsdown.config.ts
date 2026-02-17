import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { 'prosemirror-enter-rules': './src/index.ts' },
  failOnWarn: true,
  dts: { build: true, incremental: true, sourcemap: false },
  platform: 'neutral',
})
