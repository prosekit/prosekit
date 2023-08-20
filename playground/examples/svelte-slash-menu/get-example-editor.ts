import { getEditor } from 'prosekit/svelte'

import type { ExampleExtension } from './extension'

export function getExampleEditor() {
  return getEditor<ExampleExtension>()
}
