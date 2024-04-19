import { BaseElement, type SignalState } from '@aria-ui/core'

import { defineCustomElement } from '../../utils/define-custom-element'
import { defineProperties } from '../../utils/define-properties'

import { defaultResizableProps, type ResizableProps } from './props'
import { useResizable } from './state'

class Resizable extends BaseElement implements ResizableProps {
  readonly _s: SignalState<ResizableProps>

  constructor(props?: Partial<ResizableProps>) {
    super()
    this._s = useResizable(this, props)
  }
}

interface Resizable extends ResizableProps {}

defineProperties(Resizable, defaultResizableProps)

defineCustomElement('prosekit-resizable', Resizable)

export { Resizable }
