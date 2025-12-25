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

testStoryConsistency('badge')

testStory('badge', () => {
  it('renders badges with node views', async () => {
    const editor = await waitForEditor()
    const badges = editor.locate('[data-node-view-root="true"]')

    await expectLocatorToHaveCount(badges, 3)
    await expect.element(badges.nth(0)).toHaveTextContent('Default')
    await expect.element(badges.nth(1)).toHaveTextContent('Primary')
    await expect.element(badges.nth(2)).toHaveTextContent('Success')
  })
})
