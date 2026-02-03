import type { EditorView } from '@prosekit/pm/view'
import { formatHTML } from 'diffable-html-snapshot'

async function readBlobFromClipboard(mimeType: string): Promise<Blob | undefined> {
  const clipboardItems = await navigator.clipboard.read()
  const clipboardItem = clipboardItems[0]
  if (!clipboardItem) {
    return undefined
  }
  if (!clipboardItem.types.includes(mimeType)) {
    return undefined
  }
  return await clipboardItem.getType(mimeType)
}

async function readTextFromClipboard(mimeType: string): Promise<string | undefined> {
  const blob = await readBlobFromClipboard(mimeType)
  if (!blob) {
    return undefined
  }
  return await blob.text()
}

export async function readPlainTextFromClipboard(): Promise<string> {
  return await readTextFromClipboard('text/plain') || ''
}

export async function readHtmlTextFromClipboard(format = true): Promise<string> {
  let html = await readTextFromClipboard('text/html') || ''
  if (format) {
    html = formatHTML(html)
  }
  return html
}

export function pasteFiles(view: EditorView, files: File[]) {
  const clipboardData = new DataTransfer()
  for (const file of files) {
    clipboardData.items.add(file)
  }
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteHTML('<div></div>', event)
}

export function pasteText(view: EditorView, text: string) {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/plain', text)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteText(text, event)
}

export function pasteHTML(view: EditorView, html: string) {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/html', html)
  const event = new ClipboardEvent('paste', { clipboardData })
  view.pasteHTML(html, event)
}
