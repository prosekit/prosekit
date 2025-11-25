import {
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  expectLocatorToNotExist,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('heading')

testStory({ story: 'heading', emptyContent: true }, () => {
  it('input rule', async () => {
    const editor = await waitForEditor()
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
