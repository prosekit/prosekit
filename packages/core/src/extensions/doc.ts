import { addNodeSpec } from './node-spec'

/** @public */
export function addDoc() {
  return addNodeSpec({
    name: 'doc',
    spec: {
      content: 'block+',
    },
  })
}
