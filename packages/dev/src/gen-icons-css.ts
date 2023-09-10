import { shortcuts } from '../../../config/unocss-shortcut.mjs'

import { vfs } from './virtual-file-system'

export async function genIconsCss() {
  const text =
    Object.values(shortcuts)
      .filter((name) => name.startsWith('i-'))
      .sort()
      .join('\n') + '\n'
  await vfs.updateText('website/components/icons-css/icons-css.txt', text)
}
