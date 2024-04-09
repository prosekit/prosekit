import '@prosekit/lit/tooltip-root'

import { type TooltipRootProps as TooltipRootElementProps, propNames } from '@prosekit/lit/tooltip-root'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type TooltipRootProps = PropsWithClass<TooltipRootElementProps>

export const TooltipRoot: DefineSetupFnComponent<TooltipRootProps> = defineComponent<TooltipRootProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-tooltip-root', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
