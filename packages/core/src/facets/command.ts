import type { CommandCreators } from '../types/extension-command'

import { defineFacet } from './facet'
import { rootFacet, type RootPayload } from './root'

export type CommandPayload = CommandCreators

export const commandFacet = defineFacet<CommandPayload, RootPayload>({
  reducer: (inputs) => {
    const commands = Object.assign({}, ...inputs) as CommandPayload
    return { commands }
  },
  parent: rootFacet,
  singleton: true,
})
