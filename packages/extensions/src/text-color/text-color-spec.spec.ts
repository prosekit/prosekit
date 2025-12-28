import formatHTML from 'diffable-html'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

describe('defineTextColorSpec', () => {
  it('should render color as inline span with style attribute', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        'Default',
        m.textColor({ color: '#0000ff' }, 'hex'),
        m.textColor({ color: 'blue' }, 'named'),
        m.textColor({ color: 'rgb(0, 0, 255)' }, 'rgb'),
        m.textColor({ color: 'rgba(0 0 255 / 0.5)' }, 'rgba'),
        m.textColor({ color: 'hsl(240 100% 50% / 0.5)' }, 'hsl'),
        m.textColor({ color: 'var(--color-variable)' }, 'variable'),
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
