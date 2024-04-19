import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultResizableHandleProps, type ResizableHandleProps } from './props'
import { useResizableHandle } from './state'

class ResizableHandleElement extends BaseElement implements ResizableHandleProps {
  readonly _s: SignalState<ResizableHandleProps>

  constructor() {
    super()
    this._s = useResizableHandle(this)
  }
}

interface ResizableHandleElement extends ResizableHandleProps {}

defineProperties(ResizableHandleElement, defaultResizableHandleProps)

defineCustomElement('prosekit-resizable-handle-v2', ResizableHandleElement)

export { ResizableHandleElement }
