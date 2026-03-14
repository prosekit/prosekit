import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'
import { page } from 'vitest/browser'

import { expectLocatorToHaveCount, inputText, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('hard-break')

testStory('hard-break', () => {
  it('insert hard break via toolbar and keyboard', async () => {
    const editor = await waitForEditor()

    // Count existing line breaks in default content
    const brLocator = editor.locate('br')
    const brsBefore = brLocator.elements().length

    // Insert via toolbar
    const button = page.getByRole('button', { name: 'Insert Hard Break' })
    await expect.element(button).toBeVisible()
    await button.click()
    await expectLocatorToHaveCount(brLocator, brsBefore + 1)

    // Insert via keyboard: Shift+Enter
    await expect.element(editor).not.toHaveTextContent(/AAAAA/)
    await expect.element(editor).not.toHaveTextContent(/BBBBB/)
    await editor.locate('p').first().click()
    await inputText('AAAAA')
    await keyboard.press('Shift+Enter')
    await inputText('BBBBB')
    await expectLocatorToHaveCount(brLocator, brsBefore + 2)
    await expect.element(editor).toHaveTextContent(/AAAAA/)
    await expect.element(editor).toHaveTextContent(/BBBBB/)
  })
})
