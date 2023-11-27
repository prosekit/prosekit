import '@prosekit/lit/popover'

import { type PopoverProps as PopoverElementProps, propNames } from '@prosekit/lit/popover'
import { defineComponent, h } from 'vue'

import type { PropsWithClass } from '../types'

export type PopoverProps = PropsWithClass<PopoverElementProps>

export const Popover = defineComponent<PopoverProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-popover', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
