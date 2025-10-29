import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  expectEditorToBeFocused,
  expectLocatorToHaveCount,
  getBoundingBox,
  testStory,
  waitForEditor,
} from './helpers'

testStory('gap-cursor', () => {
  it('shows gap cursor between stacked images', async () => {
    const editor = await waitForEditor()

    const gap = page.locate('.ProseMirror-gapcursor')

    // There are two stacked images in the default content
    const images = editor.locate('img')
    await expectLocatorToHaveCount(images, 2)

    const img1 = images.nth(0)
    const img2 = images.nth(1)

    await expect.element(img1).toBeVisible()
    await expect.element(img2).toBeVisible()

    // Compute the bounding boxes so we can later assert the gap cursor position
    const box1 = getBoundingBox(img1)
    const box2 = getBoundingBox(img2)

    // Focus editor first to ensure gap cursor decoration can appear
    await img1.click()
    await expectEditorToBeFocused()

    // Move the selection into the gap between the images
    await expectLocatorToHaveCount(gap, 0)
    await userEvent.keyboard('{ArrowDown}')

    // Expect the gap cursor decoration to exist
    await expectLocatorToHaveCount(gap, 1)

    const gapBox = getBoundingBox(gap)
    expect(gapBox.y).toBeGreaterThanOrEqual(Math.floor(box1.y + box1.height))
    expect(gapBox.y).toBeLessThan(Math.ceil(box2.y + box2.height))
  })
})
