import { expect, test } from '@playwright/test'

import { getExamples, waitForEditor } from './helper'

function run(example: string) {
  test('hashtag', async ({ page }) => {
    await page.goto(example)
    const editor = await waitForEditor(page)

    const getLinkContent = async () => {
      const locators = await editor.locator('a').all()
      return await Promise.all(
        locators.map(async (locator) => {
          return await locator.innerText()
        }),
      )
    }

    await editor.pressSequentially('Fix ')
    expect(await getLinkContent()).toEqual([])

    await editor.pressSequentially('#')
    expect(await getLinkContent()).toEqual([])

    await editor.pressSequentially('1')
    expect(await getLinkContent()).toEqual(['#1'])

    await editor.pressSequentially('2')
    expect(await getLinkContent()).toEqual(['#12'])

    await editor.pressSequentially(' and ')
    expect(await getLinkContent()).toEqual(['#12'])

    await editor.pressSequentially('#')
    expect(await getLinkContent()).toEqual(['#12'])

    await editor.pressSequentially('3')
    expect(await getLinkContent()).toEqual(['#12', '#3'])

    await editor.pressSequentially('4')
    expect(await getLinkContent()).toEqual(['#12', '#34'])

    await editor.pressSequentially('.')
    expect(await getLinkContent()).toEqual(['#12', '#34'])

    await editor.press('Backspace')
    expect(await getLinkContent()).toEqual(['#12', '#34'])

    await editor.press('Backspace')
    expect(await getLinkContent()).toEqual(['#12', '#3'])

    await editor.pressSequentially('5')
    expect(await getLinkContent()).toEqual(['#12', '#35'])

    expect(await editor.innerText()).toEqual('Fix #12 and #35')
  })

  test('link', async ({ page }) => {
    await page.goto(example)
    const editor = await waitForEditor(page)

    const getLinkContent = async () => {
      const locators = await editor.locator('a').all()
      return await Promise.all(
        locators.map(async (locator) => {
          return await locator.innerText()
        }),
      )
    }

    await editor.pressSequentially('Hello ')
    expect(await getLinkContent()).toEqual([])

    await editor.pressSequentially('www.go')
    expect(await getLinkContent()).toEqual([])

    await editor.pressSequentially('o')
    expect(await getLinkContent()).toEqual(['www.goo'])

    await editor.pressSequentially('g')
    expect(await getLinkContent()).toEqual(['www.goog'])

    await editor.pressSequentially('l')
    expect(await getLinkContent()).toEqual([])

    await editor.pressSequentially('e')
    expect(await getLinkContent()).toEqual(['www.google'])

    await editor.pressSequentially('.com')
    expect(await getLinkContent()).toEqual(['www.google.com'])

    await editor.pressSequentially('/')
    expect(await getLinkContent()).toEqual(['www.google.com/'])

    await editor.pressSequentially('?')
    expect(await getLinkContent()).toEqual(['www.google.com/'])

    await editor.pressSequentially('a')
    expect(await getLinkContent()).toEqual(['www.google.com/?a'])

    await editor.pressSequentially('.')
    expect(await getLinkContent()).toEqual(['www.google.com/?a'])

    await editor.pressSequentially(' ')
    expect(await getLinkContent()).toEqual(['www.google.com/?a'])

    await editor.pressSequentially('https://example.com/subpath?query#fragment')
    expect(await getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])

    await editor.pressSequentially('.')
    expect(await getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])

    await editor.pressSequentially(' ')
    expect(await getLinkContent()).toEqual([
      'www.google.com/?a',
      'https://example.com/subpath?query#fragment',
    ])
  })
}

for (const example of getExamples('mark-rule')) {
  test.describe(example, () => run(example))
}
