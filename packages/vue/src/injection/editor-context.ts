import { Editor, type Extension } from '@prosekit/core'
import { inject, provide, toRef } from 'vue'

const symbol = Symbol('prosekit-vue-editor-context')

/**
 * @internal
 */
export function provideEditor(editor: Editor): void {
  provide(symbol, toRef(editor))
}

/**
 * @internal
 */
export function useEditorContext<E extends Extension>(): Editor<E> | undefined {
  return inject<Editor<E>>(symbol)
}
