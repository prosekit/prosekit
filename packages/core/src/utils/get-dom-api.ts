function getGlobalBrowserDocument() {
  if (typeof document !== 'undefined') {
    return document
  }

  if (typeof globalThis !== 'undefined' && globalThis.document) {
    return globalThis.document
  }
}

function getGlobalBrowserWindow() {
  if (typeof window !== 'undefined') {
    return window
  }

  if (typeof globalThis !== 'undefined' && globalThis.window) {
    return globalThis.window
  }
}

export function getBrowserDocument() {
  const doc = getGlobalBrowserDocument()

  if (doc) {
    return doc
  }

  return getGlobalBrowserWindow()?.document
}

export function getBrowserWindow() {
  const win = getGlobalBrowserWindow()

  if (win) {
    return win
  }

  return getGlobalBrowserDocument()?.defaultView
}
