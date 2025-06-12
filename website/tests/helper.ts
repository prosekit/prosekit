import {
  expect,
  test,
  type Locator,
  type Page,
} from '@playwright/test'
import prettier from 'prettier'

import { exampleMeta } from '../example.meta'

export const IS_APPLE = process.platform === 'darwin'
export const MOD_KEY = IS_APPLE ? 'Meta' : 'Control'

function getExamples(story: string) {
  const examples = exampleMeta.examples.filter(
    (example) => example.story === story,
  )

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
      test.describe('example:' + example.name, () => {
        test.beforeEach(async ({ page }) => {
          await page.goto('stories/' + example.framework + '/' + example.story)
        })
        callback({ example: example.name })
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

export function locateFocusedEditor(page: Page) {
  return page.locator('.ProseMirror.ProseMirror-focused')
}

export async function waitForEditor(page: Page) {
  const locator = locateEditor(page)
  await locator.waitFor({ state: 'visible', timeout: 60_000 })
  return locator
}

export async function getEditorHTML(page: Page) {
  const editor = await waitForEditor(page)
  const html = await editor.innerHTML()
  return await formatHTML(html)
}

export async function getSelectedText(page: Page): Promise<string> {
  return await page.evaluate(() => {
    return window.getSelection()?.toString() || ''
  })
}

export async function getSelectedHtml(page: Page): Promise<string> {
  return await page.evaluate(() => {
    const selection = window.getSelection()
    let output = ''
    if (selection) {
      for (let i = 0; i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(i)
        const div = document.createElement('div')
        div.appendChild(range.cloneContents())
        output += div.innerHTML
      }
    }
    return output
  })
}

async function formatHTML(html: string) {
  return await prettier.format(html, {
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore',
  })
}

/**
 * Hover over an element.
 *
 * This could be more reliable than `locator.hover()` because it sends multiple
 * mouse move events.
 */
export async function hover(locator: Locator, options?: {
  /**
   * A point to use relative to the top-left corner of element padding box. If
   * not specified, points to the center of the element.
   */
  position?: { x: number; y: number }

  /**
   * How many mouse move events to send.
   */
  steps?: number
}) {
  await expect(locator).toBeVisible()
  const box = await getBoundingBox(locator)

  // Coordinates relative to the top-left corner of the element.
  const x = options?.position?.x ?? Math.floor(box.width / 2)
  const y = options?.position?.y ?? Math.floor(box.height / 2)

  const page = locator.page()
  const steps = options?.steps ?? 10
  await page.mouse.move(x + box.x, y + box.y, { steps })
}

export async function emptyEditor(page: Page) {
  const editor = await waitForEditor(page)
  await editor.press(IS_APPLE ? 'Meta+a' : 'Control+a')
  await editor.press('Backspace')
  await editor.press('Backspace')
  await expect(editor).toHaveText('')
}

export async function waitForAnimationEnd(locator: Locator) {
  const handle = await locator.elementHandle()
  await handle?.waitForElementState('stable')
  await handle?.dispose()
}

export async function getBoundingBox(locator: Locator) {
  const box = await locator.boundingBox({ timeout: 3000 })
  return box || { x: 0, y: 0, width: 0, height: 0 }
}

export async function expectEditorToBeFocused(page: Page) {
  await waitForEditor(page)
  await expect(locateFocusedEditor(page)).toBeVisible()
}

export async function expectEditorToBeBlurred(page: Page) {
  await waitForEditor(page)
  await expect(locateFocusedEditor(page)).toBeHidden()
}
