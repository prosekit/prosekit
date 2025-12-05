import { keyboard } from 'vitest-browser-commands/playwright'

export async function inputText(input: string): Promise<void> {
  return await keyboard.type(input, { delay: 10 })
}
