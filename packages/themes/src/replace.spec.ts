import dedent from 'dedent'
import { describe, expect, it } from 'vitest'

import { replaceThemes } from './replace'

describe('replaceThemes', () => {
  it('can replace class names', () => {
    const code = dedent`
      import { Themes } from '@prosekit/themes'

      const App = () => (
        <div class={Themes.EDITOR_CONTENT}>
          <div class={Themes.INLINE_MENU_LINK_REMOVE_BUTTON}></div>
        </div>
      );
      `
    expect(replaceThemes(code)).toMatchInlineSnapshot()
  })
})
