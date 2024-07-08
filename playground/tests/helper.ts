import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
import prettier from 'prettier'

import { exampleMeta } from '../example.meta'

export const IS_APPLE = process.platform === 'darwin'
export const MOD_KEY = IS_APPLE ? 'Meta' : 'Control'

function getExamples(story: string) {
  const examples = exampleMeta.examples
    .filter((example) => example.story === story)
    .map((example) => example.name)

  if (examples.length === 0) {
    throw new Error(`No examples found for story "${story}"`)
  }

  return examples
}

function testSingleStory(
  story: string,
  callback: (options: { example: string }) => void,
) {
  test.describe('story:' + story, () => {
    for (const example of getExamples(story)) {
      test.describe('example:' + example, () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(example)
        })

        callback({ example })
      })
    }
  })
}

export function testStory(
  story: string | string[],
  callback: (options: { example: string }) => void,
) {
  const stories = Array.isArray(story) ? story : [story]

  for (const story of stories) {
    testSingleStory(story, callback)
  }
}

export function locateEditor(page: Page) {
  return page.locator('.ProseMirror')
}

export async function waitForEditor(page: Page) {
  const locator = locateEditor(page)
  await locator.waitFor({ state: 'visible' })
  return locator
}

export async function getEditorHTML(page: Page) {
  const editor = await waitForEditor(page)
  const html = await editor.innerHTML()
  return await formatHTML(html)
}

async function formatHTML(html: string) {
  return await prettier.format(html, {
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore',
  })
}

export async function emptyEditor(page: Page) {
  const editor = await waitForEditor(page)
  await editor.press(IS_APPLE ? 'Meta+a' : 'Control+a')
  await editor.press('Backspace')
  await editor.press('Backspace')
  await expect(editor).toHaveText('')
}
