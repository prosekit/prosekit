import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  expectLocatorToNotExist,
  selectText,
  testStory,
  waitForEditor,
} from './helpers'

// TODO: enable testStoryConsistency once we have update examples from all frameworks.
// testStoryConsistency('text-color')

testStory({
  story: 'text-color',
  // TODO: remove the frameworks option once we have update examples from all frameworks.
  frameworks: ['preact'],
}, () => {
  it('change and clear text color via inline menu', async ({}) => {
    const editor = await waitForEditor()

    // Select the word "some"
    await selectText(editor, 7, 11, 'some')

    // Inline color menu should appear; change to blue
    const blueBtn = page.getByRole('button', { name: 'blue' })
    await expect.element(blueBtn).toBeVisible()
    await blueBtn.click()

    // Assert the selected text now renders with blue color
    const someSpan = editor.locate('span[style*="color:"]', { hasText: 'some' })
    await expect.element(someSpan).toBeVisible()
    await expect.element(someSpan).toHaveStyle({ color: 'rgb(59, 130, 246)' })

    // Select again and clear color using "default"
    await selectText(editor, 7, 11, 'some')
    const defaultBtn = page.getByRole('button', { name: 'default' })
    await expect.element(defaultBtn).toBeVisible()
    await defaultBtn.click()

    // Expect no colored span wraps the word "some"
    await expectLocatorToNotExist(someSpan)
  })
})
