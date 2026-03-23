import { union, type Editor } from '@prosekit/core'
import { useSolidRenderer } from '@prosemirror-adapter/solid'
import type { Component, JSX, ParentProps } from 'solid-js'

import { defineSolidMarkViewFactory } from '../extensions/solid-mark-view.ts'
import { defineSolidNodeViewFactory } from '../extensions/solid-node-view.ts'
import { useEditorExtension } from '../hooks/use-editor-extension.ts'

export type ViewRendererProps = ParentProps<{
  editor: Editor
}>

export const ViewRenderer: Component<ViewRendererProps> = (props): JSX.Element => {
  const { renderSolidRenderer, removeSolidRenderer, render } = useSolidRenderer()

  const extension = union([
    defineSolidMarkViewFactory(renderSolidRenderer, removeSolidRenderer),
    defineSolidNodeViewFactory(renderSolidRenderer, removeSolidRenderer),
  ])

  useEditorExtension(() => props.editor, () => extension)

  return [props.children, render] as unknown as JSX.Element
}
