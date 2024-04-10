import '@prosekit/lit/block-drag-handle'

import { type BlockDragHandleProps as BlockDragHandleElementProps, propNames } from '@prosekit/lit/block-drag-handle'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type BlockDragHandleProps = PropsWithClass<BlockDragHandleElementProps>

export const BlockDragHandle: DefineSetupFnComponent<BlockDragHandleProps> = defineComponent<BlockDragHandleProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-block-drag-handle', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
