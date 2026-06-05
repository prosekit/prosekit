import type { EditorView } from '@prosekit/pm/view'

/**
 * Simulates pasting plain text into the given editor view.
 *
 * It builds a synthetic clipboard `paste` event carrying `text` as
 * `text/plain` data and feeds it through `view.pasteText`, so the editor runs
 * the same paste-handling pipeline (including paste rules) that a real user
 * paste would trigger. Intended for use in tests.
 *
 * @example
 *
 * ```ts
 * pasteText(editor.view, 'Hello world')
 * ```
 *
 * @param view - The editor view to paste into.
 * @param text - The plain text content to paste.
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
 * Simulates pasting HTML into the given editor view.
 *
 * It builds a synthetic clipboard `paste` event carrying `html` as
 * `text/html` data and feeds it through `view.pasteHTML`, so the editor runs
 * the same paste-handling pipeline (including paste rules) that a real user
 * paste would trigger. Intended for use in tests.
 *
 * @example
 *
 * ```ts
 * pasteHTML(editor.view, '<p>Hello <strong>world</strong></p>')
 * ```
 *
 * @param view - The editor view to paste into.
 * @param html - The HTML markup to paste.
 *
 * @internal
 */
export function pasteHTML(view: EditorView, html: string): void {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/html', html)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteHTML(html, event)
}
