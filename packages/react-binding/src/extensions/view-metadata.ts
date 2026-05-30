import { defineFacet, defineFacetPayload, pluginFacet, type Extension, type FacetNode, type PluginPayload } from '@prosekit/core'
import type { MarkViewComponentProps, NodeViewComponentProps } from '@handlewithcare/react-prosemirror'
import type { ComponentType } from 'react'

import { adaptMarkView, type ReactMarkViewComponent, type ReactMarkViewEventOptions } from '../adapters/mark-view-adapter.tsx'
import { adaptNodeView, type ReactNodeViewComponent, type ReactNodeViewEventOptions } from '../adapters/node-view-adapter.tsx'

type NodeViewMetadata = {
  kind: 'node'
  name: string
  component: ReactNodeViewComponent
  options?: ReactNodeViewEventOptions
}

type MarkViewMetadata = {
  kind: 'mark'
  name: string
  component: ReactMarkViewComponent
  options?: ReactMarkViewEventOptions
}

type ViewMetadata = NodeViewMetadata | MarkViewMetadata

// Cache the adapted (react-prosemirror compatible) components, keyed by the
// metadata object they were derived from. The facet reducer can run multiple
// times with the same metadata inputs; without this cache every run would
// produce new component identities and force react-prosemirror to remount all
// node/mark views.
const adaptedNodeViewCache = new WeakMap<NodeViewMetadata, ComponentType<NodeViewComponentProps>>()
const adaptedMarkViewCache = new WeakMap<MarkViewMetadata, ComponentType<MarkViewComponentProps>>()

function getAdaptedNodeView(metadata: NodeViewMetadata): ComponentType<NodeViewComponentProps> {
  let adapted = adaptedNodeViewCache.get(metadata)
  if (!adapted) {
    adapted = adaptNodeView(metadata.component, metadata.options)
    adaptedNodeViewCache.set(metadata, adapted)
  }
  return adapted
}

function getAdaptedMarkView(metadata: MarkViewMetadata): ComponentType<MarkViewComponentProps> {
  let adapted = adaptedMarkViewCache.get(metadata)
  if (!adapted) {
    adapted = adaptMarkView(metadata.component, metadata.options)
    adaptedMarkViewCache.set(metadata, adapted)
  }
  return adapted
}

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
        nodeViewComponents[input.name] = getAdaptedNodeView(input)
      } else {
        markViewComponents[input.name] = getAdaptedMarkView(input)
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
  options?: ReactNodeViewEventOptions,
): Extension {
  return defineViewMetadata({ kind: 'node', name, component, options })
}

export function defineMarkViewMetadata(
  name: string,
  component: ReactMarkViewComponent,
  options?: ReactMarkViewEventOptions,
): Extension {
  return defineViewMetadata({ kind: 'mark', name, component, options })
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
