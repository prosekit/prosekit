import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  expectLocatorToHaveCount,
  testStory,
} from './helpers'

testStoryConsistency('unmount')

testStory('unmount', () => {
  it('unmount', async () => {
    const editor = page.locate('.ProseMirror')
    const button = page.locate('button')
    const buttonAdd = button.filter({ hasText: 'Add editor' })
    const buttonRemove = (no: number) => button.filter({ hasText: `Unmount No.${no}` })
    const placeholder = (text: string) => editor.locate(`p[data-placeholder='${text}']`)

    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder('Editor No.1 of 1')).toBeVisible()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder('Editor No.1 of 2')).toBeVisible()
    await expect.element(placeholder('Editor No.2 of 2')).toBeVisible()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 3)
    await expect.element(placeholder('Editor No.1 of 3')).toBeVisible()
    await expect.element(placeholder('Editor No.2 of 3')).toBeVisible()
    await expect.element(placeholder('Editor No.3 of 3')).toBeVisible()

    await buttonRemove(1).click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder('Editor No.2 of 2')).toBeVisible()
    await expect.element(placeholder('Editor No.3 of 2')).toBeVisible()

    await buttonRemove(3).click()
    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder('Editor No.2 of 1')).toBeVisible()

    await buttonRemove(2).click()
    await expectLocatorToHaveCount(editor, 0)

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder('Editor No.4 of 1')).toBeVisible()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder('Editor No.4 of 2')).toBeVisible()
    await expect.element(placeholder('Editor No.5 of 2')).toBeVisible()
  })
})
