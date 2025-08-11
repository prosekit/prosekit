import {
  expect,
  test,
  type Locator,
} from '@playwright/test'
import { parseCSS } from 'colorizr'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('list-custom-checkbox', () => {
  test.fail('list-custom-checkbox', async ({ page }) => {
    const editor = await waitForEditor(page)

    const checkedItem = editor.locator('.prosemirror-flat-list', { hasText: 'Completed Task' })
    await expect(checkedItem).toBeVisible()

    const checkedItemInput = checkedItem.locator('input')
    await expect(checkedItemInput).toHaveAttribute('checked')

    await expect(() => expectRedBackgroundColor(checkedItemInput)).toPass({ timeout: 8_000 })
  })
})

async function expectRedBackgroundColor(locator: Locator) {
  const backgroundColor = await locator.evaluate(el => {
    const style = window.getComputedStyle(el)
    return style.backgroundColor
  })

  const parsed = parseCSS(backgroundColor, 'rgb')
  const { r, g, b } = parsed

  expect(r >= g + 50 && r >= b + 50, `Red component should dominate in the color ${backgroundColor}`).toBe(true)
}
