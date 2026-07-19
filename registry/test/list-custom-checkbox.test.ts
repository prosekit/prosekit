import Color from 'colorjs.io'
import { expect, it, vi } from 'vitest'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('list-custom-checkbox')

testStory('list-custom-checkbox', () => {
  it('list-custom-checkbox', async () => {
    const editor = await waitForEditor()

    const checkedItem = editor.locate('.prosemirror-flat-list', { hasText: 'Completed Task' })
    await expect.element(checkedItem).toBeVisible()

    const checkedItemInput = checkedItem.locate('input')
    await expect.element(checkedItemInput).toBeVisible()

    const inputElement = checkedItemInput.element() as HTMLInputElement
    expect(inputElement.checked).toBe(true)

    const expectRedDominant = () => {
      const backgroundColor = window.getComputedStyle(inputElement).backgroundColor
      const parsed = new Color(backgroundColor)
      let [r, g, b] = parsed.to('srgb').coords
      r ||= 0
      g ||= 0
      b ||= 0
      expect(r).toBeGreaterThan(0)
      expect(r).toBeGreaterThan(g)
      expect(r).toBeGreaterThan(b)
    }

    await vi.waitFor(expectRedDominant)
  })
})
