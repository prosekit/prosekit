import { formatHTML } from './format-html'

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
