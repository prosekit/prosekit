import { useEditor } from 'prosekit/solid'

import { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}
