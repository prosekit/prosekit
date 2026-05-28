import { defineFacet, defineFacetPayload, pluginFacet, type Extension, type FacetNode, type PluginPayload } from '@prosekit/core'
import type { MarkViewComponentProps, NodeViewComponentProps } from '@handlewithcare/react-prosemirror'
import type { ComponentType } from 'react'

import { adaptMarkView, type ReactMarkViewComponent } from '../adapters/mark-view-adapter.tsx'
import { adaptNodeView, type ReactNodeViewComponent } from '../adapters/node-view-adapter.tsx'

type NodeViewMetadata = {
  kind: 'node'
  name: string
  component: ReactNodeViewComponent
}

type MarkViewMetadata = {
  kind: 'mark'
  name: string
  component: ReactMarkViewComponent
}

type ViewMetadata = NodeViewMetadata | MarkViewMetadata

type ViewMetadataPluginPayload = PluginPayload & {
  reactBindingNodeViewComponents: Record<string, ComponentType<NodeViewComponentProps>>
  reactBindingMarkViewComponents: Record<string, ComponentType<MarkViewComponentProps>>
}

const viewMetadataFacet = defineFacet<ViewMetadata, ViewMetadataPluginPayload>({
  parent: pluginFacet,
  singleton: true,
  reducer: (inputs) => {
    const nodeViewComponents: Record<string, ComponentType<NodeViewComponentProps>> = {}
    const markViewComponents: Record<string, ComponentType<MarkViewComponentProps>> = {}

    for (const input of inputs) {
      if (input.kind === 'node') {
        nodeViewComponents[input.name] = adaptNodeView(input.component)
      } else {
        markViewComponents[input.name] = adaptMarkView(input.component)
      }
    }

    const payload = (() => []) as unknown as ViewMetadataPluginPayload
    payload.reactBindingNodeViewComponents = nodeViewComponents
    payload.reactBindingMarkViewComponents = markViewComponents
    return payload
  },
})

function defineViewMetadata(
  metadata: ViewMetadata,
): Extension {
  return defineFacetPayload(viewMetadataFacet, [metadata])
}

export function defineNodeViewMetadata(
  name: string,
  component: ReactNodeViewComponent,
): Extension {
  return defineViewMetadata({ kind: 'node', name, component })
}

export function defineMarkViewMetadata(
  name: string,
  component: ReactMarkViewComponent,
): Extension {
  return defineViewMetadata({ kind: 'mark', name, component })
}

function getViewMetadataPayload(
  tree: FacetNode,
): ViewMetadataPluginPayload | null {
  let node: FacetNode | undefined = tree

  for (const index of viewMetadataFacet.path) {
    node = node?.children.get(index)
  }

  const output = node?.getSingletonOutput()
  return output ? output as ViewMetadataPluginPayload : null
}

export function extractNodeViewComponents(
  tree: FacetNode,
): Record<string, ComponentType<NodeViewComponentProps>> {
  return getViewMetadataPayload(tree)?.reactBindingNodeViewComponents ?? {}
}

export function extractMarkViewComponents(
  tree: FacetNode,
): Record<string, ComponentType<MarkViewComponentProps>> {
  return getViewMetadataPayload(tree)?.reactBindingMarkViewComponents ?? {}
}
