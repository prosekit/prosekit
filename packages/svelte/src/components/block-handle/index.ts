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
} from 'prosekit/svelte/block-handle'

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

export * from './index.gen.ts'
