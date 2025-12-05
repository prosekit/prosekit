import { expect } from 'vitest'
import {
  page,
  type Locator,
} from 'vitest/browser'
import { keyboard } from 'vitest-browser-commands/playwright'

import { formatHTML } from './format-html'

const IS_APPLE = window.navigator.userAgent.includes('Mac')
export const MOD_KEY = IS_APPLE ? 'Meta' : 'Control'

export function locateEditor(): Locator {
  return page.locate('div.ProseMirror')
}

function locateFocusedEditor(): Locator {
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

export async function emptyEditor(options?: { editor?: Locator }) {
  const editor = options?.editor ?? (await waitForEditor())
  await focusEditor({ editor })
  await keyboard.press('ControlOrMeta+a')
  await keyboard.press('ControlOrMeta+a')
  await keyboard.press('Backspace')
  await keyboard.press('Backspace')
}

export function getEditorHTML(): string {
  const editor = locateEditor()
  const html = editor.element().innerHTML
  return formatHTML(html)
}

export async function focusEditor(options?: { editor?: Locator }) {
  const editor = options?.editor ?? (await waitForEditor())
  editor.element().focus()
  await expect.element(editor).toHaveFocus()
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
