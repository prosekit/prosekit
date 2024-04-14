import { createContext } from '@aria-ui/core'

export const queryContext = createContext<string>(
  'prosekit/autocomplete-popover/query',
  '',
)

export const onSubmitContext = createContext<VoidFunction | null>(
  'prosekit/autocomplete-popover/onSubmit',
  null,
)


export const openContext = createContext<boolean>(
  'prosekit/autocomplete-popover/open',
  false , 
)
