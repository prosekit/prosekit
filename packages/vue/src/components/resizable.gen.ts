import '@prosekit/lit/resizable'

import { type ResizableProps as ResizableElementProps, propNames } from '@prosekit/lit/resizable'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type ResizableProps = PropsWithClass<ResizableElementProps>

export const Resizable: DefineSetupFnComponent<ResizableProps> = defineComponent<ResizableProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-resizable', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
