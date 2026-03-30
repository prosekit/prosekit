import type { CommandCreators } from '../types/extension-command.ts'

import { defineFacet, type Facet } from './facet.ts'
import { rootFacet, type RootPayload } from './root.ts'

type CommandPayload = CommandCreators

export const commandFacet: Facet<CommandPayload, RootPayload> = defineFacet({
  reducer: (inputs) => {
    switch (inputs.length) {
      case 0:
        return { commands: {} }
      case 1:
        return { commands: inputs[0] }
      default:
        return { commands: Object.assign({}, ...inputs) as CommandCreators }
    }
  },
  parent: rootFacet,
  singleton: true,
})
