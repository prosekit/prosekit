// @ts-check

import failOnConsole from 'vitest-fail-on-console'

/** @type {string[]} */
const ALLOWED_MESSAGES = [
  'Cannot find the loroNode',
  'TextSelection endpoint not pointing into a node with inline content',
]

failOnConsole({
  allowMessage: (message) => {
    return ALLOWED_MESSAGES.some(allowedMessage => message.includes(allowedMessage))
  },
})
