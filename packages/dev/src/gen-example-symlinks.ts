import path from 'node:path'

import fs from 'fs-extra'

import { findSymlinks } from './find-symlinks'
import { skipGen } from './skip-gen'
import { vfs } from './virtual-file-system'

// A mapping of the source path to the target directories. All paths are relative to
// the website/src directory. The filename at each target will be the same as the source.
// All directories end with a trailing slash to explicitly indicate they are directories.
//
/// keep-sorted
const mapping: Record<string, string[]> = {
  // Common

  'shared/common/default-content-drag-and-drop.ts': [
    /// keep-sorted
    'examples/preact/block-handle/',
    'examples/react/block-handle/',
    'examples/solid/block-handle/',
    'examples/svelte/block-handle/',
    'examples/vue/block-handle/',
  ],
  'shared/common/default-content-full.ts': [
    /// keep-sorted
    'examples/react/full/',
    'examples/svelte/full/',
    'examples/vue/full/',
  ],
  'shared/common/issue-link.ts': [
    /// keep-sorted
    'examples/react/mark-rule/',
    'examples/vue/mark-rule/',
  ],
  'shared/common/sample-doc-image.ts': [
    /// keep-sorted
    'examples/preact/image-view/',
    'examples/react/image-view/',
    'examples/solid/image-view/',
    'examples/svelte/image-view/',
    'examples/vue/image-view/',
  ],
  'shared/common/sample-uploader.ts': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/image-view/',
    'examples/react/toolbar/',
    'examples/preact/image-view/',
    'examples/solid/image-view/',
    'examples/svelte/image-view/',
    'examples/vue/full/',
    'examples/vue/image-view/',
    'shared/react/',
    'shared/vue/',
  ],
  'shared/common/tag-data.ts': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/user-menu/',
    'examples/svelte/full/',
    'examples/vue/full/',
    'examples/vue/user-menu/',
    'shared/react/',
    'shared/vue/',
  ],
  'shared/common/typography-content.ts': [
    /// keep-sorted
    'examples/preact/typography/',
    'examples/react/typography/',
    'examples/solid/typography/',
    'examples/svelte/typography/',
    'examples/vue/typography/',
  ],
  'shared/common/user-data.ts': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/user-menu-dynamic/',
    'examples/react/user-menu/',
    'examples/svelte/full/',
    'examples/vue/full/',
    'examples/vue/user-menu-dynamic/',
    'examples/vue/user-menu/',
    'shared/react/',
    'shared/vue/',
  ],

  // Preact

  'shared/preact/block-handle.tsx': [
    /// keep-sorted
    'examples/preact/block-handle/',
  ],
  'shared/preact/button.tsx': [
    /// keep-sorted
    'examples/preact/keymap/',
    'examples/preact/readonly/',
  ],
  'shared/preact/drop-indicator.tsx': [
    /// keep-sorted
    'examples/preact/block-handle/',
  ],
  'shared/preact/slash-menu-empty.tsx': [
    /// keep-sorted
    'examples/preact/slash-menu/',
  ],
  'shared/preact/slash-menu-item.tsx': [
    /// keep-sorted
    'examples/preact/slash-menu/',
  ],
  'shared/preact/slash-menu.tsx': [
    /// keep-sorted
    'examples/preact/slash-menu/',
  ],
  'shared/preact/table-handle.tsx': [
    /// keep-sorted
    'examples/preact/table/',
  ],
  'shared/preact/use-readonly.ts': [
    /// keep-sorted
    'examples/preact/readonly/',
  ],
  'shared/preact/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/preact/keymap/',
  ],
  'shared/preact/image-view.tsx': [
    /// keep-sorted
    'examples/preact/image-view/',
  ],

  // React

  'shared/react/block-handle.tsx': [
    /// keep-sorted
    'examples/react/block-handle/',
    'examples/react/full/',
  ],
  'shared/react/button.tsx': [
    /// keep-sorted
    'examples/react/blockquote/',
    'examples/react/code-block/',
    'examples/react/full/',
    'examples/react/heading/',
    'examples/react/horizontal-rule/',
    'examples/react/inline-menu/',
    'examples/react/keymap/',
    'examples/react/link/',
    'examples/react/list-custom-checkbox/',
    'examples/react/list/',
    'examples/react/loro/',
    'examples/react/readonly/',
    'examples/react/search/',
    'examples/react/toolbar/',
    'examples/react/yjs/',
  ],
  'shared/react/code-block-view.tsx': [
    /// keep-sorted
    'examples/react/code-block/',
    'examples/react/full/',
  ],
  'shared/react/drop-indicator.tsx': [
    /// keep-sorted
    'examples/react/block-handle/',
    'examples/react/full/',
  ],
  'shared/react/image-upload-popover.tsx': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/toolbar/',
  ],
  'shared/react/image-view.tsx': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/image-view/',
  ],
  'shared/react/slash-menu-empty.tsx': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/slash-menu/',
  ],
  'shared/react/slash-menu-item.tsx': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/slash-menu/',
  ],
  'shared/react/slash-menu.tsx': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/slash-menu/',
  ],
  'shared/react/table-handle.tsx': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/table/',
  ],
  'shared/react/tag-menu.tsx': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/user-menu/',
  ],
  'shared/react/use-readonly.ts': [
    /// keep-sorted
    'examples/react/readonly/',
  ],
  'shared/react/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/react/keymap/',
  ],
  'shared/react/user-menu.tsx': [
    /// keep-sorted
    'examples/react/full/',
    'examples/react/user-menu/',
  ],

  // Solid

  'shared/solid/block-handle.tsx': [
    /// keep-sorted
    'examples/solid/block-handle/',
  ],
  'shared/solid/button.tsx': [
    /// keep-sorted
    'examples/solid/code-block/',
    'examples/solid/hard-break/',
    'examples/solid/heading/',
    'examples/solid/keymap/',
    'examples/solid/readonly/',
    'examples/solid/text-align/',
  ],
  'shared/solid/code-block-view.tsx': [
    /// keep-sorted
    'examples/solid/code-block/',
  ],
  'shared/solid/drop-indicator.tsx': [
    /// keep-sorted
    'examples/solid/block-handle/',
  ],
  'shared/solid/image-view.tsx': [
    /// keep-sorted
    'examples/solid/image-view/',
  ],
  'shared/solid/table-handle.tsx': [
    /// keep-sorted
    'examples/solid/table/',
  ],
  'shared/solid/use-readonly.ts': [
    /// keep-sorted
    'examples/solid/readonly/',
  ],
  'shared/solid/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/solid/keymap/',
  ],

  // Svelte

  'shared/svelte/block-handle.svelte': [
    /// keep-sorted
    'examples/svelte/block-handle/',
    'examples/svelte/full/',
  ],
  'shared/svelte/button.svelte': [
    /// keep-sorted
    'examples/svelte/bold/',
    'examples/svelte/code-block/',
    'examples/svelte/code/',
    'examples/svelte/full/',
    'examples/svelte/heading/',
    'examples/svelte/italic/',
    'examples/svelte/keymap/',
    'examples/svelte/readonly/',
    'examples/svelte/text-align/',
    'examples/svelte/toolbar/',
  ],
  'shared/svelte/code-block-view.svelte': [
    /// keep-sorted
    'examples/svelte/code-block/',
    'examples/svelte/full/',
  ],
  'shared/svelte/drop-indicator.svelte': [
    /// keep-sorted
    'examples/svelte/block-handle/',
    'examples/svelte/full/',
  ],
  'shared/svelte/image-view.svelte': [
    /// keep-sorted
    'examples/svelte/image-view/',
  ],
  'shared/svelte/slash-menu-empty.svelte': [
    /// keep-sorted
    'examples/svelte/full/',
    'examples/svelte/slash-menu/',
  ],
  'shared/svelte/slash-menu-item.svelte': [
    /// keep-sorted
    'examples/svelte/full/',
    'examples/svelte/slash-menu/',
  ],
  'shared/svelte/slash-menu.svelte': [
    /// keep-sorted
    'examples/svelte/full/',
    'examples/svelte/slash-menu/',
  ],
  'shared/svelte/table-handle.svelte': [
    /// keep-sorted
    'examples/svelte/full/',
    'examples/svelte/table/',
  ],
  'shared/svelte/use-readonly.ts': [
    /// keep-sorted
    'examples/svelte/readonly/',
  ],
  'shared/svelte/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/svelte/keymap/',
  ],

  // Vue

  'shared/vue/block-handle.vue': [
    /// keep-sorted
    'examples/vue/block-handle/',
    'examples/vue/full/',
  ],
  'shared/vue/button.vue': [
    /// keep-sorted
    'examples/vue/blockquote/',
    'examples/vue/bold/',
    'examples/vue/code-block/',
    'examples/vue/code/',
    'examples/vue/full/',
    'examples/vue/heading/',
    'examples/vue/inline-menu/',
    'examples/vue/italic/',
    'examples/vue/keymap/',
    'examples/vue/link/',
    'examples/vue/list/',
    'examples/vue/readonly/',
    'examples/vue/strike/',
    'examples/vue/text-align/',
    'examples/vue/text-color/',
    'examples/vue/toolbar/',
    'examples/vue/underline/',
  ],
  'shared/vue/code-block-view.vue': [
    /// keep-sorted
    'examples/vue/code-block/',
    'examples/vue/full/',
  ],
  'shared/vue/drop-indicator.vue': [
    /// keep-sorted
    'examples/vue/block-handle/',
    'examples/vue/full/',
  ],
  'shared/vue/image-upload-popover.vue': [
    /// keep-sorted
    'examples/vue/full/',
  ],
  'shared/vue/image-view.vue': [
    /// keep-sorted
    'examples/vue/full/',
    'examples/vue/image-view/',
  ],
  'shared/vue/slash-menu-empty.vue': [
    /// keep-sorted
    'examples/vue/full/',
    'examples/vue/slash-menu/',
  ],
  'shared/vue/slash-menu-item.vue': [
    /// keep-sorted
    'examples/vue/full/',
    'examples/vue/slash-menu/',
  ],
  'shared/vue/slash-menu.vue': [
    /// keep-sorted
    'examples/vue/full/',
    'examples/vue/slash-menu/',
  ],
  'shared/vue/table-handle.vue': [
    /// keep-sorted
    'examples/vue/full/',
    'examples/vue/table/',
  ],
  'shared/vue/tag-menu.vue': [
    /// keep-sorted
    'examples/vue/full/',
    'examples/vue/user-menu/',
  ],
  'shared/vue/use-readonly.ts': [
    /// keep-sorted
    'examples/vue/readonly/',
  ],
  'shared/vue/use-submit-keymap.ts': [
    /// keep-sorted
    'examples/vue/keymap/',
  ],
  'shared/vue/user-menu.vue': [
    /// keep-sorted
    'examples/vue/full/',
    'examples/vue/user-menu/',
  ],
}

export async function genExampleSymlinks() {
  if (skipGen()) return

  const rootDir = await vfs.getRootDir()
  const websiteSrcDir = path.join(rootDir, 'website', 'src')

  // Find all existing symlinks under the website/src directory
  const existingSymlinks = await findSymlinks(websiteSrcDir)

  // Build the expected target paths by constructing them from the mapping
  // For each source file, get its filename and combine with target directory
  const expectedTargetPaths = new Set<string>()

  for (const [source, targetDirs] of Object.entries(mapping)) {
    const sourceFileName = path.basename(source)
    for (const targetDir of targetDirs) {
      const targetPath = path.join(websiteSrcDir, targetDir, sourceFileName)
      expectedTargetPaths.add(targetPath)
    }
  }

  // 1. Ensure that there are no unexpected symlinks
  const unexpectedSymlinks: string[] = []
  for (const symlink of existingSymlinks) {
    if (!expectedTargetPaths.has(symlink)) {
      const relativeSymlink = path.relative(rootDir, symlink)
      unexpectedSymlinks.push(relativeSymlink)
    }
  }
  if (unexpectedSymlinks.length > 0) {
    const message = [
      `Unexpected symlinks found.`,
      `The following symlinks are not defined in ${currentFilePath}.`,
      `Please remove them manually or add them to the mapping.`,
      '',
      ...unexpectedSymlinks,
      '',
    ].join('\n')
    throw new Error(message)
  }

  // 2. Create all symlinks from the mapping
  for (const [source, targetDirs] of Object.entries(mapping)) {
    // Get source file name
    const sourceFileName = path.basename(source)

    // Check if source file exists - throw error if not
    const sourcePath = path.join(websiteSrcDir, source)
    if (!await fs.pathExists(sourcePath)) {
      throw new Error(`Source file does not exist: ${source} (full path: ${sourcePath})`)
    }

    const sourceStats = await fs.stat(sourcePath)
    if (!sourceStats.isFile()) {
      throw new Error(`Source path exists but is not a file: ${source}`)
    }

    // Process each target directory for this source
    for (const targetDir of targetDirs) {
      // Get the full target directory and ensure it exists
      const targetDirPath = path.join(websiteSrcDir, targetDir)
      await fs.ensureDir(targetDirPath)

      // Get the full target path including filename
      const targetPath = path.join(targetDirPath, sourceFileName)

      // Create the relative symlink from target to source
      const relativeSourcePath = path.relative(targetDirPath, sourcePath)

      // Remove any existing file or symlink at the target path
      if (await fs.pathExists(targetPath)) {
        await fs.remove(targetPath)
      }

      // Create the symlink
      await fs.symlink(relativeSourcePath, targetPath)
    }
  }
}

const currentFilePath = import.meta.filename
