import { Editor, Extension } from '@prosekit/core'

import { injectEditor } from '../injection/editor-injection'

export function useEditor<E extends Extension = any>(): Editor<E> {
  return injectEditor() as Editor<E>
}
