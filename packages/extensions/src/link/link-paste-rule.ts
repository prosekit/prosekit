import type { PlainExtension } from '@prosekit/core'

import { defineMarkPasteRule } from '../paste-rule/index.ts'

import { LINK_MARK_RE } from './link-regex.ts'
import type { LinkAttrs } from './link-types.ts'

/**
 * @internal
 */
export function defineLinkPasteRule(): PlainExtension {
  return defineMarkPasteRule({
    type: 'link',
    regex: LINK_MARK_RE,
    getAttrs: (match: RegExpExecArray): LinkAttrs | false => {
      if (match[1]) {
        return { href: match[1] } satisfies LinkAttrs
      }
      return false
    },
  })
}
