import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/bin.ts', 'src/index.ts'],
  outDir: 'dist',
  format: 'esm',
  target: 'es2020',
  clean: true,
  dts: { build: true },
  external: ['typescript'],
})
