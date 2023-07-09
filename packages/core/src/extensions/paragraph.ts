import { addNodeSpec } from './node-spec'

/** @public */
export function addParagraph() {
  return addNodeSpec({
    name: 'paragraph',
    spec: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0]
      },
    },
  })
}
