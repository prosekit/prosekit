import {
  isElement,
  sleep,
} from '@ocavue/utils'

export function getSelection(): Selection {
  const selection = window.getSelection()
  if (!selection) {
    throw new Error('Unable to access the current document selection.')
  }
  return selection
}

// Wait for the selection to be updated
async function waitForSelectionUpdate(): Promise<void> {
  return await sleep(1)
}

export async function collapseSelection(direction: 'start' | 'end'): Promise<void> {
  const selection = getSelection()
  if (direction === 'start') {
    selection.collapseToStart()
  } else {
    selection.collapseToEnd()
  }

  await waitForSelectionUpdate()
}

export async function moveSelection(direction: 'forward' | 'backward', count: number, granularity: 'character' | 'line' = 'character'): Promise<void> {
  const selection = getSelection()
  for (let i = 0; i < count; i++) {
    selection.modify('move', direction, granularity)
  }

  await waitForSelectionUpdate()
}

/**
 * Moves the text selection to the start of the first editable element.
 */
export async function moveSelectionToStart(): Promise<void> {
  const selection = window.getSelection()
  if (!selection) {
    throw new Error('Unable to access the current document selection.')
  }
  const node = selection.anchorNode
  if (!node) {
    throw new Error('Unable to find the node that contains the selection.')
  }
  const element = isElement(node) ? node : node.parentElement
  if (!element) {
    throw new Error('Unable to find the element that contains the selection.')
  }

  const editable = element.closest('[contenteditable="true"]')
  if (!editable) {
    throw new Error('Unable to find the contenteditable ancestor of the selection.')
  }

  const range = document.createRange()
  range.selectNodeContents(editable)
  range.collapse(true)

  selection.removeAllRanges()
  selection.addRange(range)

  await waitForSelectionUpdate()
}

export async function extendSelection(direction: 'forward' | 'backward', count: number): Promise<void> {
  const selection = getSelection()
  for (let i = 0; i < count; i++) {
    selection.modify('extend', direction, 'character')
  }

  await waitForSelectionUpdate()
}

export function getSelectedText(): string {
  const selection = getSelection()
  return selection.toString()
}

export function getSelectedHtml(): string {
  const selection = getSelection()
  let output = ''
  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i)
    const container = document.createElement('div')
    container.appendChild(range.cloneContents())
    output += container.innerHTML
  }
  return output
}
