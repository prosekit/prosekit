import {
  defineMarkSpec,
  union,
} from 'prosekit/core'
import { defineMarkRule } from 'prosekit/extensions/mark-rule'

export function defineIssueLink() {
  return union(
    defineMarkSpec({
      name: 'issueLink',
      inclusive: false,
      attrs: {
        issueNumber: {},
      },
      toDOM(node) {
        const issueNumber = node.attrs.issueNumber as number
        return [
          'a',
          {
            href: `https://example.com/issues/${issueNumber}`,
            title: `Issue #${issueNumber}`,
          },
          0,
        ]
      },
    }),
    defineMarkRule({
      regex: /#(\d+)/g,
      type: 'issueLink',
      attrs: (match) => {
        return { issueNumber: Number.parseInt(match[1]) }
      },
    }),
  )
}
