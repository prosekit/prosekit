import '@prosekit/lit/combo-box2'

import { type ComboBox2Props as ComboBox2ElementProps, propNames } from '@prosekit/lit/combo-box2'
import { defineComponent, h } from 'vue'

export type ComboBox2Props = {
  class?: string,
} & ComboBox2ElementProps

export const ComboBox2 = defineComponent<ComboBox2Props>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-combo-box2', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
