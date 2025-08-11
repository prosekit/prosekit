import {
  expect,
  test,
} from '@playwright/test'

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

    await expect(checkedItemInput, { message: 'Expect the checkbox input has a red background color' })
      .toHaveCSS('background-color', /rgba?\((\d{3})(,\s*\d{1,2}){2}(,\s*\d+})?\)/)
  })
})
