import { useEditor } from 'prosekit/vue'

import { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}
