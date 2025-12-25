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
    const atomBlock = editor.locate('[data-atom-block-view="true"]')

    await expectLocatorToHaveCount(atomBlock, 1)
    await expect.element(atomBlock.getByTestId('atom-block-view-label')).toHaveTextContent('Atom Block View')
  })
})
