import {
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  expectLocatorToHaveCount,
  locateEditor,
  testStory,
} from './helper'

testStory('drop-cursor', () => {
  it('reorders images by HTML5 drag-and-drop', async () => {
    const editor = locateEditor()

    const images = editor.locate('img')
    await expectLocatorToHaveCount(images, 4)

    const before = images.elements().map((e) => e.getAttribute('src') || '')

    // Ensure all images are unique
    expect(new Set(before).size).toBe(before.length)

    // Drag first image to just before the third image (between the 2nd and 3rd)
    await userEvent.dragAndDrop(
      images.nth(0),
      images.nth(2),
      { targetPosition: { x: 5, y: 5 } },
    )

    const after = images.elements().map((e) => e.getAttribute('src') || '')

    // Expect order: [b, a, c, d]
    expect(after.length).toBeGreaterThanOrEqual(4)
    expect(after[0]).toEqual(before[1])
    expect(after[1]).toEqual(before[0])
    expect(after[2]).toEqual(before[2])
    expect(after[3]).toEqual(before[3])
  })
})
