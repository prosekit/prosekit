import {
  getMarkType,
  type PlainExtension,
} from '@prosekit/core'

import { definePasteRule } from '../paste-rule'

import { LINK_MARK_RE } from './link-regex'
import type { LinkAttrs } from './link-types'
import { createMarkPasteRuleHandler } from './mark-paste-rule'

/**
 * @internal
 */
export function defineLinkPasteRule(): PlainExtension {
  return definePasteRule({
    handler: ({ slice, view }) => {
      const linkType = getMarkType(view.state.schema, 'link')
      const handler = createMarkPasteRuleHandler({
        markType: linkType,
        regex: LINK_MARK_RE,
        getAttrs: (match) => {
          if (match[1]) {
            return { href: match[1] } satisfies LinkAttrs
          }
          return null
        },
      })
      return handler({ slice, view })
    },
  })
}
