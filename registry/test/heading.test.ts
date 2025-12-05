import {
  expect,
  it,
} from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import {
  expectLocatorToNotExist,
  inputText,
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

    await keyboard.press('#')
    await keyboard.press(' ')
    await inputText('Heading Level 1')

    await expect.element(editor.locate('h1')).toBeVisible()
    await expect.element(editor.locate('h1')).toHaveTextContent('Heading Level 1')

    await keyboard.press('Enter')
    await inputText('## Heading Level 2')

    await expect.element(editor.locate('h2')).toBeVisible()
    await expect.element(editor.locate('h2')).toHaveTextContent('Heading Level 2')
  })
})
