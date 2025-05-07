import {
  createContext,
  type Context,
} from '@aria-ui/core'

export const queryContext: Context<string> = createContext(
  'prosekit/autocomplete-popover/query',
  '',
)

export const onSubmitContext: Context<VoidFunction | null> = createContext(
  'prosekit/autocomplete-popover/onSubmit',
  null,
)

export const openContext: Context<boolean> = createContext(
  'prosekit/autocomplete-popover/open',
  false,
)
