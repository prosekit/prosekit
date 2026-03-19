import { expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('page')

testStory('page', () => {
  it('should render four pages', async () => {
    await waitForEditor()

    // Wait for the page layout to stabilize (ResizeObserver + microtask)
    const headChunk = page.locate('pm-page-chunk[data-page-head]')
    const getPageCount = () => headChunk.all().length
    await expect.poll(getPageCount, { timeout: 5000 }).toBe(4)
  })
})
