import { Editor, ProseKitError } from '@prosekit/core'
import { inject, provide } from 'vue'

const symbol = Symbol('ProseKitContext')

export function provideEditor(editor: Editor): void {
  provide(symbol, editor)
}

export function injectEditor(): Editor {
  const editor = inject<Editor>(symbol)
  if (!editor) {
    throw new ProseKitError("Can't inject editor")
  }
  return editor
}
