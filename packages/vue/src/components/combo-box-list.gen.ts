import '@prosekit/lit/combo-box-list'

import { type ComboBoxListProps as ComboBoxListElementProps, propNames } from '@prosekit/lit/combo-box-list'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type ComboBoxListProps = PropsWithClass<ComboBoxListElementProps>

export const ComboBoxList: DefineSetupFnComponent<ComboBoxListProps> = defineComponent<ComboBoxListProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-combo-box-list', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
