import { defineNodeSpec } from './node-spec'

/** @public */
export function defineText() {
  return defineNodeSpec({
    name: 'text',
    group: 'inline',
  })
}
