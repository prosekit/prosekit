import '@prosekit/lit/combo-box-item'

import { type ComboBoxItemProps as ComboBoxItemElementProps, propNames } from '@prosekit/lit/combo-box-item'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type ComboBoxItemProps = PropsWithClass<ComboBoxItemElementProps>

export const ComboBoxItem: DefineSetupFnComponent<ComboBoxItemProps> = defineComponent<ComboBoxItemProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-combo-box-item', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
