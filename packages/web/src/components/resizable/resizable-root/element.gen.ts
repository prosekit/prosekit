import { ElementBuilder } from '@aria-ui/core'

import { defineCustomElement } from '../../../utils/define-custom-element'

import { defaultResizableRootProps, type ResizableRootProps } from './props'
import { useResizableRoot } from './state'

class ResizableRootElement extends ElementBuilder<ResizableRootProps>(useResizableRoot, defaultResizableRootProps) {}

defineCustomElement('prosekit-resizable-root', ResizableRootElement)

export { ResizableRootElement }
