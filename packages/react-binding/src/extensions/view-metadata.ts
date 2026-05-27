import { Plugin, PluginKey } from '@prosekit/pm/state'
import { definePlugin, type Extension } from '@prosekit/core'
import type { MarkViewComponentProps, NodeViewComponentProps } from '@handlewithcare/react-prosemirror'
import type { ComponentType } from 'react'

import { adaptMarkView, type ReactMarkViewComponent } from '../adapters/mark-view-adapter.tsx'
import { adaptNodeView, type ReactNodeViewComponent } from '../adapters/node-view-adapter.tsx'

const NODE_VIEW_PLUGIN_KEY_PREFIX = 'prosekit-react-binding-node-view:'
const MARK_VIEW_PLUGIN_KEY_PREFIX = 'prosekit-react-binding-mark-view:'

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

function isViewMetadata(value: unknown): value is ViewMetadata {
  if (!value || typeof value !== 'object') {
    return false
  }

  const metadata = value as Partial<ViewMetadata>
  return (
    (metadata.kind === 'node' || metadata.kind === 'mark')
    && typeof metadata.name === 'string'
    && typeof metadata.component === 'function'
  )
}

function defineViewMetadataPlugin(
  key: string,
  metadata: ViewMetadata,
): Extension {
  return definePlugin(
    new Plugin({
      key: new PluginKey(key),
      spec: {
        reactBindingViewMetadata: metadata,
      },
    }),
  )
}

export function defineNodeViewMetadata(
  name: string,
  component: ReactNodeViewComponent,
): Extension {
  return defineViewMetadataPlugin(
    `${NODE_VIEW_PLUGIN_KEY_PREFIX}${name}`,
    { kind: 'node', name, component },
  )
}

export function defineMarkViewMetadata(
  name: string,
  component: ReactMarkViewComponent,
): Extension {
  return defineViewMetadataPlugin(
    `${MARK_VIEW_PLUGIN_KEY_PREFIX}${name}`,
    { kind: 'mark', name, component },
  )
}

export function extractNodeViewComponents(
  plugins: readonly Plugin[],
): Record<string, ComponentType<NodeViewComponentProps>> {
  const components: Record<string, ComponentType<NodeViewComponentProps>> = {}

  for (const plugin of plugins) {
    const metadata = (plugin.spec as { reactBindingViewMetadata?: unknown }).reactBindingViewMetadata
    if (!isViewMetadata(metadata) || metadata.kind !== 'node') {
      continue
    }
    components[metadata.name] = adaptNodeView(metadata.component)
  }

  return components
}

export function extractMarkViewComponents(
  plugins: readonly Plugin[],
): Record<string, ComponentType<MarkViewComponentProps>> {
  const components: Record<string, ComponentType<MarkViewComponentProps>> = {}

  for (const plugin of plugins) {
    const metadata = (plugin.spec as { reactBindingViewMetadata?: unknown }).reactBindingViewMetadata
    if (!isViewMetadata(metadata) || metadata.kind !== 'mark') {
      continue
    }
    components[metadata.name] = adaptMarkView(metadata.component)
  }

  return components
}
