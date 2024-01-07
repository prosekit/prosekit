import '@prosekit/lit/resizable-handle'

import { type ResizableHandleProps as ResizableHandleElementProps, propNames } from '@prosekit/lit/resizable-handle'
import { defineComponent, h } from 'vue'

import type { PropsWithClass } from '../types'

export type ResizableHandleProps = PropsWithClass<ResizableHandleElementProps>

export const ResizableHandle = defineComponent<ResizableHandleProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-resizable-handle', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
