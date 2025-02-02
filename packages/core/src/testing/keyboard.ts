import { userEvent } from '@vitest/browser/context'

export async function inputText(input: string): Promise<void> {
  return await userEvent.keyboard(input)
}
