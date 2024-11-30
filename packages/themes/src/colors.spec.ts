import {
  describe,
  expect,
  it,
} from 'vitest'

import { replaceColor } from './colors'

describe('replaceColor', () => {
  it('can replace color', () => {
    expect(replaceColor('text-primary')).toMatchInlineSnapshot(
      `"text-zinc-900 dark:text-zinc-50"`,
    )
    expect(replaceColor('text-primary-foreground')).toMatchInlineSnapshot(
      `"text-zinc-50 dark:text-zinc-900"`,
    )

    expect(replaceColor('bg-secondary')).toMatchInlineSnapshot(
      `"bg-zinc-100 dark:bg-zinc-800"`,
    )
    expect(replaceColor('bg-secondary-foreground')).toMatchInlineSnapshot(
      `"bg-zinc-900 dark:bg-zinc-50"`,
    )
  })

  it('can replace multiple colors', () => {
    expect(
      replaceColor(
        'md:hover:border-accent/80 [&_span[data-mention="user"]]:border-border md:hover:ring-offset-destructive-foreground/100',
      ),
    ).toMatchInlineSnapshot(
      `"md:hover:border-gray-200/80 dark:md:hover:border-gray-700/80 [&_span[data-mention="user"]]:border-zinc-200 dark:[&_span[data-mention="user"]]:border-zinc-800 md:hover:ring-offset-zinc-50/100 dark:md:hover:ring-offset-zinc-50/100"`,
    )
  })
})
