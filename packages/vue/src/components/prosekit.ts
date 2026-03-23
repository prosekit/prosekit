import type { Editor } from '@prosekit/core'
import { defineComponent, h, type DefineSetupFnComponent, type PropType } from 'vue'

import { provideEditor } from '../injection/editor-context.ts'

import { ViewRenderer } from './view-renderer.ts'

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
    return () =>
      h(
        ViewRenderer,
        { editor: props.editor },
        slots.default?.(),
      )
  },
})
