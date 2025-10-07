import {
  expect,
  test,
} from '@playwright/test'

import {
  locateEditor,
  testStory,
} from './helper'

testStory('image-view', () => {
  test('renders default images', async ({ page }) => {
    const editor = locateEditor(page)
    const images = editor.locator('img')

    await expect(images).toHaveCount(2)
    await expect(images.nth(0)).toHaveAttribute('src', 'https://static.photos/white/200x200/1')
    await expect(images.nth(1)).toHaveAttribute('src', 'https://static.photos/yellow/640x360/42')
  })

  test('selects image on click', async ({ page }) => {
    const editor = locateEditor(page)
    const resizable = editor.locator('prosekit-resizable-root').first()

    await expect(resizable).toBeVisible()
    await expect(resizable).not.toHaveAttribute('data-selected', '')
    await resizable.click()
    await expect(resizable).toHaveAttribute('data-selected', '')
  })
})
