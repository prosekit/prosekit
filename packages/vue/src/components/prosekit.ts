import { Editor } from '@prosekit/core'
import { defineComponent, h } from 'vue'

import { provideEditor } from '../injection/editor-context'
import { VueViewsProvider } from '../views'
import { VueViewsConsumer } from '../views/vue-views-comsumer'

export interface ProseKitProps {
  editor: Editor
}

export const ProseKit = defineComponent<ProseKitProps>(
  (props, { slots }) => {
    provideEditor(props.editor)
    return () => {
      return h(VueViewsProvider, null, () => [
        h(VueViewsConsumer),
        slots.default?.(),
      ])
    }
  },
  { props: ['editor'] },
)
