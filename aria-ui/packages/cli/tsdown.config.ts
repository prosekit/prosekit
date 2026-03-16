import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/bin.ts'],
  outDir: 'dist',
  format: 'esm',
  target: 'es2020',
  clean: true,
  dts: false,
  external: ['typescript'],
})
