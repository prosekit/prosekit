import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing'

import { findParentNode } from './find-parent-node'

describe('findParentNode', () => {
  it('finds parent node with cursor directly inside', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.p('foo'), n.p('bar<a>')))
    const found = findParentNode(
      (node) => node.type.name === 'paragraph',
      editor.state.selection.$anchor,
    )
    expect(found).toMatchInlineSnapshot(`
      {
        "depth": 1,
        "node": {
          "content": [
            {
              "text": "bar",
              "type": "text",
            },
          ],
          "type": "paragraph",
        },
        "pos": 5,
        "start": 6,
      }
    `)
  })

  it('can handle the top-level node', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.p('foo<a>')))

    expect(
      findParentNode(
        (node) => node.type.name === 'doc',
        editor.state.selection.$anchor,
      ),
    ).toMatchInlineSnapshot(`
      {
        "depth": 0,
        "node": {
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
        "pos": 0,
        "start": 0,
      }
    `)
  })
})
