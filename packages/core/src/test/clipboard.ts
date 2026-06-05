import type { EditorView } from '@prosekit/pm/view'

/**
 * Pastes plain text into the editor.
 *
 * @example
 *
 * ```ts
 * pasteText(editor.view, 'Hello')
 * ```
 *
 * @internal
 */
export function pasteText(view: EditorView, text: string): void {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/plain', text)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteText(text, event)
}

/**
 * Pastes HTML into the editor.
 *
 * @example
 *
 * ```ts
 * pasteHTML(editor.view, '<p>Hello <strong>world</strong></p>')
 * ```
 *
 * @internal
 */
export function pasteHTML(view: EditorView, html: string): void {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/html', html)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteHTML(html, event)
}

/**
 * Pastes files into the editor.
 *
 * @example
 *
 * ```ts
 * pasteFiles(editor.view, [new File(['hi'], 'hi.txt')])
 * ```
 *
 * @internal
 */
export function pasteFiles(view: EditorView, files: File[]): void {
  const clipboardData = new DataTransfer()
  for (const file of files) {
    clipboardData.items.add(file)
  }
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteHTML('<div></div>', event)
}

async function readBlobFromClipboard(mimeType: string): Promise<Blob | undefined> {
  const clipboardItems = await navigator.clipboard.read()
  const clipboardItem = clipboardItems[0]
  if (!clipboardItem) {
    return
  }
  if (!clipboardItem.types.includes(mimeType)) {
    return
  }
  return await clipboardItem.getType(mimeType)
}

async function readTextFromClipboard(mimeType: string): Promise<string | undefined> {
  const blob = await readBlobFromClipboard(mimeType)
  if (!blob) {
    return
  }
  return await blob.text()
}

/**
 * Reads plain text from the clipboard.
 *
 * @example
 *
 * ```ts
 * const text = await readPlainTextFromClipboard()
 * ```
 *
 * @internal
 */
export async function readPlainTextFromClipboard(): Promise<string> {
  return await readTextFromClipboard('text/plain') || ''
}

/**
 * Reads raw HTML from the clipboard.
 *
 * @example
 *
 * ```ts
 * const html = await readHtmlTextFromClipboard()
 * ```
 *
 * @internal
 */
export async function readHtmlTextFromClipboard(): Promise<string> {
  return await readTextFromClipboard('text/html') || ''
}
