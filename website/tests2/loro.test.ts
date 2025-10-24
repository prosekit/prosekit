import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  emptyEditor,
  expectLocatorToHaveCount,
  testStory,
} from './helper'

testStory('loro', () => {
  it('synchronizes content across two editors', async () => {
    const editors = page.locate('div.ProseMirror')
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
