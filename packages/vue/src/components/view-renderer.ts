import { union, type Editor } from '@prosekit/core'
import { useVueRenderer } from '@prosemirror-adapter/vue'
import { defineComponent, type DefineSetupFnComponent, type PropType } from 'vue'

import { defineVueNodeViewFactory } from '../extensions/vue-node-view.ts'
import { defineVueMarkViewFactory } from '../extensions/vue-mark-view.ts'
import { useEditorExtension } from '../hooks/use-editor-extension.ts'

/**
 * @internal
 */
export interface ViewRendererProps {
  editor: Editor
}

/**
 * @internal
 */
export const ViewRenderer: DefineSetupFnComponent<ViewRendererProps> = defineComponent<ViewRendererProps>({
  name: 'ViewRenderer',
  props: { editor: { type: Object as PropType<Editor>, required: true } },
  setup: (props, { slots }) => {
    const { renderVueRenderer, removeVueRenderer, render } = useVueRenderer()

    const extension = union([
      defineVueMarkViewFactory(renderVueRenderer, removeVueRenderer),
      defineVueNodeViewFactory(renderVueRenderer, removeVueRenderer),
    ])

    useEditorExtension(() => props.editor, extension)

    return () => [slots.default?.(), render()]
  },
})
