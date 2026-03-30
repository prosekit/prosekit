import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineMath } from 'prosekit/extensions/math'

import { renderTemmlMathBlock, renderTemmlMathInline } from '../../sample/temml'

export function defineExtension() {
  return union(defineBasicExtension(), defineMath({ renderMathBlock: renderTemmlMathBlock, renderMathInline: renderTemmlMathInline }))
}

export type EditorExtension = ReturnType<typeof defineExtension>
