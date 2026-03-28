import { createDebug, enable } from 'obug'

// TODO: remove me
enable('aria-ui:*')

export const logger = {
  info: createDebug('aria-ui:info'),
}
