import '@prosekit/lit/block-popover'

import { type BlockPopoverProps as BlockPopoverElementProps, propNames } from '@prosekit/lit/block-popover'
import { defineComponent, h } from 'vue'

import type { PropsWithClass } from '../types'

export type BlockPopoverProps = PropsWithClass<BlockPopoverElementProps>

export const BlockPopover = defineComponent<BlockPopoverProps>(
  (props, { slots }) => {
    return () => {
      const webComponentProps = Object.fromEntries(
        Object.entries(props)
          .filter((entry) => entry[1] !== undefined)
          .map(([key, value]) => [(key === 'class' ? '' : '.') + key, value]),
      )
      return h('prosekit-block-popover', webComponentProps, slots.default?.())
    }
  }, 
  { props: ['class', ...propNames] }
)
