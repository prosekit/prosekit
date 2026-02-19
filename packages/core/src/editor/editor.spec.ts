import { describe, expect, it } from 'vitest'

import { insertText } from '../commands/insert-text.ts'
import { wrap } from '../commands/wrap.ts'
import { defineTestExtension, setupTest } from '../testing/index.ts'
import type { NodeJSON } from '../types/model.ts'

import { createEditor } from './editor.ts'

describe('createEditor', () => {
  it('can mount the editor', () => {
    const div = document.body.appendChild(document.createElement('div'))
    const extension = defineTestExtension()
    const editor = createEditor({ extension })
    editor.mount(div)
    expect(div.outerHTML).toMatchInlineSnapshot(
      `"<div contenteditable="true" translate="no" class="ProseMirror"><p><br class="ProseMirror-trailingBreak"></p></div>"`,
    )
  })

  it('can get and update state', () => {
    const extension = defineTestExtension()
    const editor = createEditor({ extension })

    const update = (text: string) => {
      const s1 = editor.state
      const s2 = s1.apply(s1.tr.insertText(text, 1))
      editor.updateState(s2)
      const s3 = editor.state

      expect(s3).toBe(s2)
      expect(s2).not.toEqual(s1)

      return s3
    }

    const expectStateEqual = (fn: VoidFunction) => {
      const s1 = editor.state
      fn()
      const s2 = editor.state
      expect(s1).toBe(s2)
    }

    const expectStateNotEqual = (fn: VoidFunction) => {
      const s1 = editor.state
      fn()
      const s2 = editor.state
      expect(s1).not.toEqual(s2)
    }

    // Initial state
    expect(editor.state).toBeDefined()
    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`""`)

    // Update state before mounting
    expectStateNotEqual(() => update('1'))
    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`"1"`)

    // Mount editor
    const div = document.body.appendChild(document.createElement('div'))
    expectStateEqual(() => editor.mount(div))
    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`"1"`)

    // Update state after mounting
    expectStateNotEqual(() => update('2'))
    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`"21"`)

    // Unmount editor
    expectStateEqual(() => editor.unmount())
    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`"21"`)

    // Update state after unmounting
    expectStateNotEqual(() => update('3'))
    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`"321"`)

    // Re-mount editor
    expectStateEqual(() => editor.mount(div))
    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`"321"`)

    // Update state after re-mounting
    expectStateNotEqual(() => update('4'))
    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`"4321"`)
  })

  it('can update document and selection', () => {
    const extension = defineTestExtension()
    const editor = createEditor({ extension })

    expect(editor.state.doc.textContent).toMatchInlineSnapshot(`""`)

    editor.setContent('foo')
    expect(editor.state.toJSON()).toMatchInlineSnapshot(`
      {
        "doc": {
          "content": [
            {
              "content": [
                {
                  "text": "foo",
                  "type": "text",
                },
              ],
              "type": "paragraph",
            },
          ],
          "type": "doc",
        },
        "selection": {
          "anchor": 1,
          "head": 1,
          "type": "text",
        },
      }
    `)

    editor.setContent(
      {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'bar' }],
          },
        ],
      },
      'end',
    )
    expect(editor.state.toJSON()).toMatchInlineSnapshot(`
      {
        "doc": {
          "content": [
            {
              "content": [
                {
                  "text": "bar",
                  "type": "text",
                },
              ],
              "type": "paragraph",
            },
          ],
          "type": "doc",
        },
        "selection": {
          "anchor": 4,
          "head": 4,
          "type": "text",
        },
      }
    `)
  })

  it('can refuse invalid document', () => {
    const extension = defineTestExtension()
    const editor = createEditor({ extension })

    const invalidDoc: NodeJSON = {
      type: 'doc',
      content: [{ type: 'text', text: 'bar aaa aa' }],
    }
    expect(() => editor.setContent(invalidDoc)).toThrow()
  })

  it('can execute commands', () => {
    const { editor } = setupTest()

    expect(editor.exec(insertText({ text: 'foo' }))).toBe(true)
    expect(editor.state.doc.textContent).toBe('foo')

    expect(editor.commands.insertText({ text: 'bar' })).toBe(true)
    expect(editor.state.doc.textContent).toBe('foobar')

    expect(editor.exec(wrap({ type: 'paragraph' }))).toBe(false)
    expect(editor.commands.wrap({ type: 'paragraph' })).toBe(false)

    expect(editor.canExec(wrap({ type: 'paragraph' }))).toBe(false)
    expect(editor.commands.wrap.canExec({ type: 'paragraph' })).toBe(false)
  })
})
