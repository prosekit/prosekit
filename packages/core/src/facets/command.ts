import type { CommandCreators } from '../types/extension-command'

import {
  defineFacet,
  type Facet,
} from './facet'
import {
  rootFacet,
  type RootPayload,
} from './root'

type CommandPayload = CommandCreators

export const commandFacet: Facet<CommandPayload, RootPayload> = defineFacet({
  reducer: (inputs) => {
    const commands = Object.assign({}, ...inputs) as CommandPayload
    return { commands }
  },
  parent: rootFacet,
  singleton: true,
})
