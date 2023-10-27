import { defineNodeSpec } from './node-spec'

/**
 * @public
 */
export function defineDoc() {
  return defineNodeSpec({
    name: 'doc',
    content: 'block+',
    topNode: true,
  })
}
