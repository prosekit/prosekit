import '@prosekit/lit/block-positioner'

import { type BlockPositionerProps as BlockPositionerElementProps, propNames } from '@prosekit/lit/block-positioner'
import { defineComponent, h, type DefineSetupFnComponent } from 'vue'

import type { PropsWithClass } from '../types'

export type BlockPositionerProps = PropsWithClass<BlockPositionerElementProps>

export const BlockPositioner: DefineSetupFnComponent<BlockPositionerProps> = defineComponent<BlockPositionerProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-block-positioner', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
