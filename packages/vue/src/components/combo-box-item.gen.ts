import '@prosekit/lit/components/combo-box-item'

import { type ComboBoxItemProps as ComboBoxItemElementProps, propNames } from '@prosekit/lit/components/combo-box-item'
import { defineComponent, h } from 'vue'

export type ComboBoxItemProps = {
  class?: string,
} & ComboBoxItemElementProps

export const ComboBoxItem = defineComponent<ComboBoxItemProps>(
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
