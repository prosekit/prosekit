import {
  defaultAutocompleteEmptyProps,
  type AutocompleteEmptyProps as _AutocompleteEmptyProps,
} from './props'

export { AutocompleteEmpty } from './element'
export { defaultAutocompleteEmptyProps } from './props'

export const propNames = Object.keys(defaultAutocompleteEmptyProps) as Array<
  keyof AutocompleteEmptyProps
>

export type AutocompleteEmptyProps = Partial<_AutocompleteEmptyProps>
