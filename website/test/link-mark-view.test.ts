import { sleep } from '@ocavue/utils'
import {
  expect,
  it,
} from 'vitest'

import {
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('link-mark-view')

testStory('link-mark-view', () => {
  it('link-mark-view', async () => {
    const editor = await waitForEditor()
    const link = editor.locate('[data-mark-view-root="true"] a')

    await expect.element(link).toBeVisible()
    const linkElement = link.element()

    const getLinkColor = () => {
      return window.getComputedStyle(linkElement).getPropertyValue('color')
    }

    // Expect the color to change at least 2 times
    const colors = new Set<string>()
    for (let i = 0; i < 100; i++) {
      colors.add(getLinkColor())
      if (colors.size > 2) {
        break
      }
      await sleep(100)
    }
    expect(colors.size).toBeGreaterThan(2)
  })
})
