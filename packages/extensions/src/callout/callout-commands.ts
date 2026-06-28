import { defineCommands, insertNode, setNodeAttrs, toggleWrap, wrap, type Extension } from '@prosekit/core'

import type { CalloutAttrs } from './callout-types.ts'

export type CalloutCommandsExtension = Extension<{
  Commands: {
    setCallout: [attrs?: Partial<CalloutAttrs> | undefined]
    insertCallout: [attrs?: Partial<CalloutAttrs> | undefined]
    toggleCallout: [attrs?: Partial<CalloutAttrs> | undefined]
    updateCallout: [attrs: Partial<CalloutAttrs>]
  }
}>

/**
 * @internal
 */
export function defineCalloutCommands(): CalloutCommandsExtension {
  return defineCommands({
    setCallout: (attrs?: Partial<CalloutAttrs>) => {
      return wrap({ type: 'callout', attrs })
    },
    insertCallout: (attrs?: Partial<CalloutAttrs>) => {
      return insertNode({ type: 'callout', attrs })
    },
    toggleCallout: (attrs?: Partial<CalloutAttrs>) => {
      return toggleWrap({ type: 'callout', attrs })
    },
    updateCallout: (attrs: Partial<CalloutAttrs>) => {
      return setNodeAttrs({ type: 'callout', attrs })
    },
  })
}
