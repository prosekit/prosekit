import { Editor, type Extension } from '@prosekit/core'
import { inject, provide, type MaybeRefOrGetter, toRef, type Ref } from 'vue'

const symbol = Symbol('prosekit-vue-editor-context')

/**
 * @internal
 */
export function provideEditor(editor: MaybeRefOrGetter<Editor>): void {
  provide(symbol, toRef(editor))
}

/**
 * @internal
 */
export function useEditorContext<E extends Extension>():
  | Ref<Editor<E>>
  | undefined {
  return inject<Ref<Editor<E>>>(symbol)
}
