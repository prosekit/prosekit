import type { Extension } from '@prosekit/core'

import {
  type ReactNodeViewComponent,
  type ReactNodeViewEventOptions,
} from '../adapters/node-view-adapter.tsx'
import { defineNodeViewMetadata } from './view-metadata.ts'

/**
 * Options for {@link defineReactNodeView}.
 */
export interface ReactNodeViewOptions extends ReactNodeViewEventOptions {
  /**
   * The name of the node type.
   */
  name: string
  /**
   * The React component to render for this node type.
   */
  component: ReactNodeViewComponent
}

/**
 * Defines a node view using a React component.
 *
 * The component receives prosekit-style props (NodeViewContext compatible).
 */
export function defineReactNodeView(options: ReactNodeViewOptions): Extension {
  return defineNodeViewMetadata(options.name, options.component, {
    stopEvent: options.stopEvent,
    ignoreMutation: options.ignoreMutation,
  })
}
