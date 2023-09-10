import { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { shortcuts } from '../../../config/unocss-shortcut.mjs'

import { vfs } from './virtual-file-system'

export async function genIconsCss() {
  const text =
    `This file is generated from ${currentFilename}` +
    '\n\n' +
    Object.values(shortcuts)
      .filter((name) => name.startsWith('i-'))
      .sort()
      .join('\n') +
    '\n'

  await vfs.updateText('website/components/icons-css/icons-css.txt', text)
}

const currentFilename = basename(fileURLToPath(import.meta.url))
