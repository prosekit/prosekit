import { describe, expect, it } from 'vitest'

import { createEditor } from '../editor/editor'
import { defineTestExtension } from '../testing'

import type { DefaultStateOptions } from './default-state'

describe('defineDefaultState', () => {
  const docJSON = {
    type: 'doc',
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'docJSON' }] },
    ],
  }
  const docHTMLString = '<p>docHTMLString</p>'
  const docHTMLElement = document.createElement('p')
  docHTMLElement.innerHTML = 'docHTMLElement'

  it('can set the default document', () => {
    const run = (options: DefaultStateOptions): string => {
      const extension = defineTestExtension()
      const editor = createEditor({ extension, ...options })
      return editor.state.doc.toString()
    }

    expect(run({ defaultContent: docJSON })).toContain('docJSON')
    expect(run({ defaultContent: docHTMLString })).toContain('docHTMLString')
    expect(run({ defaultContent: docHTMLElement })).toContain('docHTMLElement')
  })

  it('can set the default selection', () => {
    const extension = defineTestExtension()
    const editor = createEditor({
      extension,
      defaultContent: docJSON,
      defaultSelection: {
        anchor: 4,
        head: 1,
        type: 'text',
      },
    })

    expect(editor.state.selection.toJSON()).toEqual({
      anchor: 4,
      head: 1,
      type: 'text',
    })
    expect(editor.state.selection.content().content.toString()).toEqual(
      '<paragraph("doc")>',
    )
  })
})
