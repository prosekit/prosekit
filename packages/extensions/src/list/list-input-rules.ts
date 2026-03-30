import { union, type Extension } from '@prosekit/core'
import { listInputRules } from 'prosemirror-flat-list'

import { defineInputRule } from '../input-rule/index.ts'

/**
 * @internal
 */
export function defineListInputRules(): Extension {
  return union(listInputRules.map(defineInputRule))
}
