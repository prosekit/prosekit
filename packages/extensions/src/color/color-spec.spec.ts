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
        'Default text ',
        m.color({ color: 'blue' }, 'Blue text'),
      ),
    )
    editor.set(doc)
    expect(editor.view.dom.innerHTML).toMatchInlineSnapshot(`"<p>Default text <span style="color: blue; background-color: red;">Blue text</span></p>"`)
  })
})
