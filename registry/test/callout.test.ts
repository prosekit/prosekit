import { expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { emptyEditor, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('callout')

testStory('callout', () => {
  it('should create callout via > [!NOTE] input rule', async () => {
    const editor = await waitForEditor()
    await emptyEditor()

    // Use escaped brackets for userEvent keyboard
    await userEvent.keyboard('> {[}!NOTE{]} ')

    const callout = editor.locate('[data-callout]')
    await expect.element(callout).toBeVisible()
    await expect.element(callout).toHaveAttribute('data-callout-variant', 'note')
  })
})
