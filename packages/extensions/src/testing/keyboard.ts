import { userEvent } from 'vitest/browser'

export async function inputText(input: string): Promise<void> {
  return await userEvent.keyboard(input)
}
