import type { PlainExtension } from '@prosekit/core'

import { LINK_MARK_RE } from './link-regex'
import type { LinkAttrs } from './link-types'
import { defineMarkPasteRule } from './mark-paste-rule'

/**
 * @internal
 */
export function defineLinkPasteRule(): PlainExtension {
  return defineMarkPasteRule({
    markTypeName: 'link',
    regex: LINK_MARK_RE,
    getAttrs: (match) => {
      if (match[1]) {
        return { href: match[1] } satisfies LinkAttrs
      }
      return null
    },
  })
}
