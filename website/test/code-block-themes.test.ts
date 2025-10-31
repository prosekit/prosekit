import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('code-block-themes')

testStory('code-block-themes', () => {
  it('code-block-themes', async () => {
    const editor = await waitForEditor()
    const pre = editor.locate('pre').first()
    await expect.element(pre).toBeVisible()

    const javascriptToken = page.locate('span', { hasText: 'JavaScript' })
    await expect.element(javascriptToken).toBeVisible()

    const themeSelectLocator = page.locate('#code-block-theme-selector')
    await expect.element(themeSelectLocator).toBeVisible()
    const themeSelect = themeSelectLocator.element() as HTMLSelectElement

    await selectTheme('nord')
    await expectTokenColor('rgb(163, 190, 140)')

    await selectTheme('min-dark')
    await expectTokenColor('rgb(255, 171, 112)')

    await selectTheme('github-dark')
    await expectTokenColor('rgb(158, 203, 255)')

    async function selectTheme(value: string) {
      await userEvent.selectOptions(themeSelect, value)
    }

    async function expectTokenColor(expected: string) {
      await expect.poll(() => {
        const element = javascriptToken.element()
        return window.getComputedStyle(element).color
      }).toBe(expected)
    }
  })
})
