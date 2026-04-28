import { formatHTML } from 'diffable-html-snapshot'
import { expect } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'
import { page, type Locator } from 'vitest/browser'

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
}
