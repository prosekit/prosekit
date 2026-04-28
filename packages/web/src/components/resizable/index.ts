/**

@module

## Anatomy

```html
<prosekit-resizable-root>
  <img src="..." />
  <prosekit-resizable-handle>...</prosekit-resizable-handle>
</prosekit-resizable-root>
```
*/

export {
  registerResizableRootElement,
  ResizableRootElement,
  ResizableRootPropsDeclaration,
  ResizeEndEvent,
  ResizeStartEvent,
  setupResizableRoot,
  type ResizableRootEvents,
  type ResizableRootProps,
} from './resizable-root.ts'

export {
  registerResizableHandleElement,
  ResizableHandleElement,
  ResizableHandlePropsDeclaration,
  setupResizableHandle,
  type ResizableHandleProps,
} from './resizable-handle.ts'
