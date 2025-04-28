import dedent from 'dedent'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { replaceThemesWith } from './replace'
import { Themes } from './themes'

describe('replaceThemesWith', () => {
  it('can replace class names', () => {
    const code = dedent`
      
      const App = () => (
        <div class="CSS_EDITOR_CONTENT">
          <div class="CSS_INLINE_MENU_LINK_REMOVE_BUTTON"></div>
        </div>
      );
      `
    expect(replaceThemesWith(code, Themes)).toMatchInlineSnapshot(`
      "const App = () => (
        <div class='ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500'>
          <div class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-9 px-3'></div>
        </div>
      );"
    `)
  })
})
