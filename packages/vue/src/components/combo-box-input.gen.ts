import '@prosekit/lit/combo-box-input'

import { type ComboBoxInputProps as ComboBoxInputElementProps, propNames } from '@prosekit/lit/combo-box-input'
import { defineComponent, h } from 'vue'

export type ComboBoxInputProps = {
  class?: string,
} & ComboBoxInputElementProps

export const ComboBoxInput = defineComponent<ComboBoxInputProps>(
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
