import '@prosekit/lit/drag-handle'

import { type DragHandleProps as DragHandleElementProps, propNames } from '@prosekit/lit/drag-handle'
import { defineComponent, h } from 'vue'

import type { PropsWithClass } from '../types'

export type DragHandleProps = PropsWithClass<DragHandleElementProps>

export const DragHandle = defineComponent<DragHandleProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-drag-handle', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
