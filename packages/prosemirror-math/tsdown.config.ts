import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { 'prosemirror-math': './src/index.ts' },
  failOnWarn: true,
  dts: { build: true, incremental: true, sourcemap: false },
  platform: 'neutral',
})
