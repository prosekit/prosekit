import { defineNodeSpec, defineNodeView, union, type Extension, type PlainExtension, type Union } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'
import { createMathBlockView, mathBlockEnterRule, mathBlockSpec, type RenderMathBlock } from 'prosemirror-math'

import { defineEnterRule } from '../enter-rule'

/**
 * @internal
 */
export type MathBlockSpecExtension = Extension<{
  Nodes: {
    mathBlock: Attrs
  }
}>

/**
 * @internal
 */
export function defineMathBlockSpec(): MathBlockSpecExtension {
  return defineNodeSpec<'mathBlock', Attrs>({
    ...mathBlockSpec,
    name: 'mathBlock',
  })
}

/**
 * Options for {@link defineMathBlockView}.
 *
 * @internal
 */
export interface MathBlockViewOptions {
  /**
   * The function to render the math block.
   */
  render: RenderMathBlock
}

/**
 * Defines an extension that renders a math block using a custom node view.
 *
 * @param options
 * @internal
 */
export function defineMathBlockView({ render }: MathBlockViewOptions): Extension {
  return defineNodeView({
    name: 'mathBlock',
    constructor: (node, view, getPos, decorations) => {
      return createMathBlockView(render, node, decorations)
    },
  })
}

/**
 * @internal
 */
export function defineMathBlockEnterRule(): PlainExtension {
  return defineEnterRule(mathBlockEnterRule)
}

/**
 * Options for {@link defineMathBlock}.
 *
 * @internal
 */
export interface MathBlockOptions {
  /**
   * The function to render the math block.
   */
  render: RenderMathBlock
}

/**
 * @internal
 */
export type MathBlockExtension = Union<[MathBlockSpecExtension]>

/**
 * Defines node `mathBlock` and related functionalities.
 *
 * @param options
 * @public
 */
export function defineMathBlock(options: MathBlockOptions): MathBlockExtension {
  return union(
    defineMathBlockSpec(),
    defineMathBlockView(options),
    defineMathBlockEnterRule(),
  )
}
