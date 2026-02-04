import { basename } from 'node:path'

import { vfs } from '@prosekit/dev'
import { pascalCase } from 'change-case'

import { FRAMEWORKS, type ItemAccumulator } from './types'

export function updateWebsitePages(items: ItemAccumulator[]) {
  for (const framework of FRAMEWORKS) {
    if (items.some((item) => item.framework === framework)) {
      vfs.updateText(`website/src/stories/${framework}.stories.ts`, genStories(framework, items))
    } else {
      console.warn(`[${currentFilename}] No items found for framework ${framework}`)
    }
  }
}

function genStories(framework: string, items: ItemAccumulator[]): string {
  const lines = [
    `// This file is generated from ${currentFilename}`,
    `import component from './${framework}.astro'`,
    ``,
    `export default { component }`,
    ``,
    ...items
      .filter((item) => item.category === 'example')
      .filter((example) => example.framework === framework)
      .map((example) => `export const ${pascalCase(example.story)} = { args: { story: '${example.story}' } }`),
  ]
  return lines.join('\n') + '\n'
}

const currentFilename = basename(import.meta.filename)
