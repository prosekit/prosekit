import { defineNodeSpec, defineNodeView, union, type Extension, type PlainExtension, type Union } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'
import { createMathInlineInputRule, createMathInlineView, mathInlineSpec, type RenderMathInline } from 'prosemirror-math'

import { defineInputRule } from '../input-rule'

/**
 * @internal
 */
export type MathInlineSpecExtension = Extension<{
  Nodes: {
    mathInline: Attrs
  }
}>

/**
 * @public
 */
export function defineMathInlineSpec(): MathInlineSpecExtension {
  return defineNodeSpec<'mathInline', Attrs>({
    ...mathInlineSpec,
    name: 'mathInline',
  })
}

/**
 * Options for {@link defineMathInlineView}.
 *
 * @internal
 */
export interface MathInlineViewOptions {
  /**
   * The function to render the math inline.
   */
  render: RenderMathInline
}

/**
 * Defines an extension that renders a math inline using a custom node view.
 *
 * @param options
 * @internal
 */
export function defineMathInlineView({ render }: MathInlineViewOptions): Extension {
  return defineNodeView({
    name: 'mathInline',
    constructor: (node, view, getPos, decorations) => {
      return createMathInlineView(render, node, decorations)
    },
  })
}

/**
 * @public
 */
export function defineMathInlineInputRule(): PlainExtension {
  return defineInputRule(createMathInlineInputRule('mathInline'))
}

/**
 * Options for {@link defineMathInline}.
 *
 * @internal
 */
export interface MathInlineOptions {
  /**
   * The function to render the math inline.
   */
  render: RenderMathInline
}

/**
 * @internal
 */
export type MathInlineExtension = Union<[MathInlineSpecExtension]>

/**
 * Defines node `mathInline` and related functionalities.
 *
 * @param options
 * @public
 */
export function defineMathInline(options: MathInlineOptions): MathInlineExtension {
  return union(
    defineMathInlineSpec(),
    defineMathInlineView(options),
    defineMathInlineInputRule(),
  )
}
