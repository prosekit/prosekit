import {
  expect,
  it,
} from 'vitest'

import {
  expectLocatorToHaveCount,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('view-adapter')

testStory('view-adapter', () => {
  it('renders atom block with custom node view', async () => {
    const editor = await waitForEditor()
    const atomBlockViews = editor.locate('[data-atom-block-view="true"]')

    await expectLocatorToHaveCount(atomBlockViews, 1)
    await expect.element(atomBlockViews.nth(0)).toHaveTextContent('Atom Block View')
  })
})
