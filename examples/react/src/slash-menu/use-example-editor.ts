import { useEditor } from 'prosekit/react'

import { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}
