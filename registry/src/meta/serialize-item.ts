import assert from 'node:assert'
import path from 'node:path'

import type { RegistryItem } from 'shadcn-schema'

import {
  FRAMEWORKS,
  type Framework,
  type ItemAccumulator,
} from './types'

/**
 * Convert an accumulator into a JSON-friendly shape expected by the registry file.
 */
export function serializeItem(item: ItemAccumulator): RegistryItem {
  return {
    name: item.name,
    title: item.title,
    type: item.type,
    description: item.description,
    registryDependencies: Array.from(item.registryDependencies).sort(),
    dependencies: Array.from(item.dependencies).sort(),
    files: Array.from(item.files)
      .sort()
      .map((filePath) => ({
        path: filePath,
        type: 'registry:component',
        target: sourceToTargetPath(filePath),
      })),
    meta: {
      hasIcons: item.meta.hasIcons,
      hidden: item.meta.hidden,
      story: item.story,
      framework: item.framework,
      accumulatedFiles: Array.from(item.meta.accumulatedFiles).sort(),
      internalDependencies: Array.from(item.meta.internalDependencies).sort(),
    },
    css: item.meta.hasIcons
      ? {
        '@plugin @egoist/tailwindcss-icons': {},
      }
      : undefined,
  }
}

/**
 * Converts the file path from the source path (related to this repository root) to the target path (in user projects).
 */
function sourceToTargetPath(sourcePath: string) {
  const chunks = sourcePath.split('/')
  assert(chunks.shift() === 'registry')
  assert(chunks.shift() === 'src')
  const framework = chunks.shift()
  assert(FRAMEWORKS.includes(framework as Framework))
  const targetPath = path.posix.join('components', 'editor', ...chunks)
  return targetPath
}
