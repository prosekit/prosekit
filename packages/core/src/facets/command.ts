import type { CommandCreators } from '../types/command'

import { Facet } from './facet'

export type CommandPayload = CommandCreators

export const commandFacet = Facet.defineRootFacet<CommandPayload>({
  convert: (inputs) => {
    return Object.assign({}, ...inputs) as CommandPayload
  },
})
