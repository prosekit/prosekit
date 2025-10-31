import {
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  emptyEditor,
  expectLocatorToNotExist,
  locateEditor,
  testStory,
  waitForEditor,
} from './helpers'

testStoryConsistency('heading')

testStory('heading', () => {
  it('default content', async () => {
    const editor = await waitForEditor()

    await expect.element(editor.locate('h1')).toBeVisible()
    await expectLocatorToNotExist(editor.locate('h2'))
    await expectLocatorToNotExist(editor.locate('h3'))
    await expectLocatorToNotExist(editor.locate('h4'))
    await expectLocatorToNotExist(editor.locate('h5'))
    await expectLocatorToNotExist(editor.locate('h6'))
  })

  it('input rule', async () => {
    const editor = locateEditor()
    await emptyEditor()
    await editor.click()

    await expectLocatorToNotExist(editor.locate('h1'))
    await expectLocatorToNotExist(editor.locate('h2'))

    await userEvent.keyboard('#')
    await userEvent.keyboard(' ')
    await userEvent.type(editor, 'Heading Level 1')

    await expect.element(editor.locate('h1')).toBeVisible()
    await expect.element(editor.locate('h1')).toHaveTextContent('Heading Level 1')

    await userEvent.keyboard('{Enter}')
    await userEvent.type(editor, '## Heading Level 2')

    await expect.element(editor.locate('h2')).toBeVisible()
    await expect.element(editor.locate('h2')).toHaveTextContent('Heading Level 2')
  })
})
