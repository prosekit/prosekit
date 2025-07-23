import {
  createEditor,
  union,
} from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { defineDoc } from '../doc'
import { defineParagraph } from '../paragraph'
import { setupTest } from '../testing'
import { defineText } from '../text'

import { defineList } from './index'

describe('defineList', () => {
  it('can add list node', () => {
    const extension = union(
      defineList(),
      defineDoc(),
      defineText(),
      defineParagraph(),
    )
    const editor = createEditor({ extension })
    const schema = editor.schema
    const nodes = Object.keys(schema.nodes)
    expect(nodes.includes('list')).toBe(true)
  })

  it('can copy lists as native HTML <li> elements', async () => {
    const { editor, n, copy } = setupTest()

    const copyAndGetHTML = async (doc: ProseMirrorNode) => {
      editor.set(doc)
      editor.commands.selectAll()
      const { html } = await copy()
      return html
    }

    expect(
      await copyAndGetHTML(
        n.doc(
          n.bullet(n.paragraph('Bullet 1')),
          n.bullet(n.paragraph('Bullet 2')),
        ),
      ),
    ).toMatchInlineSnapshot(`
      "
      <ul data-pm-slice="0 0 []">
        <li
          class="prosemirror-flat-list"
          data-list-kind="bullet"
        >
          <p>
            Bullet 1
          </p>
        </li>
        <li
          class="prosemirror-flat-list"
          data-list-kind="bullet"
        >
          <p>
            Bullet 2
          </p>
        </li>
      </ul>
      "
    `)

    expect(
      await copyAndGetHTML(
        n.doc(
          n.ordered(n.paragraph('Ordered 1')),
          n.ordered(n.paragraph('Ordered 2')),
        ),
      ),
    ).toMatchInlineSnapshot(`
      "
      <ol data-pm-slice="0 0 []">
        <li
          class="prosemirror-flat-list"
          data-list-kind="ordered"
        >
          <p>
            Ordered 1
          </p>
        </li>
        <li
          class="prosemirror-flat-list"
          data-list-kind="ordered"
        >
          <p>
            Ordered 2
          </p>
        </li>
      </ol>
      "
    `)

    expect(
      await copyAndGetHTML(
        n.doc(
          n.checked(n.paragraph('Checked 1')),
          n.unchecked(n.paragraph('Unchecked 2')),
        ),
      ),
    ).toMatchInlineSnapshot(`
      "
      <ul data-pm-slice="0 0 []">
        <li
          class="prosemirror-flat-list"
          data-list-kind="task"
          data-list-checked
        >
          <p>
            Checked 1
          </p>
        </li>
        <li
          class="prosemirror-flat-list"
          data-list-kind="task"
        >
          <p>
            Unchecked 2
          </p>
        </li>
      </ul>
      "
    `)
  })
})
