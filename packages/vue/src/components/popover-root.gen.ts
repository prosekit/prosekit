import '@prosekit/lit/popover-root'

import { type PopoverRootProps as PopoverRootElementProps, propNames } from '@prosekit/lit/popover-root'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type PopoverRootProps = PropsWithClass<PopoverRootElementProps>

export const PopoverRoot: DefineSetupFnComponent<PopoverRootProps> = defineComponent<PopoverRootProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-popover-root', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
