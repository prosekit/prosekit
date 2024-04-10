import { ContextProvider } from '@lit/context'
import type { Editor } from '@prosekit/core'
import type {
  PropertyDeclarations,
  PropertyValueMap,
  ReactiveControllerHost,
} from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { Popover, type PositioningOptions } from '../popover'

import { blockPopoverContext } from './context'
import {
  defineElementHoverHandler,
  type ElementHoverHandler,
} from './pointer-move'

export const propNames = ['editor'] as const

export interface BlockPopoverProps {
  editor: Editor
}

/**
 * @deprecated Please use BlockPositioner instead.
 */
export class BlockPopover extends Popover {
  /**
   * @hidden
   */
  static properties = {
    ...Popover.properties,
    editor: { type: Object, reflect: false, attribute: false },
  } satisfies PropertyDeclarations

  editor?: Editor

  positioning?: PositioningOptions = {
    strategy: 'absolute',
    placement: 'left-start',
    fitViewport: true,
    flip: false,
    inline: false,
    autoUpdate: true,
    shift: true,
    overlap: false,
    hide: true,
    offset: 4,
  }

  // We don't want the popover to overflow the editor area so we set `elevated` to false.
  elevated = false

  private context = new ContextProvider(this, {
    context: blockPopoverContext,
    initialValue: {
      pos: null,
      node: null,
      element: null,
    },
  })

  constructor() {
    super()

    useBlockPopover(this, (reference, element, node, pos) => {
      this.reference = reference ?? undefined
      this.context.setValue({ pos, element, node })
    })
  }

  protected willUpdate(changedProperties: PropertyValueMap<this>): void {
    super.willUpdate(changedProperties)
    this.open = !!this?.reference
  }
}

function useBlockPopover(
  host: ReactiveControllerHost & { editor?: Editor },
  handler: ElementHoverHandler,
) {
  let dispose: VoidFunction | undefined
  let editor: Editor | undefined

  let prevElement: HTMLElement | null = null
  let prevPos: number | null = null

  const extension = defineElementHoverHandler(
    (reference, element, node, pos) => {
      if (prevElement === element && prevPos === pos) {
        return
      }

      prevElement = element
      prevPos = pos

      handler(reference, element, node, pos)
    },
  )

  host.addController({
    hostUpdated: () => {
      if (editor !== host.editor) {
        editor = host.editor

        dispose?.()
        dispose = undefined
        if (editor) {
          dispose = editor.use(extension)
        }
      }
    },

    hostDisconnected: () => {
      dispose?.()
      dispose = undefined
    },
  })
}

defineCustomElement('prosekit-block-popover', BlockPopover)
