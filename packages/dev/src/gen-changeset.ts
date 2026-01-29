import path from 'node:path'

import read from '@changesets/read'

import { ROOT_DIR } from './root-dir'
import { vfs } from './vfs'

export async function genChangeset(): Promise<void> {
  const changesets = await read(ROOT_DIR)

  for (const changeset of changesets) {
    if (!changeset.releases.some((release) => release.name === 'prosekit')) {
      changeset.releases.push({
        name: 'prosekit',
        type: 'patch',
      })

      const filePath = path.join('.changeset', `${changeset.id}.md`)
      const fileText = await vfs.read(filePath)
      const newFileText = fileText.replace(`---`, `---\n'prosekit': patch`)
      vfs.updateText(filePath, newFileText)
    }
  }
}
