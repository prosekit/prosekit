import { useEditor } from 'prosekit/solid'

import type { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}
