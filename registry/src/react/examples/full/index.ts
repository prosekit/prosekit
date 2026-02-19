export { default as ExampleEditor } from './editor'
import { createEditor, type NodeJSON } from 'prosekit/core'

import { sampleContent } from '../../sample/sample-doc-full'

import { defineExtension } from './extension'

/**
 * Renders a ProseMirror document JSON object to an HTML string.
 *
 * This is useful for server-side rendering.
 *
 * @example
 *
 * ```js
 * import { JSDOM } from 'jsdom'
 * const dom = new JSDOM('')
 * const document = dom.window.document
 * const html = renderHTML(document, myContentJSON)
 * ```
 */
export function renderHTML(document: Document, content: NodeJSON = sampleContent): string {
  const extension = defineExtension()
  const editor = createEditor({ extension })
  editor.setContent(content)
  return editor.getDocHTML({ document })
}
