import type { Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'
import {
  defineComponent,
  h,
  type DefineSetupFnComponent,
  type PropType,
} from 'vue'

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
export const ProseKit: DefineSetupFnComponent<ProseKitProps> = defineComponent<ProseKitProps>({
  name: 'ProseKit',
  props: { editor: { type: Object as PropType<Editor>, required: true } },
  setup: (props, { slots }) => {
    provideEditor(props.editor)
    return () => {
      return h(ProsemirrorAdapterProvider, null, () => [
        h(VueNodeViewsConsumer),
        h(VueMarkViewsConsumer),
        slots.default?.(),
      ])
    }
  },
})
