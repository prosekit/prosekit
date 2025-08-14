import type { PlainExtension } from '@prosekit/core'

import { defineMarkPasteRule } from '../paste-rule'

import { LINK_MARK_RE } from './link-regex'
import type { LinkAttrs } from './link-types'

/**
 * @internal
 */
export function defineLinkPasteRule(): PlainExtension {
  return defineMarkPasteRule({
    type: 'link',
    regex: LINK_MARK_RE,
    attrs: (match) => {
      if (match[1]) {
        return { href: match[1] } satisfies LinkAttrs
      }
      return null
    },
  })
}
