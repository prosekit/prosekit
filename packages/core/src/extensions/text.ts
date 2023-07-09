import { addNodeSpec } from './node-spec'

/** @public */
export function addText() {
  return addNodeSpec({
    name: 'text',
    spec: {
      group: 'inline',
    },
  })
}
