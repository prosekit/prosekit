import {
  defaultAutocompleteItemProps,
  type AutocompleteItemProps as _AutocompleteItemProps,
} from './props'

export { AutocompleteItem } from './element'
export { defaultAutocompleteItemProps } from './props'

export const propNames = Object.keys(defaultAutocompleteItemProps) as Array<
  keyof AutocompleteItemProps
>

export type AutocompleteItemProps = Partial<_AutocompleteItemProps>
