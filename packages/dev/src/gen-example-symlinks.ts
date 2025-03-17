import path from 'node:path'

import fs from 'fs-extra'

import { findSymlinks } from './find-symlinks.js'
import { skipGen } from './skip-gen.js'
import { vfs } from './virtual-file-system.js'

// A mapping of the source path to the target paths. All paths are relative to
// the website/src directory.
//
/// keep-sorted
const mapping: Record<string, string[]> = {
  'shared/common/issue-link.ts': [
    /// keep-sorted
    'examples/react/mark-rule/issue-link.ts',
    'examples/vue/mark-rule/issue-link.ts',
  ],
  'shared/common/tag-data.ts': [
    /// keep-sorted
    'examples/react/full/tag-data.ts',
    'examples/react/user-menu/tag-data.ts',
    'examples/svelte/full/tag-data.ts',
    'examples/vue/full/tag-data.ts',
    'examples/vue/user-menu/tag-data.ts',
  ],
  'shared/common/typography-content.ts': [
    /// keep-sorted
    'examples/preact/typography/typography-content.ts',
    'examples/react/typography/typography-content.ts',
    'examples/solid/typography/typography-content.ts',
    'examples/svelte/typography/typography-content.ts',
    'examples/vue/typography/typography-content.ts',
  ],
  'shared/common/upload-file.ts': [
    /// keep-sorted
    'examples/react/full/upload-file.ts',
    'examples/react/image-view/upload-file.ts',
    'examples/vue/full/upload-file.ts',
    'examples/vue/image-view/upload-file.ts',
  ],
  'shared/common/user-data.ts': [
    /// keep-sorted
    'examples/react/full/user-data.ts',
    'examples/react/user-menu-dynamic/user-data.ts',
    'examples/react/user-menu/user-data.ts',
    'examples/svelte/full/user-data.ts',
    'examples/vue/full/user-data.ts',
    'examples/vue/user-menu-dynamic/user-data.ts',
    'examples/vue/user-menu/user-data.ts',
  ],
  'shared/preact/button.tsx': [
    /// keep-sorted
    'examples/preact/keymap/button.tsx',
    'examples/preact/readonly/button.tsx',
  ],
  'shared/preact/use-readonly.ts': [
    /// keep-sorted
    'examples/preact/readonly/use-readonly.ts',
  ],
  'shared/preact/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/preact/keymap/use-submit-keymap.ts',
  ],
  'shared/react/block-handle.tsx': [
    /// keep-sorted
    'examples/react/block-handle/block-handle.tsx',
    'examples/react/full/block-handle.tsx',
  ],
  'shared/react/button.tsx': [
    /// keep-sorted
    'examples/react/blockquote/button.tsx',
    'examples/react/code-block/button.tsx',
    'examples/react/full/button.tsx',
    'examples/react/heading/button.tsx',
    'examples/react/horizontal-rule/button.tsx',
    'examples/react/inline-menu/button.tsx',
    'examples/react/keymap/button.tsx',
    'examples/react/link/button.tsx',
    'examples/react/list/button.tsx',
    'examples/react/loro/button.tsx',
    'examples/react/readonly/button.tsx',
    'examples/react/search/button.tsx',
    'examples/react/toolbar/button.tsx',
    'examples/react/yjs/button.tsx',
  ],
  'shared/react/code-block-view.tsx': [
    /// keep-sorted
    'examples/react/code-block/code-block-view.tsx',
    'examples/react/full/code-block-view.tsx',
  ],
  'shared/react/image-upload-popover.tsx': [
    /// keep-sorted
    'examples/react/full/image-upload-popover.tsx',
    'examples/react/toolbar/image-upload-popover.tsx',
  ],
  'shared/react/image-view.tsx': [
    /// keep-sorted
    'examples/react/full/image-view.tsx',
    'examples/react/image-view/image-view.tsx',
  ],
  'shared/react/slash-menu-empty.tsx': [
    /// keep-sorted
    'examples/react/full/slash-menu-empty.tsx',
    'examples/react/slash-menu/slash-menu-empty.tsx',
  ],
  'shared/react/slash-menu-item.tsx': [
    /// keep-sorted
    'examples/react/full/slash-menu-item.tsx',
    'examples/react/slash-menu/slash-menu-item.tsx',
  ],
  'shared/react/slash-menu.tsx': [
    /// keep-sorted
    'examples/react/full/slash-menu.tsx',
    'examples/react/slash-menu/slash-menu.tsx',
  ],
  'shared/react/tag-menu.tsx': [
    /// keep-sorted
    'examples/react/full/tag-menu.tsx',
    'examples/react/user-menu/tag-menu.tsx',
  ],
  'shared/react/use-readonly.ts': [
    /// keep-sorted
    'examples/react/readonly/use-readonly.ts',
  ],
  'shared/react/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/react/keymap/use-submit-keymap.ts',
  ],
  'shared/react/user-menu.tsx': [
    /// keep-sorted
    'examples/react/full/user-menu.tsx',
    'examples/react/user-menu/user-menu.tsx',
  ],
  'shared/solid/button.tsx': [
    /// keep-sorted
    'examples/solid/code-block/button.tsx',
    'examples/solid/heading/button.tsx',
    'examples/solid/keymap/button.tsx',
    'examples/solid/readonly/button.tsx',
    'examples/solid/text-align/button.tsx',
  ],
  'shared/solid/code-block-view.tsx': [
    /// keep-sorted
    'examples/solid/code-block/code-block-view.tsx',
  ],
  'shared/solid/use-readonly.ts': [
    /// keep-sorted
    'examples/solid/readonly/use-readonly.ts',
  ],
  'shared/solid/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/solid/keymap/use-submit-keymap.ts',
  ],
  'shared/svelte/block-handle.svelte': [
    /// keep-sorted
    'examples/svelte/full/block-handle.svelte',
  ],
  'shared/svelte/button.svelte': [
    /// keep-sorted
    'examples/svelte/bold/button.svelte',
    'examples/svelte/code-block/button.svelte',
    'examples/svelte/code/button.svelte',
    'examples/svelte/full/button.svelte',
    'examples/svelte/heading/button.svelte',
    'examples/svelte/italic/button.svelte',
    'examples/svelte/keymap/button.svelte',
    'examples/svelte/readonly/button.svelte',
    'examples/svelte/text-align/button.svelte',
    'examples/svelte/toolbar/button.svelte',
  ],
  'shared/svelte/code-block-view.svelte': [
    /// keep-sorted
    'examples/svelte/code-block/code-block-view.svelte',
    'examples/svelte/full/code-block-view.svelte',
  ],
  'shared/svelte/slash-menu-empty.svelte': [
    /// keep-sorted
    'examples/svelte/full/slash-menu-empty.svelte',
    'examples/svelte/slash-menu/slash-menu-empty.svelte',
  ],
  'shared/svelte/slash-menu-item.svelte': [
    /// keep-sorted
    'examples/svelte/full/slash-menu-item.svelte',
    'examples/svelte/slash-menu/slash-menu-item.svelte',
  ],
  'shared/svelte/slash-menu.svelte': [
    /// keep-sorted
    'examples/svelte/full/slash-menu.svelte',
    'examples/svelte/slash-menu/slash-menu.svelte',
  ],
  'shared/svelte/use-readonly.ts': [
    /// keep-sorted
    'examples/svelte/readonly/use-readonly.ts',
  ],
  'shared/svelte/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/svelte/keymap/use-submit-keymap.ts',
  ],
  'shared/vue/block-handle.vue': [
    /// keep-sorted
    'examples/vue/block-handle/block-handle.vue',
    'examples/vue/full/block-handle.vue',
  ],
  'shared/vue/button.vue': [
    /// keep-sorted
    'examples/vue/blockquote/button.vue',
    'examples/vue/bold/button.vue',
    'examples/vue/code-block/button.vue',
    'examples/vue/code/button.vue',
    'examples/vue/full/button.vue',
    'examples/vue/heading/button.vue',
    'examples/vue/inline-menu/button.vue',
    'examples/vue/italic/button.vue',
    'examples/vue/keymap/button.vue',
    'examples/vue/link/button.vue',
    'examples/vue/list/button.vue',
    'examples/vue/readonly/button.vue',
    'examples/vue/strike/button.vue',
    'examples/vue/text-align/button.vue',
    'examples/vue/text-color/button.vue',
    'examples/vue/toolbar/button.vue',
    'examples/vue/underline/button.vue',
  ],
  'shared/vue/code-block-view.vue': [
    /// keep-sorted
    'examples/vue/code-block/code-block-view.vue',
    'examples/vue/full/code-block-view.vue',
  ],
  'shared/vue/image-upload-popover.vue': [
    /// keep-sorted
    'examples/vue/full/image-upload-popover.vue',
  ],
  'shared/vue/image-view.vue': [
    /// keep-sorted
    'examples/vue/full/image-view.vue',
    'examples/vue/image-view/image-view.vue',
  ],
  'shared/vue/slash-menu-empty.vue': [
    /// keep-sorted
    'examples/vue/full/slash-menu-empty.vue',
    'examples/vue/slash-menu/slash-menu-empty.vue',
  ],
  'shared/vue/slash-menu-item.vue': [
    /// keep-sorted
    'examples/vue/full/slash-menu-item.vue',
    'examples/vue/slash-menu/slash-menu-item.vue',
  ],
  'shared/vue/slash-menu.vue': [
    /// keep-sorted
    'examples/vue/full/slash-menu.vue',
    'examples/vue/slash-menu/slash-menu.vue',
  ],
  'shared/vue/tag-menu.vue': [
    /// keep-sorted
    'examples/vue/full/tag-menu.vue',
    'examples/vue/user-menu/tag-menu.vue',
  ],
  'shared/vue/use-readonly.ts': [
    /// keep-sorted
    'examples/vue/readonly/use-readonly.ts',
  ],
  'shared/vue/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/vue/keymap/use-submit-keymap.ts',
  ],
  'shared/vue/user-menu.vue': [
    /// keep-sorted
    'examples/vue/full/user-menu.vue',
    'examples/vue/user-menu/user-menu.vue',
  ],
}

export async function genExampleSymlinks() {
  if (skipGen()) return

  // The root directory of the website
  const rootDir = await vfs.getRootDir()
  const websiteSrcDir = path.join(rootDir, 'website', 'src')

  // Find all existing symlinks under the website/src directory
  const existingSymlinks = await findSymlinks(websiteSrcDir)

  // Get all target paths from the mapping
  const targetPaths = Object.values(mapping).flat().map(target => path.join(websiteSrcDir, target))

  // 1. Remove symlinks that are not in the mapping
  for (const symlink of existingSymlinks) {
    if (!targetPaths.includes(symlink)) {
      await fs.remove(symlink)
    }
  }

  // 2. Create all symlinks from the mapping
  for (const [source, targets] of Object.entries(mapping)) {
    // Check if source file exists - throw error if not
    const sourcePath = path.join(websiteSrcDir, source)
    if (!await fs.pathExists(sourcePath)) {
      throw new Error(`Source file does not exist: ${source} (full path: ${sourcePath})`)
    }

    const sourceStats = await fs.stat(sourcePath)
    if (!sourceStats.isFile()) {
      throw new Error(`Source path exists but is not a file: ${source}`)
    }

    // Process each target for this source
    for (const target of targets) {
      // All paths are relative to website/src
      const targetPath = path.join(websiteSrcDir, target)

      // Create parent directories if they don't exist
      const targetDir = path.dirname(targetPath)
      await fs.ensureDir(targetDir)

      // Create the relative symlink from target to source (force flag like ln -sf)
      // For symlinks, we need the relative path from the target to the source
      const relativeSourcePath = path.relative(targetDir, sourcePath)

      // Remove any existing symlink or file at the target path
      try {
        await fs.remove(targetPath)
      } catch {
        // ignore
      }

      // Create the symlink
      await fs.symlink(relativeSourcePath, targetPath)
    }
  }
}
