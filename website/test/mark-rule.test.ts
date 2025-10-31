import {
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  testStory,
  waitForEditor,
} from './helpers'

testStoryConsistency('mark-rule')

testStory('mark-rule', () => {
  it('hashtag', async () => {
    const editor = await waitForEditor()

    await editor.click()

    const getLinkContent = () => (
      editor.locate('a').elements().map((element) => element.textContent ?? '')
    )

    await userEvent.type(editor, 'Fix ')
    await expect.poll(() => getLinkContent()).toEqual([])

    await userEvent.type(editor, '#')
    await expect.poll(() => getLinkContent()).toEqual([])

    await userEvent.type(editor, '1')
    await expect.poll(() => getLinkContent()).toEqual(['#1'])

    await userEvent.type(editor, '2')
    await expect.poll(() => getLinkContent()).toEqual(['#12'])

    await userEvent.type(editor, ' and ')
    await expect.poll(() => getLinkContent()).toEqual(['#12'])

    await userEvent.type(editor, '#')
    await expect.poll(() => getLinkContent()).toEqual(['#12'])

    await userEvent.type(editor, '3')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#3'])

    await userEvent.type(editor, '4')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#34'])

    await userEvent.type(editor, '.')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#34'])

    await userEvent.keyboard('{Backspace}')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#34'])

    await userEvent.keyboard('{Backspace}')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#3'])

    await userEvent.type(editor, '5')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#35'])

    await expect.poll(() => editor.element().textContent ?? '').toBe('Fix #12 and #35')
  })

  it('link', async () => {
    const editor = await waitForEditor()

    await editor.click()

    const getLinkContent = () => (
      editor.locate('a').elements().map((element) => element.textContent ?? '')
    )

    await userEvent.type(editor, 'Hello ')
    await expect.poll(() => getLinkContent()).toEqual([])

    await userEvent.type(editor, 'www.go')
    await expect.poll(() => getLinkContent()).toEqual([])

    await userEvent.type(editor, 'o')
    await expect.poll(() => getLinkContent()).toEqual(['www.goo'])

    await userEvent.type(editor, 'g')
    await expect.poll(() => getLinkContent()).toEqual(['www.goog'])

    await userEvent.type(editor, 'l')
    await expect.poll(() => getLinkContent()).toEqual([])

    await userEvent.type(editor, 'e')
    await expect.poll(() => getLinkContent()).toEqual(['www.google'])

    await userEvent.type(editor, '.com')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com'])

    await userEvent.type(editor, '/')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/'])

    await userEvent.type(editor, '?')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/'])

    await userEvent.type(editor, 'a')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/?a'])

    await userEvent.type(editor, '.')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/?a'])

    await userEvent.type(editor, ' ')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/?a'])

    await userEvent.type(editor, 'https://example.com/subpath?query#fragment')
    await expect.poll(() => getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])

    await userEvent.type(editor, '.')
    await expect.poll(() => getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])

    await userEvent.type(editor, ' ')
    await expect.poll(() => getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])
  })
})
