import type { Attrs, Mark, MarkType } from '@prosekit/pm/model'

import { isSubset } from './is-subset.ts'

export function includesMark(
  marks: readonly Mark[],
  markType: MarkType,
  attrs?: Attrs | null,
): boolean {
  attrs = attrs || {}
  return marks.some((mark) => {
    return mark.type === markType && isSubset(attrs, mark.attrs)
  })
}
