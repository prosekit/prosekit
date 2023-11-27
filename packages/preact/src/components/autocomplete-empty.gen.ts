import '@prosekit/lit/autocomplete-empty'
import type { AutocompleteEmptyProps as AutocompleteEmptyElementProps } from '@prosekit/lit/autocomplete-empty'
import type { ComponentType } from 'preact'
import { h } from 'preact'

import type { PropsWithClass, PropsWithChildren } from '../types'

export type AutocompleteEmptyProps = PropsWithChildren<PropsWithClass<AutocompleteEmptyElementProps>>

export const AutocompleteEmpty: ComponentType<AutocompleteEmptyProps> = (props) => {
  return h('prosekit-autocomplete-empty', props)
}
