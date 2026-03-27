import { basename } from 'node:path'

import { vfs } from '@prosekit/dev'

export async function updateSampleHTML(): Promise<void> {
  const { getSampleContentHTML } = await import('./get-sample-html')
  const html = getSampleContentHTML()
  const comment = `<!-- This file is generated from ${currentFilename} -->`
  vfs.updateText('website/src/components/ui/landing/editor-showcase/sample-content.gen.html', `${comment}\n${html}`)
}

const currentFilename = basename(import.meta.filename)
