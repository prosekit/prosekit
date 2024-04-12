import { createContext } from '@aria-ui/core'

export const queryContext = createContext<string>(
  'prosekit/autocomplete-popover/query',
  '',
)

export const onSubmitContext = createContext<VoidFunction | null>(
  'prosekit/autocomplete-popover/onSubmit',
  null,
)
