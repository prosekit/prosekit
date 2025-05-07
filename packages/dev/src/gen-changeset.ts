import path from 'node:path'

import { findRootDir } from './find-root-dir.js'
import { unwrapDefaultExport } from './unwrap-default-export.js'
import { vfs } from './virtual-file-system.js'

export async function genChangeset() {
  const root = await findRootDir()
  const read = unwrapDefaultExport(await import('@changesets/read'))

  const changesets = await read(root)

  for (const changeset of changesets) {
    if (!changeset.releases.some((release) => release.name === 'prosekit')) {
      changeset.releases.push({
        name: 'prosekit',
        type: 'patch',
      })

      const filePath = path.join('.changeset', `${changeset.id}.md`)
      const fileText = await vfs.read(filePath)
      const newFileText = fileText.replace(`---`, `---\n'prosekit': patch`)
      await vfs.updateText(filePath, newFileText)
    }
  }
}
