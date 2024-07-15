import fs from 'node:fs/promises'

import { build } from 'esbuild'
import * as prettier from 'prettier'
import macros from 'unplugin-macros/esbuild'

const result = await build({
  entryPoints: ['./src/dist.ts'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/prosekit-themes.gen.js',
  plugins: [macros()],
  minifyWhitespace: true,
  write: false,
})

for (const out of result.outputFiles) {
  const formatted = await prettier.format(out.text, { parser: 'typescript' })
  await fs.writeFile(out.path, formatted)
}
