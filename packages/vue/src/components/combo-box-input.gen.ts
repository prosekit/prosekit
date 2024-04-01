import '@prosekit/lit/combo-box-input'

import { type ComboBoxInputProps as ComboBoxInputElementProps, propNames } from '@prosekit/lit/combo-box-input'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type ComboBoxInputProps = PropsWithClass<ComboBoxInputElementProps>

export const ComboBoxInput: DefineSetupFnComponent<ComboBoxInputProps> = defineComponent<ComboBoxInputProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-combo-box-input', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
