import { definePayload, type Extension } from '@prosekit/core'

import type { ReactNodeViewOptions } from './types'

type ReactExtensionOptions =
  | {
      type: 'react-node-view'
      payload: ReactNodeViewOptions
    }
  | {
      type: 'react-plugin-view'
      payload: undefined
    }

class ReactExtension implements Extension {
  extension: Extension

  constructor(readonly options: ReactExtensionOptions) {
    this.extension = definePayload(options)
  }
}

export function extractReactNodeViewOptions(
  payload: Record<string, unknown[]>,
) {
  return (payload['react-node-view'] as ReactNodeViewOptions[]) ?? []
}

export function defineReactExtension(options: ReactExtensionOptions) {
  return new ReactExtension(options)
}

export function extractReactExtension(extension: Extension): ReactExtension[] {
  if (!extension) {
    return []
  } else if (extension instanceof ReactExtension) {
    return [extension]
  } else if (Array.isArray(extension.extension)) {
    return extension.extension.flatMap(extractReactExtension)
  } else {
    return extractReactExtension(extension.extension)
  }
}
