import type { Node as ProseMirrorNode } from 'prosemirror-model'
import type { Decoration, NodeView } from 'prosemirror-view'

import { createElement } from './create-element.ts'
import { createMathViewRender } from './math-view-render.ts'

/**
 * The function to render a math block.
 *
 * @param text - The text of the math block. For example, a TeX expression.
 * @param element - A `<div>` element to render the math block.
 */
export type RenderMathBlock = (text: string, element: HTMLElement) => void

export function createMathBlockView(renderMathBlock: RenderMathBlock, node: ProseMirrorNode, decorations: readonly Decoration[]): NodeView {
  const code = createElement('code')
  const source = createElement('pre', 'prosemirror-math-source', code)
  const display = createElement('div', 'prosemirror-math-display')
  const dom = createElement('div', 'prosemirror-math-block', source, display)

  const render = createMathViewRender(renderMathBlock, source, display)

  render(node, decorations)

  return {
    dom,
    contentDOM: code,
    update: (node, decorations) => {
      render(node, decorations)
      return true
    },
  }
}
