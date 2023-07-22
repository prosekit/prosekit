import { useEditor } from 'prosekit/preact'

import { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}
