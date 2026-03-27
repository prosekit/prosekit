import { JSDOM } from 'jsdom'
import { createEditor } from 'prosekit/core'

import { defineExtension } from '../react/examples/full/extension'
import { sampleContent } from '../react/sample/sample-doc-full'

export function getSampleContentHTML(): string {
  const extension = defineExtension()
  const editor = createEditor({ extension })
  const dom = new JSDOM('')
  const document: Document = dom.window.document
  editor.setContent(sampleContent)
  return editor.getDocHTML({ document })
}
