import type { NodeViewContext } from '@prosemirror-adapter/react'

export type ReactNodeViewComponentProps = NodeViewContext

export interface ReactNodeViewOptions {
  name: string
  component: React.ComponentType<ReactNodeViewComponentProps>
  dom?: string | (() => HTMLElement)
  contentDOM?: string | (() => HTMLElement)
}
