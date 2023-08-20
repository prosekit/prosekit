import { useEditor } from 'prosekit/preact'

import type { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}
