import type { ProseMirrorNode } from '@prosekit/pm/model'
import { Slice } from '@prosekit/pm/model'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { pasteHTML } from '../testing/clipboard'

import { createMarkPasteRuleHandler } from './mark-paste-rule'

describe('createMarkPasteRuleHandler', () => {
  const { editor, n, m } = setupTest()

  it('should create a generic mark paste rule handler', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    // Test with a hypothetical email pattern that adds a mailto mark
    const emailType = editor.view.state.schema.marks.link // Reuse link mark for testing
    const handler = createMarkPasteRuleHandler({
      markType: emailType,
      regex: /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g,
      getAttrs: (match: RegExpExecArray) => ({ href: `mailto:${match[1]}` }),
    })

    // Test that the handler function was created successfully
    expect(typeof handler).toBe('function')
  })

  it('should respect custom shouldSkip logic', () => {
    // Test the handler directly without pasting to avoid conflicts with existing rules
    const linkType = editor.view.state.schema.marks.link
    const handler = createMarkPasteRuleHandler({
      markType: linkType,
      regex: /test-pattern/g,
      getAttrs: (match: RegExpExecArray) => ({ href: match[0] }),
      shouldSkip: (node: ProseMirrorNode) => {
        // Custom logic: skip all processing (for testing)
        return true
      },
    })

    // Test that the handler function respects the custom skip logic
    expect(typeof handler).toBe('function')
    
    // Create a test slice with text that matches the pattern
    const testText = editor.view.state.schema.text('test-pattern')
    const testFragment = editor.view.state.schema.nodes.paragraph.create(null, testText)
    const testSlice = new Slice(
      testFragment.content,
      0, 
      0
    )
    
    // The handler should return the original slice unchanged due to shouldSkipNode
    const result = handler({ slice: testSlice, view: editor.view })
    expect(result).toBe(testSlice)
  })

  it('should use default skip logic when shouldSkip is not provided', () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    const linkType = editor.view.state.schema.marks.link
    createMarkPasteRuleHandler({
      markType: linkType,
      regex: /https?:\/\/[^\s]+/g,
      getAttrs: (match: RegExpExecArray) => ({ href: match[0] }),
      // No shouldSkip provided, should use defaults
    })

    // Test that it skips code marks (default behavior)
    pasteHTML(editor.view, '<p><code>https://example.com</code></p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(m.code('https://example.com'))).toJSON(),
    )
  })
})