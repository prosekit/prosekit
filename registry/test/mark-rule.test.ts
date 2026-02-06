import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { inputText, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('mark-rule')

testStory('mark-rule', () => {
  it('hashtag', async () => {
    const editor = await waitForEditor()

    await editor.click()

    const getLinkContent = () => (
      editor.locate('a').elements().map((element) => element.textContent ?? '')
    )

    await inputText('Fix ')
    await expect.poll(() => getLinkContent()).toEqual([])

    await inputText('#')
    await expect.poll(() => getLinkContent()).toEqual([])

    await inputText('1')
    await expect.poll(() => getLinkContent()).toEqual(['#1'])

    await inputText('2')
    await expect.poll(() => getLinkContent()).toEqual(['#12'])

    await inputText(' and ')
    await expect.poll(() => getLinkContent()).toEqual(['#12'])

    await inputText('#')
    await expect.poll(() => getLinkContent()).toEqual(['#12'])

    await inputText('3')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#3'])

    await inputText('4')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#34'])

    await inputText('.')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#34'])

    await keyboard.press('Backspace')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#34'])

    await keyboard.press('Backspace')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#3'])

    await inputText('5')
    await expect.poll(() => getLinkContent()).toEqual(['#12', '#35'])

    await expect.poll(() => editor.element().textContent ?? '').toBe('Fix #12 and #35')
  })

  it('link', async () => {
    const editor = await waitForEditor()

    await editor.click()

    const getLinkContent = () => (
      editor.locate('a').elements().map((element) => element.textContent ?? '')
    )

    await inputText('Hello ')
    await expect.poll(() => getLinkContent()).toEqual([])

    await inputText('www.go')
    await expect.poll(() => getLinkContent()).toEqual([])

    await inputText('o')
    await expect.poll(() => getLinkContent()).toEqual(['www.goo'])

    await inputText('g')
    await expect.poll(() => getLinkContent()).toEqual(['www.goog'])

    await inputText('l')
    await expect.poll(() => getLinkContent()).toEqual([])

    await inputText('e')
    await expect.poll(() => getLinkContent()).toEqual(['www.google'])

    await inputText('.com')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com'])

    await inputText('/')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/'])

    await inputText('?')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/'])

    await inputText('a')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/?a'])

    await inputText('.')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/?a'])

    await inputText(' ')
    await expect.poll(() => getLinkContent()).toEqual(['www.google.com/?a'])

    await inputText('https://example.com/subpath?query#fragment')
    await expect.poll(() => getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])

    await inputText('.')
    await expect.poll(() => getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])

    await inputText(' ')
    await expect.poll(() => getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])
  })
})
