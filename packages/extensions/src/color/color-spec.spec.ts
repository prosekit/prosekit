import formatHTML from 'diffable-html'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

describe('defineColorSpec', () => {
  it('should render color as inline span with style attribute', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        'Default',
        m.color({ color: '#0000ff' }, 'hex'),
        m.color({ color: 'blue' }, 'named'),
        m.color({ color: 'rgb(0, 0, 255)' }, 'rgb'),
        m.color({ color: 'rgba(0 0 255 / 0.5)' }, 'rgba'),
        m.color({ color: 'hsl(240 100% 50% / 0.5)' }, 'hsl'),
        m.color({ color: 'var(--color-variable)' }, 'variable'),
      ),
    )
    editor.set(doc)
    expect(formatHTML(editor.view.dom.innerHTML)).toMatchInlineSnapshot(
      `
      "
      <p>
        Default
        <span style="color: rgb(0, 0, 255);">
          hex
        </span>
        <span style="color: blue;">
          named
        </span>
        <span style="color: rgb(0, 0, 255);">
          rgb
        </span>
        <span style="color: rgba(0, 0, 255, 0.5);">
          rgba
        </span>
        <span style="color: rgba(0, 0, 255, 0.5);">
          hsl
        </span>
        <span style="color: var(--color-variable);">
          variable
        </span>
      </p>
      "
    `,
    )
  })
})
