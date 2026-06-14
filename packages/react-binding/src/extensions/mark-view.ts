import type { Extension } from '@prosekit/core'

import {
  type ReactMarkViewComponent,
  type ReactMarkViewEventOptions,
} from '../adapters/mark-view-adapter.tsx'
import { defineMarkViewMetadata } from './view-metadata.ts'

/**
 * Options for {@link defineReactMarkView}.
 */
export interface ReactMarkViewOptions extends ReactMarkViewEventOptions {
  /**
   * The name of the mark type.
   */
  name: string
  /**
   * The React component to render for this mark type.
   */
  component: ReactMarkViewComponent
}

/**
 * Defines a mark view using a React component.
 *
 * The component receives prosekit-style props (MarkViewContext compatible).
 */
export function defineReactMarkView(options: ReactMarkViewOptions): Extension {
  return defineMarkViewMetadata(options.name, options.component, {
    stopEvent: options.stopEvent,
    ignoreMutation: options.ignoreMutation,
  })
}
