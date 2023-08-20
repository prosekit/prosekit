import { useEditor } from 'prosekit/vue'

import type { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}
