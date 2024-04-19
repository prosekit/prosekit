import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultResizableHandleProps, type ResizableHandleProps } from './props'
import { useResizableHandle } from './state'

class ResizableHandle extends BaseElement implements ResizableHandleProps {
  readonly _s: SignalState<ResizableHandleProps>

  constructor(props?: Partial<ResizableHandleProps>) {
    super()
    this._s = useResizableHandle(this, props)
  }
}

interface ResizableHandle extends ResizableHandleProps {}

defineProperties(ResizableHandle, defaultResizableHandleProps)

defineCustomElement('prosekit-resizable-handle', ResizableHandle)

export { ResizableHandle }
