import {
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  emptyEditor,
  expectLocatorToHaveCount,
  locateEditor,
  testStory,
  testStoryConsistency,
} from './helpers'

testStoryConsistency('yjs')

testStory('yjs', () => {
  it('synchronizes content across two editors', async () => {
    const editors = locateEditor()
    await expectLocatorToHaveCount(editors, 2)

    const editorA = editors.nth(0)
    const editorB = editors.nth(1)

    await emptyEditor({ editor: editorA })
    await userEvent.type(editorA, 'Hello')

    await expect.element(editorB).toHaveTextContent('Hello')

    await emptyEditor({ editor: editorB })
    await userEvent.type(editorB, 'World')

    await expect.element(editorA).toHaveTextContent('World')
  })
})
