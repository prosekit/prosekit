import type { Node as ProseMirrorNode } from 'prosemirror-model'
import type { Decoration, NodeView } from 'prosemirror-view'

import { createElement } from './create-element.ts'
import { createMathViewRender } from './math-view-render.ts'

/**
 * The function to render a math inline.
 *
 * @param text - The text of the math inline. For example, a TeX expression.
 * @param element - A `<span>` element to render the math inline.
 */
export type RenderMathInline = (text: string, element: HTMLElement) => void

/**
 * Creates a {@link NodeView} for an inline math node. The view will show a
 * source editor or a rendered display area based on the text cursor position.
 *
 * @param renderMathInline - A function that renders math text (e.g. TeX) into
 * the display element. You can use libraries like [Temml](https://temml.org/)
 * or [KaTeX](https://katex.org/).
 * @param node - The ProseMirror node to render.
 * @param decorations - The decorations applied to the node.
 *
 * @public
 */
export function createMathInlineView(
  renderMathInline: RenderMathInline,
  node: ProseMirrorNode,
  decorations: readonly Decoration[],
): NodeView {
  const code = createElement('code')
  const source = createElement('span', 'prosemirror-math-source', code)
  const display = createElement('span', 'prosemirror-math-display')
  const dom = createElement('span', 'prosemirror-math-inline', source, display)

  const render = createMathViewRender(renderMathInline, source, display, true)

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
