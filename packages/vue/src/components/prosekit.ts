import { Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'
import { defineComponent, h } from 'vue'

import { VueViewsConsumer } from '../extensions/vue-node-view'
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
        h(VueViewsConsumer),
        slots.default?.(),
      ])
    }
  },
  { props: ['editor'] },
)
