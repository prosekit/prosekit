import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/tooltip/index.ts'],
  outDir: 'dist',
  format: 'esm',
  target: 'es2020',
  sourcemap: true,
  fixedExtension: false,
  clean: true,
  dts: { build: true, incremental: true, resolver: 'tsc' },
  tsconfig: 'tsconfig.json',
})
