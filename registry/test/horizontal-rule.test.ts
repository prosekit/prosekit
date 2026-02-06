import { expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { emptyEditor, expectLocatorToHaveCount, inputText, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('horizontal-rule')

testStory('horizontal-rule', () => {
  it('insert divider and continue typing', async () => {
    const editor = await waitForEditor()
    const dividerButton = page.getByRole('button', { name: 'Divider' })

    await emptyEditor()
    await editor.click()
    await inputText('Hello')

    await expect.element(dividerButton).toBeVisible()
    await dividerButton.click()

    const hr = editor.locate('hr')
    await expect.element(hr).toBeVisible()
    await expectLocatorToHaveCount(editor.locate('hr'), 1)

    // Typing should continue after the divider in a new paragraph
    await inputText('World')
    await expect.element(editor.locate('p', { hasText: 'Hello' })).toBeVisible()
    await expect.element(editor.locate('p', { hasText: 'World' })).toBeVisible()
  })
})
