import type { EditorView } from '@prosekit/pm/view'

/**
 * @internal
 */
export function pasteText(view: EditorView, text: string) {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/plain', text)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteText(text, event)
}

/**
 * @internal
 */
export function pasteHTML(view: EditorView, html: string) {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/html', html)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteHTML(html, event)
}
