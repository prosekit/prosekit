import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'
import { defineProperties } from '../../../utils/define-properties'

import { defaultResizableRootProps, type ResizableRootProps } from './props'
import { useResizableRoot } from './state'

class ResizableRoot extends BaseElement implements ResizableRootProps {
  readonly _s: SignalState<ResizableRootProps>

  constructor(props?: Partial<ResizableRootProps>) {
    super()
    this._s = useResizableRoot(this, props)
  }
}

interface ResizableRoot extends ResizableRootProps {}

defineProperties(ResizableRoot, defaultResizableRootProps)

defineCustomElement('prosekit-resizable-root', ResizableRoot)

export { ResizableRoot as Resizable }
