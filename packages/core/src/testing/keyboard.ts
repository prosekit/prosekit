import { userEvent } from 'vitest/browser'

import { isApple } from '@prosekit/core'

/**
 * @example
 *
 * ```ts
 * await pressKey('mod-1')
 * await pressKey('Backspace')
 * ```
 *
 * @internal
 */

export async function pressKey(input: string) {
  const keys = input.split('-').map((key) => {
    if (key.toLowerCase() === 'mod') {
      return isApple ? 'Meta' : 'Control'
    }
    return key
  })
  const seq: string[] = []
  for (const key of keys) {
    // Press key without releasing it
    seq.push('{' + key + '>}')
  }
  for (const key of keys.toReversed()) {
    // Release a previously pressed key
    seq.push('{/' + key + '}')
  }
  const key = seq.join('')
  return await userEvent.keyboard(seq.join(''))
}

export async function inputText(input: string) {
  return await userEvent.keyboard(input)
}
