import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import stringHash from '@sindresorhus/string-hash'

import { readExampleMeta, type Example } from './example-meta'
import { vfs } from './virtual-file-system'

export async function genPlaygroundPages() {
  const meta = await readExampleMeta()

  await vfs.updateText(
    'playground/src/pages/index.astro',
    getIndexContent(meta.examples),
  )

  await vfs.updateText(
    'playground/src/pages/[example].astro',
    getExampleContent(meta.examples),
  )
}

function getIndexContent(examples: Example[]): string {
  const htmlLines: string[] = []

  examples.forEach((example) => {
    htmlLines.push(`  <p><a href="/_/${example.name}">${example.name}</a></p>`)
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

function getExampleContent(examples: Example[]): string {
  const importLines: string[] = []
  const pathLines: string[] = []
  const htmlLines: string[] = []

  examples.forEach((example) => {
    const id = stringHash(example.name)
    const { framework, story, name } = example

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

    importLines.push(
      `import E${id} from '../../examples/${framework}/${story}/editor${ext}'`,
    )
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
