import { ElementMixin } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultResizableHandleProps, type ResizableHandleProps } from './props'
import { useResizableHandle } from './state'

class ResizableHandleElement extends ElementMixin<ResizableHandleProps>(useResizableHandle, defaultResizableHandleProps) {}

defineCustomElement('prosekit-resizable-handle', ResizableHandleElement)

export { ResizableHandleElement }
