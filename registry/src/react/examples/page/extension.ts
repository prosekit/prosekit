import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineMath } from 'prosekit/extensions/math'
import { definePageRendering } from 'prosekit/extensions/page'

import { renderKaTeXMathBlock, renderKaTeXMathInline } from '../../sample/katex'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineMath({ renderMathBlock: renderKaTeXMathBlock, renderMathInline: renderKaTeXMathInline }),
    definePageRendering({
      pageHeight: 500,
      pageWidth: 700,
      marginTop: 50,
      marginRight: 50,
      marginBottom: 50,
      marginLeft: 50,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
