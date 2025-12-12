// @ts-check

import failOnConsole from 'vitest-fail-on-console'

/** @type {string[]} */
const ALLOWED_MESSAGES = [
  'Cannot find the loroNode',
  'flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering.',
]

failOnConsole({
  allowMessage: (message) => {
    return ALLOWED_MESSAGES.some(allowedMessage => message.includes(allowedMessage))
  },
})
