import '@prosekit/lit/popover-positioner'

import { type PopoverPositionerProps as PopoverPositionerElementProps, propNames } from '@prosekit/lit/popover-positioner'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type PopoverPositionerProps = PropsWithClass<PopoverPositionerElementProps>

export const PopoverPositioner: DefineSetupFnComponent<PopoverPositionerProps> = defineComponent<PopoverPositionerProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-popover-positioner', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
