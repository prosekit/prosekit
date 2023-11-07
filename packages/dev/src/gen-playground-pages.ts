import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { readExampleMeta } from './example-meta'
import { vfs } from './virtual-file-system'

export async function genPlaygroundPages() {
  const meta = await readExampleMeta()

  const exampleNames: string[] = meta.examples.map((example) => example.name)

  await vfs.updateText(
    'playground/pages/[example].astro',
    getPageContent(exampleNames),
  )

  await vfs.updateText(
    'playground/layouts/nav-list.astro',
    getNavList(exampleNames),
  )
}

function getPageContent(names: string[]): string {
  const importLines: string[] = []
  const pathLines: string[] = []
  const htmlLines: string[] = []

  names.forEach((name, index) => {
    const framework = name.split('-')[0]

    const ext = {
      react: 'tsx',
      preact: 'tsx',
      solid: 'tsx',
      svelte: 'svelte',
      vue: 'vue',
    }[framework]

    if (!ext) {
      return null
    }

    importLines.push(`import E${index} from '../examples/${name}/App.${ext}'`)
    pathLines.push(`  { params: { example: '${name}' } },`)
    htmlLines.push(
      `  {example === '${name}' && <E${index} client:only="${framework}" />}`,
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
    `<BaseLayout>`,
    ...htmlLines,
    `</BaseLayout>`,
  ]

  return lines.join('\n') + '\n'
}

function getNavList(names: string[]): string {
  const lines = [
    `---`,
    `// This file is generated from ${currentFilename}`,
    `import NavItem from './nav-item.astro'`,
    `---`,
  ]

  let prevFramework = ''

  for (const name of names) {
    const framework = name.split('-')[0]
    if (framework !== prevFramework) {
      prevFramework = framework
      lines.push(``, `<!-- ${framework} -->`)
    }
    lines.push(`<NavItem path="/${name}" />`)
  }

  return lines.join('\n').trim() + '\n'
}

const currentFilename = basename(fileURLToPath(import.meta.url))
