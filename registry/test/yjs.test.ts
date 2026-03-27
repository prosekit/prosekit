import { expect, it } from 'vitest'

import { emptyEditor, expectLocatorToHaveCount, inputText, locateEditor, testStory, testStoryConsistency } from './helpers'

testStoryConsistency('yjs')

testStory('yjs', () => {
  it('synchronizes content across two editors', async () => {
    const editors = locateEditor()
    await expectLocatorToHaveCount(editors, 2)

    const editorA = editors.nth(0)
    const editorB = editors.nth(1)

    await emptyEditor({ editor: editorA })
    editorA.element().focus()
    await expect.element(editorA).toHaveFocus()
    await inputText('Hello')

    await expect.element(editorA).toHaveTextContent('Hello')
    await expect.element(editorB).toHaveTextContent('Hello')

    await emptyEditor({ editor: editorB })
    editorB.element().focus()
    await expect.element(editorB).toHaveFocus()
    await inputText('World')

    await expect.element(editorA).toHaveTextContent('World')
    await expect.element(editorB).toHaveTextContent('World')
  })
})
