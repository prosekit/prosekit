import diffableHtml from 'diffable-html'
import {
  expect,
  type ExpectPollOptions,
} from 'vitest'
import {
  page,
  userEvent,
  type Locator,
} from 'vitest/browser'

export {
  hover,
  unhover,
} from './mouse'

export {
  collapseSelection,
  extendSelection,
  getSelectedHtml,
  getSelectedText,
  moveSelection,
} from './selection'

export { testStory } from './test-story'

const IS_APPLE = window.navigator.userAgent.includes('Mac')
export const MOD_KEY = IS_APPLE ? 'Meta' : 'Control'

export function locateEditor(): Locator {
  return page.locate('div.ProseMirror')
}

export function locateFocusedEditor(): Locator {
  return page.locate('div.ProseMirror.ProseMirror-focused')
}

export async function waitForEditor(): Promise<Locator> {
  const locator = locateEditor()
  await expect.element(locator).toBeVisible()
  return locator
}

export async function expectEditorToBeFocused(): Promise<void> {
  await waitForEditor()
  await expect.element(locateFocusedEditor()).toBeVisible()
}

interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export async function emptyEditor(options?: { editor?: Locator }) {
  const editor = options?.editor ?? (await waitForEditor())
  await focusEditor({ editor })
  await userEvent.keyboard(`{${MOD_KEY}>}{a}{/${MOD_KEY}}`)
  await userEvent.keyboard('{Backspace}')
  await userEvent.keyboard('{Backspace}')
}

export async function expectLocatorToHaveCount(locator: Locator, count: number, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    return locator.elements()
  }, options).toHaveLength(count)
}

export async function expectLocatorToNotExist(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    return locator
  }, options).not.toBeInTheDocument()
}

export async function expectLocatorToBeHidden(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    const elements = locator.elements()
    return elements.some((element) => isElementVisible(element))
  }, options).toBe(false)
}

export function getBoundingBox(locator: Locator): BoundingBox {
  const element = locator.element()
  const rect = element.getBoundingClientRect()
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  }
}

function isElementVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) {
    return false
  }

  if (element instanceof HTMLElement) {
    const style = window.getComputedStyle(element)
    if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) {
      return false
    }
  }

  return true
}

export function getEditorHTML(): string {
  const editor = locateEditor()
  const html = editor.element().innerHTML
  return formatHTML(html)
}

function formatHTML(html: string) {
  return diffableHtml(html)
}

export async function focusEditor(options?: { editor?: Locator }) {
  const editor = options?.editor ?? (await waitForEditor())
  editor.element().focus()
}

export async function pasteHtmlToEditor(
  html: string,
  options?: { editor?: Locator },
) {
  const editor = options?.editor ?? (await waitForEditor())
  const element = editor.element()
  element.focus()

  const data = new DataTransfer()
  data.setData('text/html', html)

  const event = new ClipboardEvent('paste', {
    clipboardData: data,
    bubbles: true,
    cancelable: true,
  })

  element.dispatchEvent(event)
}
