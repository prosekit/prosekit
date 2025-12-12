// @ts-check

import failOnConsole from 'vitest-fail-on-console'

/** @type {string[]} */
const ALLOWED_MESSAGES = [
  'Cannot find the loroNode',
]

failOnConsole({
  allowMessage: (message) => {
    return ALLOWED_MESSAGES.some(allowedMessage => message.includes(allowedMessage))
  },
})
