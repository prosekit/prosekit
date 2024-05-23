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
    expect(replaceThemes(code)).toMatchInlineSnapshot(`
      "
      const App = () => (
        <div class='ProseMirror relative box-border min-h-full flex-1 overflow-auto bg-white dark:bg-neutral-900 px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'>
          <div class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 h-9 px-3'></div>
        </div>
      );"
    `)
  })
})
