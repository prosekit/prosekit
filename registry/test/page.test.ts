import { expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('page', { shouldWaitForImageToLoad: true })

testStory('page', () => {
  it('should render four pages', async () => {
    await waitForEditor()

    const headChunk = page.locate('pm-page-chunk[data-page-head]')
    const getPageCount = () => headChunk.elements().length
    await expect.poll(getPageCount, { timeout: 5000 }).toBe(4)
  })
})
