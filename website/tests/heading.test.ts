import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  locateEditor,
  testStory,
} from './helper'

testStory('heading', () => {
  test('default content', async ({ page }) => {
    const editor = locateEditor(page)

    await expect(editor.locator('h1')).toBeVisible()
    await expect(editor.locator('h2')).not.toBeVisible()
    await expect(editor.locator('h3')).not.toBeVisible()
    await expect(editor.locator('h4')).not.toBeVisible()
    await expect(editor.locator('h5')).not.toBeVisible()
    await expect(editor.locator('h6')).not.toBeVisible()
  })

  test('input rule', async ({ page }) => {
    const editor = locateEditor(page)
    await emptyEditor(page)
    await editor.click()

    await expect(editor.locator('h1')).not.toBeVisible()
    await expect(editor.locator('h2')).not.toBeVisible()

    await page.keyboard.press('#')
    await page.keyboard.press(' ')
    await page.keyboard.type('Heading Level 1')

    await expect(editor.locator('h1')).toBeVisible()
    await expect(editor.locator('h1')).toHaveText('Heading Level 1')

    await page.keyboard.press('Enter')
    await page.keyboard.type('## Heading Level 2')

    await expect(editor.locator('h2')).toBeVisible()
    await expect(editor.locator('h2')).toHaveText('Heading Level 2')
  })
})
