import { expect, it } from 'vitest'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

/**
 * Parses the red, green and blue channels from a CSS color string returned by
 * `getComputedStyle`, which is always in `rgb(...)` / `rgba(...)` form.
 */
function parseRgb(color: string): [number, number, number] {
  const nums = color.match(/-?[\d.]+/g)?.map(Number)
  if (!nums || nums.length < 3) {
    throw new Error(`Cannot parse color: ${color}`)
  }
  return [nums[0], nums[1], nums[2]]
}

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

    const isRedDominant = () => {
      const backgroundColor = window.getComputedStyle(inputElement).backgroundColor
      const [r, g, b] = parseRgb(backgroundColor)
      return r > g && r > b
    }

    await expect.poll(() => isRedDominant(), { timeout: 8000 }).toBe(true)
  })
})
