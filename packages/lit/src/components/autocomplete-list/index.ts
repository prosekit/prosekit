import {
  defaultAutocompleteListProps,
  type AutocompleteListProps as _AutocompleteListProps,
} from './props'

export { AutocompleteList } from './element'
export { defaultAutocompleteListProps } from './props'

export const propNames = Object.keys(defaultAutocompleteListProps) as Array<
  keyof AutocompleteListProps
>

export type AutocompleteListProps = Partial<_AutocompleteListProps>
