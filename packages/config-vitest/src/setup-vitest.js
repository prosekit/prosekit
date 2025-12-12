// @ts-check

import failOnConsole from 'vitest-fail-on-console'

/** @type {string[]} */
const ALLOWED_MESSAGES = [
  'Cannot find the loroNode',

  // https://github.com/yjs/y-prosemirror/pull/206
  'TextSelection endpoint not pointing into a node with inline content',
]

failOnConsole({
  shouldPrintMessage: true,
  allowMessage: (message) => {
    return ALLOWED_MESSAGES.some(allowedMessage => message.includes(allowedMessage))
  },
})
