import {
  expect,
  test,
  type ConsoleMessage,
  type Locator,
  type Page,
} from '@playwright/test'
import diffableHtml from 'diffable-html'

import exampleMeta from '../example.meta.json' with { type: 'json' }

const IS_APPLE = process.platform === 'darwin'
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

interface TestStoryCallbackOptions {
  example: string
}

interface TestStoryOptions {
  /**
   * Whether to check for uncaught errors.
   *
   * If `true`, the test will fail if there are uncaught runtime errors.
   *
   * @default true
   */
  checkUncaughtErrors?: boolean

  /**
   * Whether to check for console errors.
   *
   * If `true`, the test will fail if there are console errors.
   *
   * @default true
   */
  checkConsoleErrors?: boolean

  /**
   * Whether to check for console warnings.
   *
   * If `true`, the test will fail if there are console warnings.
   *
   * @default true
   */
  checkConsoleWarnings?: boolean
}

function testSingleStory(
  story: string,
  callback: (options: TestStoryCallbackOptions) => void,
  {
    checkUncaughtErrors = true,
    checkConsoleErrors = true,
    checkConsoleWarnings = true,
  }: TestStoryOptions = {},
) {
  test.describe('story:' + story, () => {
    for (const example of getExamples(story)) {
      test.describe('example:' + example.name, () => {
        const uncaughtErrors: Error[] = []
        const consoleErrors: string[] = []
        const consoleWarnings: string[] = []

        const handlePageError = (error: Error) => {
          uncaughtErrors.push(error)
        }

        const handleConsole = (message: ConsoleMessage) => {
          if (message.type() === 'error') {
            consoleErrors.push(message.text())
          } else if (message.type() === 'warning') {
            consoleWarnings.push(message.text())
          }
        }

        test.beforeEach(async ({ page }) => {
          uncaughtErrors.length = 0
          consoleErrors.length = 0
          consoleWarnings.length = 0

          page.on('pageerror', handlePageError)
          page.on('console', handleConsole)

          await page.goto('-/' + example.framework + '/' + example.story)
        })

        test.afterEach(({ page }) => {
          page.off('pageerror', handlePageError)
          page.off('console', handleConsole)

          if (checkUncaughtErrors) {
            expect(uncaughtErrors, 'Expected no uncaught errors').toEqual([])
          }
          if (checkConsoleErrors) {
            expect(consoleErrors, 'Expected no console errors').toEqual([])
          }
          if (checkConsoleWarnings) {
            expect(consoleWarnings, 'Expected no console warnings').toEqual([])
          }
        })

        callback({ example: example.name })
      })
    }
  })
}

export function testStory(
  story: string | string[],
  callback: (options: TestStoryCallbackOptions) => void,
  options?: TestStoryOptions,
) {
  const stories = Array.isArray(story) ? story : [story]

  for (const story of stories) {
    testSingleStory(story, callback, options)
  }
}

export function locateEditor(page: Page) {
  return page.locator('div.ProseMirror')
}

export function locateFocusedEditor(page: Page) {
  return page.locator('div.ProseMirror.ProseMirror-focused')
}

export async function waitForEditor(page: Page) {
  const locator = locateEditor(page)
  await locator.waitFor({ state: 'visible', timeout: 60_000 })
  return locator
}

export async function getEditorHTML(page: Page) {
  const editor = await waitForEditor(page)
  const html = await editor.innerHTML()
  return formatHTML(html)
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

function formatHTML(html: string) {
  return diffableHtml(html)
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

/**
 * Drag an element over another element.
 *
 * This is more reliable than `locator.dragTo()` because it sends multiple mouse
 * move events.
 */
export async function dragAndDrop(
  startLocator: Locator,
  endLocator: Locator,
  options?: {
    startPosition?: { x: number; y: number }
    endPosition?: { x: number; y: number }
  },
) {
  const page = startLocator.page()

  await hover(startLocator, { position: options?.startPosition })
  await page.mouse.down()
  await hover(endLocator, { position: options?.endPosition })
  await page.mouse.up()
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

export async function expectSelectedTextToBe(page: Page, text: string) {
  const check = async () => {
    const selectedText = await getSelectedText(page)
    expect(selectedText).toEqual(text)
  }
  await expect(check).toPass({ timeout: 1000, intervals: [10, 50, 100] })
}

async function writeTextToClipboard(page: Page, text: string) {
  await page.evaluate(async (t) => {
    await navigator.clipboard.writeText(t)
  }, text)
}

async function writeDataToClipboard(page: Page, data: Record<string, string>) {
  await page.evaluate(async (d) => {
    const clipboardItems = Object.entries(d).map(([type, content]) => {
      const blob = new Blob([content], { type })
      const item = new ClipboardItem({ [type]: blob })
      return item
    })
    await navigator.clipboard.write(clipboardItems)
  }, data)
}

async function writeBlobToClipboard(page: Page, contentType: string, base64: string) {
  await page.evaluate(
    async ([contentType, base64]) => {
      const binaryString = window.atob(base64)
      const len = binaryString.length
      const bytes = new Uint8Array(len)

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const blob = new Blob([bytes], { type: contentType })

      const item = new ClipboardItem({ [blob.type]: blob })
      await navigator.clipboard.write([item])
    },
    [contentType, base64],
  )
}

export async function pasteTextToEditor(page: Page, text: string): Promise<void> {
  await writeTextToClipboard(page, text)
  const editor = await waitForEditor(page)
  await editor.press(`ControlOrMeta+v`)
}

export async function pasteHtmlToEditor(page: Page, html: string): Promise<void> {
  await writeDataToClipboard(page, { 'text/html': html })
  const editor = await waitForEditor(page)
  await editor.press(`ControlOrMeta+v`)
}

export async function pasteFileToEditor(
  page: Page,
  contentType: string,
  base64: string,
): Promise<void> {
  await writeBlobToClipboard(page, contentType, base64)
  const editor = await waitForEditor(page)
  await editor.press(`ControlOrMeta+v`)
}
