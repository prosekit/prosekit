import type { Editor, Extension } from '@prosekit/core'
import { inject, provide, type InjectionKey } from 'vue'

const symbol = Symbol('prosekit-vue-editor-context') as InjectionKey<Editor>

/**
 * @internal
 */
export function provideEditor(editor: Editor): void {
  provide(symbol, editor)
}

/**
 * @internal
 */
export function useEditorContext<E extends Extension>(): Editor<E> | undefined {
  return inject(symbol, undefined)
}
