import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { readExampleMeta } from './example-meta'
import { vfs } from './virtual-file-system'

export async function genPlaygroundPages() {
  const meta = await readExampleMeta()
  for (const example of meta.examples) {
    const content = getPageContent(example.name)
    if (content) {
      vfs.updateText(`playground/pages/${example.name}/index.astro`, content)
    }
  }

  vfs.updateText(
    'playground/layouts/nav-list.astro',
    getNavList(meta.examples.map((example) => example.name)),
  )
}

function getPageContent(name: string): string | null {
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

  return (
    `
---
// This file is generated from ${currentFilename}
import BaseLayout from '../../layouts/base-layout.astro'
import App from '../../examples/${name}/App.${ext}'
---

<BaseLayout>
  <App client:only="${framework}" />
</BaseLayout>
`.trim() + '\n'
  )
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
