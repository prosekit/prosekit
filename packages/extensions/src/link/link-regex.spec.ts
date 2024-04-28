import { test, it, expect, describe } from 'vitest'

import { LINK_MARK_RE } from './link-regex'

describe('LINK_MARK_RE', () => {
  const run = (str: string) => {
    LINK_MARK_RE.lastIndex = 0
    return LINK_MARK_RE.exec(str)?.[0] ?? null
  }

  const cases = [
    ['Not a link', null],

    ['example.com', 'example.com'],
    ['https://example.com', 'https://example.com'],
    ['Foo https://example.com Bar', 'https://example.com'],
    ['https://example.com/', 'https://example.com/'],
    ['https://example.com/?query=1', 'https://example.com/?query=1'],
    ['https://example.com/#fragment', 'https://example.com/#fragment'],
    [
      'https://example.com/path?query=1#fragment',
      'https://example.com/path?query=1#fragment',
    ],
    [
      'https://example.com/path?query=1#fragment',
      'https://example.com/path?query=1#fragment',
    ],
    [
      'Foo https://example.com/path?query=1#fragment Bar',
      'https://example.com/path?query=1#fragment',
    ],

    // Ignore the period at the end
    ['https://example.com.', 'https://example.com'],
    ['https://example.com.uk', 'https://example.com.uk'],

    // .goog is a TLD
    ['Foo www.goog', 'www.goog'],
    // .googl is not a TLD
    ['Foo www.googl', null],
    // .google is a TLD
    ['Foo www.google', 'www.google'],

    // Don't match ? when there is nothing after it
    ['www.example.com?', 'www.example.com'],
    ['www.example.com/?', 'www.example.com/'],
    ['www.example.com/?=', 'www.example.com/?='],

    // Don't match . when there is nothing after it
    ['www.example.com.', 'www.example.com'],
    ['www.example.com/.', 'www.example.com/'],
    ['www.example.com/.gitignore', 'www.example.com/.gitignore'],

    // with ( and )
    [
      'https://en.wikipedia.org/wiki/Specials_(Unicode_block)',
      'https://en.wikipedia.org/wiki/Specials_(Unicode_block)',
    ],

    // with '
    [
      `https://en.wikipedia.org/wiki/The_Power_of_the_Powerless#Havel's_greengrocer`,
      `https://en.wikipedia.org/wiki/The_Power_of_the_Powerless#Havel's_greengrocer`,
    ],
  ] as const

  it.each(cases)('should handle %s', (str, expected) => {
    expect(run(str)).toBe(expected)
  })
})
