import { userEvent } from 'vitest/browser'

import { isApple } from '@prosekit/core'

export async function inputText(input: string) {
  return await userEvent.keyboard(input)
}
