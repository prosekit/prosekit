import {
  expect,
  test,
} from '@playwright/test'

import {
  locateEditor,
  testStory,
} from './helper'

testStory('image-view', ({ example }) => {
  test('renders default images', async ({ page }) => {
    const editor = locateEditor(page)
    const images = editor.locator('img')

    await expect(images).toHaveCount(2)
    await expect(images.first()).toHaveAttribute('src', /placehold\.co\/150x150/)
    await expect(images.nth(1)).toHaveAttribute('src', /placehold\.co\/150x75/)
  })

  test('selects image on click', async ({ page }) => {
    test.skip(example === 'solid-image-view', 'Solid image-view selection not yet supported')
    const editor = locateEditor(page)
    const resizable = editor.locator('prosekit-resizable-root').first()

    await expect(resizable).toBeVisible()
    await expect(resizable).not.toHaveAttribute('data-selected', '')
    await resizable.click()
    await expect(resizable).toHaveAttribute('data-selected', '')
  })
})
