import type { Node as ProseMirrorNode } from 'prosemirror-model'
import type { Decoration, NodeView } from 'prosemirror-view'

import { createElement } from './create-element'
import { createMathViewRender } from './math-view-render'

/**
 * The function to render a math inline.
 *
 * @param text - The text of the math inline. For example, a TeX expression.
 * @param element - A `<span>` element to render the math inline.
 */
export type RenderMathInline = (text: string, element: HTMLElement) => void

export function createMathInlineView(
  renderMathInline: RenderMathInline,
  node: ProseMirrorNode,
  decorations: readonly Decoration[],
): NodeView {
  const source = createElement('code', 'prosekit-math-source')
  const display = createElement('span', 'prosekit-math-display')
  const dom = createElement('span', 'prosekit-math-inline', source, display)

  const render = createMathViewRender(renderMathInline, source, display)

  render(node, decorations)

  return {
    dom,
    contentDOM: source,
    update: (node, decorations) => {
      render(node, decorations)
      return true
    },
  }
}
