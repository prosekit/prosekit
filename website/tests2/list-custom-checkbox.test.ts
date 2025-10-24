import Color from 'colorjs.io'
import {
  expect,
  it,
} from 'vitest'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('list-custom-checkbox', () => {
  it('list-custom-checkbox', async () => {
    const editor = await waitForEditor()

    const checkedItem = editor.locate('.prosemirror-flat-list', { hasText: 'Completed Task' })
    await expect.element(checkedItem).toBeVisible()

    const checkedItemInput = checkedItem.locate('input')
    await expect.element(checkedItemInput).toBeVisible()

    const inputElement = checkedItemInput.element() as HTMLInputElement
    expect(inputElement.checked).toBe(true)

    const isRedDominant = () => {
      const backgroundColor = window.getComputedStyle(inputElement).backgroundColor
      const parsed = new Color(backgroundColor)
      const { r, g, b } = parsed.srgb
      return r > g && r > b
    }

    await expect.poll(() => isRedDominant(), { timeout: 8000 }).toBe(true)
  })
})
