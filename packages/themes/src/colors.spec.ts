import {
  describe,
  expect,
  it,
} from 'vitest'

import { replaceColor } from './colors'

describe('replaceColor', () => {
  it('can replace color', () => {
    expect(replaceColor('text-primary')).toMatchInlineSnapshot(
      `"text-gray-900 dark:text-gray-50"`,
    )
    expect(replaceColor('text-primary-foreground')).toMatchInlineSnapshot(
      `"text-gray-50 dark:text-gray-900"`,
    )

    expect(replaceColor('bg-secondary')).toMatchInlineSnapshot(
      `"bg-gray-100 dark:bg-gray-800"`,
    )
    expect(replaceColor('bg-secondary-foreground')).toMatchInlineSnapshot(
      `"bg-gray-900 dark:bg-gray-50"`,
    )
  })

  it('can replace multiple colors', () => {
    expect(
      replaceColor(
        'md:hover:border-accent/80 [&_span[data-mention="user"]]:border-border md:hover:ring-offset-destructive-foreground/100',
      ),
    ).toMatchInlineSnapshot(
      `"md:hover:border-gray-200/80 dark:md:hover:border-gray-700/80 [&_span[data-mention="user"]]:border-gray-200 dark:[&_span[data-mention="user"]]:border-gray-800 md:hover:ring-offset-gray-50/100 dark:md:hover:ring-offset-gray-50/100"`,
    )
  })
})
