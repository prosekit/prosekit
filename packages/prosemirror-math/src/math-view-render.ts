import type { Node } from 'prosemirror-model'
import type { Decoration } from 'prosemirror-view'

import { hasCursorInsideDecoration } from './cursor-inside-plugin'

type RenderMath = (text: string, element: HTMLElement) => void

export function createMathViewRender(
  renderMath: RenderMath,
  source: HTMLElement,
  display: HTMLElement,
) {
  let prevNode: Node | undefined
  let prevText: string | undefined
  let prevSelected: boolean | undefined

  function updateDisplay(node: Node) {
    if (node === prevNode) return
    prevNode = node

    const text = node.textContent
    if (text === prevText) return
    prevText = text

    renderMath(text, display)
  }

  function updateStyle(decorations: readonly Decoration[]): void {
    const selected = hasCursorInsideDecoration(decorations)
    if (selected === prevSelected) return
    prevSelected = selected

    // When the math node is selected, show the source code.
    // Otherwise, show the rendered result.
    source.style.display = selected ? '' : 'none'
    display.style.display = selected ? 'none' : ''
  }

  return function updateMathView(
    node: Node,
    decorations: readonly Decoration[],
  ): void {
    updateDisplay(node)
    updateStyle(decorations)
  }
}
