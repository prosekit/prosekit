import type { Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'
import { defineComponent, h, type PropType } from 'vue'

import { VueMarkViewsConsumer } from '../extensions/vue-mark-view'
import { VueNodeViewsConsumer } from '../extensions/vue-node-view'
import { provideEditor } from '../injection/editor-context'

export interface ProseKitProps {
  editor: Editor
}

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit = defineComponent<ProseKitProps>(
  (props, { slots }) => {
    provideEditor(props.editor)
    return () => {
      return h(ProsemirrorAdapterProvider, null, () => [
        h(VueNodeViewsConsumer),
        h(VueMarkViewsConsumer),
        slots.default?.(),
      ])
    }
  },
  { props: { editor: { type: Object as PropType<Editor>, required: true } } },
)
