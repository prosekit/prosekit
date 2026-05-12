import { union, type Union } from '@prosekit/core'
import type { RenderMathBlock, RenderMathInline } from 'prosemirror-math'

import { defineMathBlock, type MathBlockExtension } from './math-block.ts'
import { defineMathInline, type MathInlineExtension } from './math-inline.ts'
import { defineMathPlugin } from './math-plugin.ts'

export type MathExtension = Union<[MathInlineExtension, MathBlockExtension]>

/**
 * Options for {@link defineMath}.
 */
export interface MathOptions {
  /**
   * The function to render the math block.
   */
  renderMathBlock: RenderMathBlock

  /**
   * The function to render the math inline.
   */
  renderMathInline: RenderMathInline
}

export function defineMath(options: MathOptions): MathExtension {
  return union(
    defineMathBlock({ render: options.renderMathBlock }),
    defineMathInline({ render: options.renderMathInline }),
    defineMathPlugin(),
  )
}
