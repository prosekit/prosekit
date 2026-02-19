import type { Node } from 'prosemirror-model'
import type { Decoration } from 'prosemirror-view'

import { hasCursorInsideDecoration } from './cursor-inside-plugin.ts'

type RenderMath = (text: string, element: HTMLElement) => void

export function createMathViewRender(
  renderMath: RenderMath,
  source: HTMLElement,
  display: HTMLElement,
  inline: boolean,
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
    display.style.display = selected ? 'none' : ''
    if (!inline) {
      source.style.display = selected ? '' : 'none'
    } else {
      // For inline source code, we don't use `display: none` because we need
      // the source text rendered in the DOM to ensure the text cursor can be
      // placed correctly.
      Object.assign(
        source.style,
        selected ? visibleInlineSourceStyle : hiddenInlineSourceStyle,
      )
    }
  }

  return function updateMathView(
    node: Node,
    decorations: readonly Decoration[],
  ): void {
    updateDisplay(node)
    updateStyle(decorations)
  }
}

const hiddenInlineSourceStyle: Partial<CSSStyleDeclaration> = {
  display: 'inline-flex',
  opacity: '0',
  pointerEvents: 'none',
  maxWidth: '0',
  maxHeight: '0',
  overflow: 'hidden',
}

const visibleInlineSourceStyle: Partial<CSSStyleDeclaration> = {
  display: 'inline-flex',
  opacity: '1',
  pointerEvents: '',
  maxWidth: '',
  maxHeight: '',
  overflow: '',
}
