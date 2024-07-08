import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import stringHash from '@sindresorhus/string-hash'

import { readExampleMeta } from './example-meta'
import { vfs } from './virtual-file-system'

export async function genPlaygroundPages() {
  const meta = await readExampleMeta()

  const exampleNames: string[] = meta.examples.map((example) => example.name)

  await vfs.updateText(
    'playground/src/pages/index.astro',
    getIndexContent(exampleNames),
  )

  await vfs.updateText(
    'playground/src/pages/[example].astro',
    getExampleContent(exampleNames),
  )
}

function getIndexContent(names: string[]): string {
  const htmlLines: string[] = []

  names.forEach((name) => {
    htmlLines.push(`  <p><a href="/_/${name}">${name}</a></p>`)
  })

  const lines = [
    `---`,
    `// This file is generated from ${currentFilename}`,
    `import BaseLayout from '../layouts/base-layout.astro'`,
    `---\n`,
    `<!-- prettier-ignore -->`,
    `<BaseLayout>`,
    ...htmlLines,
    `</BaseLayout>`,
  ]

  return lines.join('\n') + '\n'
}

function getExampleContent(names: string[]): string {
  const importLines: string[] = []
  const pathLines: string[] = []
  const htmlLines: string[] = []

  names.forEach((name) => {
    const id = stringHash(name)
    const framework = name.split('-')[0]

    const ext = {
      react: '',
      preact: '',
      solid: '',
      svelte: '.svelte',
      vue: '.vue',
    }[framework]

    if (ext == null) {
      return
    }

    importLines.push(`import E${id} from '../../examples/${name}/editor${ext}'`)
    pathLines.push(`  { params: { example: '${name}' } },`)
    htmlLines.push(
      `  {example === '${name}' && <E${id} client:only="${framework}" />}`,
    )
  })

  const lines = [
    `---`,
    `// This file is generated from ${currentFilename}`,
    `import BaseLayout from '../layouts/base-layout.astro'`,
    ...importLines,
    `export const getStaticPaths = () => [`,
    ...pathLines,
    `]`,
    `const { example } = Astro.params`,
    `---\n`,
    `<!-- prettier-ignore -->`,
    `<BaseLayout>`,
    ...htmlLines,
    `</BaseLayout>`,
  ]

  return lines.join('\n') + '\n'
}

const currentFilename = basename(fileURLToPath(import.meta.url))
