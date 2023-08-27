import '@prosekit/lit/components/combo-box-list'

import { type ComboBoxListProps as ComboBoxListElementProps, propNames } from '@prosekit/lit/components/combo-box-list'
import { defineComponent, h } from 'vue'

export type ComboBoxListProps = {
  class?: string,
} & ComboBoxListElementProps

export const ComboBoxList = defineComponent<ComboBoxListProps>(
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
