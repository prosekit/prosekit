import { useEditor } from 'prosekit/react'

import type { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}
