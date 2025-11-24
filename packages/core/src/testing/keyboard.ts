import { userEvent } from 'vitest/browser'

export async function inputText(input: string) {
  return await userEvent.keyboard(input)
}
