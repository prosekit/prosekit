import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: 'esm',
  target: 'es2020',
  sourcemap: true,
  fixedExtension: false,
  clean: true,
  dts: { build: true },
  noExternal: [/aria-ui/],
})
