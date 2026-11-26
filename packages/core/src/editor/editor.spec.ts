import { Plugin, PluginKey } from '@prosekit/pm/state'
import { describe, expect, it, vi } from 'vitest'

import { insertText } from '../commands/insert-text.ts'
import { wrap } from '../commands/wrap.ts'
import { definePlugin } from '../extensions/plugin.ts'
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

  it('can unmount the editor when the view throws on destroy', () => {
    const { editor } = setupTest()
    const view = editor.view
    vi.spyOn(view, 'destroy').mockImplementation(() => {
      throw new Error('destroy failed')
    })

    expect(() => editor.unmount()).toThrow('destroy failed')
    expect(editor.mounted).toBe(false)

    editor.mount(document.body.appendChild(document.createElement('div')))
    expect(editor.mounted).toBe(true)
    expect(editor.view).not.toBe(view)
  })

  it('can remove an extension after the editor is unmounted', () => {
    const { editor } = setupTest()
    const key = new PluginKey('test')

    const plugin1 = new Plugin({ key })
    const dispose1 = editor.use(definePlugin(plugin1))
    expect(key.get(editor.state)).toBe(plugin1)

    editor.unmount()
    dispose1()
    expect(key.get(editor.state)).toBeUndefined()

    editor.mount(document.body.appendChild(document.createElement('div')))
    expect(key.get(editor.state)).toBeUndefined()

    const plugin2 = new Plugin({ key })
    editor.use(definePlugin(plugin2))
    expect(key.get(editor.state)).toBe(plugin2)
  })

  it('warns when updating extensions on a destroyed view', () => {
    const { editor } = setupTest()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const key = new PluginKey('test')
    const plugin = new Plugin({ key })

    const dispose = editor.use(definePlugin(plugin))
    editor.view.destroy()
    dispose()

    expect(warn).toHaveBeenCalledOnce()
    expect(key.get(editor.state)).toBe(plugin)
    warn.mockRestore()
  })
})
