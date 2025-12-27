import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

describe('addColor', () => {
  it('can add color to text', () => {
    const { editor } = setupTest()

    editor.commands.insertText({ text: 'Hello world' })
    editor.commands.selectAll()
    editor.commands.addColor({ color: 'red' })
    expect(editor.view.state.doc.toJSON()).toMatchInlineSnapshot(`
        {
          "content": [
            {
              "content": [
                {
                  "marks": [
                    {
                      "attrs": {
                        "color": "red",
                      },
                      "type": "color",
                    },
                  ],
                  "text": "Hello world",
                  "type": "text",
                },
              ],
              "type": "paragraph",
            },
          ],
          "type": "doc",
        }
      `)
  })

  it('can add hex color to text', () => {
    const { editor } = setupTest()

    editor.commands.insertText({ text: 'Blue text' })
    editor.commands.selectAll()
    editor.commands.addColor({ color: '#0000ff' })

    const marks = editor.view.state.doc.firstChild?.firstChild?.marks || []
    expect(marks).toHaveLength(1)
    expect(marks[0].type.name).toBe('color')
    expect(marks[0].attrs.color).toBe('#0000ff')
  })

  it('can add rgb color to text', () => {
    const { editor } = setupTest()

    editor.commands.insertText({ text: 'RGB text' })
    editor.commands.selectAll()
    editor.commands.addColor({ color: 'rgb(255, 0, 0)' })

    const marks = editor.view.state.doc.firstChild?.firstChild?.marks || []
    expect(marks).toHaveLength(1)
    expect(marks[0].type.name).toBe('color')
    expect(marks[0].attrs.color).toBe('rgb(255, 0, 0)')
  })
})

describe('removeColor', () => {
  it('can remove color from text', () => {
    const { editor } = setupTest()

    editor.commands.insertText({ text: 'Colored text' })
    editor.commands.selectAll()
    editor.commands.addColor({ color: 'green' })

    // Verify color was added
    let marks = editor.view.state.doc.firstChild?.firstChild?.marks || []
    expect(marks).toHaveLength(1)
    expect(marks[0].type.name).toBe('color')

    // Remove color
    editor.commands.removeColor()

    // Verify color was removed
    marks = editor.view.state.doc.firstChild?.firstChild?.marks || []
    expect(marks).toHaveLength(0)
  })
})
