import { Editor } from '@prosekit/core'
import { defineComponent } from 'vue'

import { provideEditor } from '../injection/editor-injection'

export interface ProseKitProps {
  editor: Editor
}

export const ProseKit = defineComponent<ProseKitProps>(
  (props, { slots }) => {
    provideEditor(props.editor)
    return () => slots.default?.()
  },
  { props: ['editor'] },
)
