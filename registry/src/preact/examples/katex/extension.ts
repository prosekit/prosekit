import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineMath } from 'prosekit/extensions/math'

import { renderKaTeXMathBlock, renderKaTeXMathInline } from '../../sample/katex'

export function defineExtension() {
  return union(defineBasicExtension(), defineMath({ renderMathBlock: renderKaTeXMathBlock, renderMathInline: renderKaTeXMathInline }))
}

export type EditorExtension = ReturnType<typeof defineExtension>
