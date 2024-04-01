import '@prosekit/lit/popover-trigger'

import { type PopoverTriggerProps as PopoverTriggerElementProps, propNames } from '@prosekit/lit/popover-trigger'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type PopoverTriggerProps = PropsWithClass<PopoverTriggerElementProps>

export const PopoverTrigger: DefineSetupFnComponent<PopoverTriggerProps> = defineComponent<PopoverTriggerProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-popover-trigger', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
