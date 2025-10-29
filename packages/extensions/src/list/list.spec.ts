import {
  createEditor,
  nodeFromHTML,
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
import { formatHTML } from '../testing/format-html'
import {
  htmlFromMarkdown,
  markdownFromHTML,
} from '../testing/markdown'
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
            <input
              type="checkbox"
              checked
            >
            Checked 1
          </p>
        </li>
        <li
          class="prosemirror-flat-list"
          data-list-kind="task"
        >
          <p>
            <input type="checkbox">
            Unchecked 2
          </p>
        </li>
      </ul>
      "
    `)
  })

  it('can generate html that can be parsed by remark', () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(
      n.bullet(n.paragraph('Bullet')),
      n.ordered(n.paragraph('Ordered')),
      n.checked(n.paragraph('Checked')),
      n.unchecked(n.paragraph('Unchecked')),
    )

    editor.set(doc1)
    const html1 = editor.getDocHTML()
    expect(formatHTML(html1)).toMatchInlineSnapshot(
      `
      "
      <div>
        <ul>
          <li
            class="prosemirror-flat-list"
            data-list-kind="bullet"
          >
            <p>
              Bullet
            </p>
          </li>
        </ul>
        <ol>
          <li
            class="prosemirror-flat-list"
            data-list-kind="ordered"
          >
            <p>
              Ordered
            </p>
          </li>
        </ol>
        <ul>
          <li
            class="prosemirror-flat-list"
            data-list-kind="task"
            data-list-checked
          >
            <p>
              <input
                type="checkbox"
                checked
              >
              Checked
            </p>
          </li>
          <li
            class="prosemirror-flat-list"
            data-list-kind="task"
          >
            <p>
              <input type="checkbox">
              Unchecked
            </p>
          </li>
        </ul>
      </div>
      "
    `,
    )

    const markdown1 = markdownFromHTML(html1.replaceAll('<p>', '').replaceAll('</p>', ''))
    expect(markdown1).toMatchInlineSnapshot(`
      "* Bullet

      1. Ordered

      * [x] Checked
      * [ ] Unchecked
      "
    `)

    const html2 = htmlFromMarkdown(markdown1)
    expect(formatHTML(html2)).toMatchInlineSnapshot(`
      "
      <ul>
        <li>
          Bullet
        </li>
      </ul>
      <ol>
        <li>
          Ordered
        </li>
      </ol>
      <ul class="contains-task-list">
        <li class="task-list-item">
          <input
            type="checkbox"
            checked
            disabled
          >
          Checked
        </li>
        <li class="task-list-item">
          <input
            type="checkbox"
            disabled
          >
          Unchecked
        </li>
      </ul>
      "
    `)

    const doc2 = nodeFromHTML(html2, { schema: editor.schema })
    expect(doc2.toJSON()).toEqual(doc1.toJSON())
  })
})
