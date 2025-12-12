// @ts-check

import failOnConsole from 'vitest-fail-on-console'

failOnConsole({
  allowMessage: (message) => {
    if (message.includes('Cannot find the loroNode')) {
      return true
    }
    return false
  },
})
