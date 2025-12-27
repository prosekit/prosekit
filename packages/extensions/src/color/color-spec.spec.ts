import pick from 'just-pick'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

it('should define color mark with correct schema', () => {
  const { editor } = setupTest()

  const marks = editor.view.state.schema.spec.marks.toObject()
  const colorMark = pick(marks, ['color'])

  expect(colorMark).toMatchObject({
    color: {
      attrs: {
        color: {
          validate: 'string',
        },
      },
      parseDOM: [
        {
          style: 'color',
        },
      ],
    },
  })
  expect(colorMark.color.toDOM).toBeDefined()
})

describe('defineColorSpec', () => {
  it('should render color as inline span with style attribute', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        'Default text ',
        m.color({ color: 'blue' }, 'Blue text'),
      ),
    )
    editor.set(doc)
    expect(editor.view.dom.innerHTML).toMatchInlineSnapshot(`"<p>Default text <span style="color: blue;">Blue text</span></p>"`)
  })

  it('should render color as block div when not inline', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.blockquote(
        n.p(
          'Default paragraph',
        ),
        m.color(
          { color: '#0000ff' },
          n.p(
            'Colored paragraph',
          ),
        ),
      ),
    )
    editor.set(doc)
    expect(editor.view.dom.innerHTML).toMatchInlineSnapshot()
  })
})
