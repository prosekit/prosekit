import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  expectLocatorToHaveCount,
  locateEditor,
  testStory,
} from './editor'

testStory('image-view', () => {
  it('renders default images', async () => {
    const editor = locateEditor()
    const images = editor.locate('img')

    await expectLocatorToHaveCount(images, 2)
    await expect.element(images.nth(0)).toHaveAttribute('src', 'https://static.photos/white/200x200/1')
    await expect.element(images.nth(1)).toHaveAttribute('src', 'https://static.photos/yellow/640x360/42')
  })
})

testStory(['full', 'image-view'], () => {
  it('selects image on click', async () => {
    const editor = locateEditor()
    const resizable = editor.locate('prosekit-resizable-root', { has: page.locate('img') }).first()

    await expect.element(resizable).toBeVisible()
    const element = resizable.element()
    element.scrollIntoView({ block: 'center', inline: 'center' })
    await expect.element(resizable).not.toHaveAttribute('data-selected', '')

    await resizable.click()
    await expect.element(resizable).toHaveAttribute('data-selected', '')
  })
})
