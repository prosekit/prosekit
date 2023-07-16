import 'prosekit/basic/style.css'

import { addBasicExtension } from 'prosekit/basic'

export function addExampleExtension() {
  return addBasicExtension()
}

export type ExampleExtension = ReturnType<typeof addExampleExtension>
