import { expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { expectLocatorToHaveCount, testStory, testStoryConsistency } from './helpers'

testStoryConsistency('unmount', {
  setup: async () => {
    const button = page.locate('button')
    const buttonAdd = button.filter({ hasText: 'Add editor' })
    await expect.element(buttonAdd).toBeInTheDocument()
    await buttonAdd.click()
  },
})

testStory('unmount', () => {
  it('unmount', async () => {
    const editor = page.locate('.ProseMirror')
    const button = page.locate('button')
    const buttonAdd = button.filter({ hasText: 'Add editor' })
    const buttonRemove = (no: number) => button.filter({ hasText: `Unmount No.${no}` })
    const placeholder = (no: number) => editor.locate(`p[data-placeholder='Editor No.${no}']`)

    await expectLocatorToHaveCount(editor, 0)

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder(1)).toBeInTheDocument()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder(1)).toBeInTheDocument()
    await expect.element(placeholder(2)).toBeInTheDocument()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 3)
    await expect.element(placeholder(1)).toBeInTheDocument()
    await expect.element(placeholder(2)).toBeInTheDocument()
    await expect.element(placeholder(3)).toBeInTheDocument()

    await buttonRemove(1).click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder(1)).not.toBeInTheDocument()
    await expect.element(placeholder(2)).toBeInTheDocument()
    await expect.element(placeholder(3)).toBeInTheDocument()

    await buttonRemove(3).click()
    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder(1)).not.toBeInTheDocument()
    await expect.element(placeholder(2)).toBeInTheDocument()
    await expect.element(placeholder(3)).not.toBeInTheDocument()

    await buttonRemove(2).click()
    await expectLocatorToHaveCount(editor, 0)

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder(1)).not.toBeInTheDocument()
    await expect.element(placeholder(2)).not.toBeInTheDocument()
    await expect.element(placeholder(3)).not.toBeInTheDocument()
    await expect.element(placeholder(4)).toBeInTheDocument()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder(1)).not.toBeInTheDocument()
    await expect.element(placeholder(2)).not.toBeInTheDocument()
    await expect.element(placeholder(3)).not.toBeInTheDocument()
    await expect.element(placeholder(4)).toBeInTheDocument()
    await expect.element(placeholder(5)).toBeInTheDocument()
  })
})
