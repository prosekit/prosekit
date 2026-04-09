import { computed } from '@aria-ui/core'
import { isHTMLElement } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'

export function useHTMLElementAt(
  getEditor: () => Editor | null | undefined,
  getPos: () => number | null | undefined,
): () => HTMLElement | undefined {
  return computed(() => {
    const editor = getEditor()
    const pos = getPos()
    if (!editor || !pos) return
    const view = editor.view
    const element = view.nodeDOM(pos)
    if (element && isHTMLElement(element)) return element
  })
}
