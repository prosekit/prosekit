import '@prosekit/lit/combo-box'

import { type ComboBoxProps as ComboBoxElementProps, propNames } from '@prosekit/lit/combo-box'
import { defineComponent, h } from 'vue'

export type ComboBoxProps = {
  class?: string,
} & ComboBoxElementProps

export const ComboBox = defineComponent<ComboBoxProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-combo-box', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
