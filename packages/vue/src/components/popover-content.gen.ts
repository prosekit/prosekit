import '@prosekit/lit/popover-content'

import { type PopoverContentProps as PopoverContentElementProps, propNames } from '@prosekit/lit/popover-content'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type PopoverContentProps = PropsWithClass<PopoverContentElementProps>

export const PopoverContent: DefineSetupFnComponent<PopoverContentProps> = defineComponent<PopoverContentProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-popover-content', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
