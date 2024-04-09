import '@prosekit/lit/tooltip-content'

import { type TooltipContentProps as TooltipContentElementProps, propNames } from '@prosekit/lit/tooltip-content'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type TooltipContentProps = PropsWithClass<TooltipContentElementProps>

export const TooltipContent: DefineSetupFnComponent<TooltipContentProps> = defineComponent<TooltipContentProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-tooltip-content', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
