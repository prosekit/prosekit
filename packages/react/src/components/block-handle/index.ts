/**

@module

## Anatomy

```jsx
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopup,
  BlockHandlePositioner,
  BlockHandleRoot,
} from 'prosekit/react/block-handle'

<BlockHandleRoot>
  <BlockHandlePositioner>
    <BlockHandlePopup>
      <BlockHandleAdd>...</BlockHandleAdd>
      <BlockHandleDraggable>...</BlockHandleDraggable>
    </BlockHandlePopup>
  </BlockHandlePositioner>
</BlockHandleRoot>
```
*/

'use client'

export * from './index.gen.ts'
