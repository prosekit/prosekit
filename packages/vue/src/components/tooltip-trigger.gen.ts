import '@prosekit/lit/tooltip-trigger'

import { type TooltipTriggerProps as TooltipTriggerElementProps, propNames } from '@prosekit/lit/tooltip-trigger'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type TooltipTriggerProps = PropsWithClass<TooltipTriggerElementProps>

export const TooltipTrigger: DefineSetupFnComponent<TooltipTriggerProps> = defineComponent<TooltipTriggerProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-tooltip-trigger', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
