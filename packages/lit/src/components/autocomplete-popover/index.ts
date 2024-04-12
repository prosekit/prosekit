import {
  defaultAutocompletePopoverProps,
  type AutocompletePopoverProps as _AutocompletePopoverProps,
} from './props'

export { queryContext, onSubmitContext } from './context-v2'
export { AutocompletePopover } from './element'
export { defaultAutocompletePopoverProps } from './props'

export const propNames = Object.keys(defaultAutocompletePopoverProps) as Array<
  keyof AutocompletePopoverProps
>

export type AutocompletePopoverProps = Partial<_AutocompletePopoverProps>
