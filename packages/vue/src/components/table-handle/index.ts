/**

@module

## Anatomy

```jsx
import {
  TableHandleColumnMenuRoot,
  TableHandleColumnMenuTrigger,
  TableHandleColumnPopup,
  TableHandleColumnPositioner,
  TableHandleDragPreview,
  TableHandleDropIndicator,
  TableHandleRoot,
  TableHandleRowMenuRoot,
  TableHandleRowMenuTrigger,
  TableHandleRowPopup,
  TableHandleRowPositioner,
} from 'prosekit/vue/table-handle'
import {
  MenuItem,
  MenuPopup,
  MenuPositioner,
} from 'prosekit/vue/menu'

<TableHandleRoot>
  <TableHandleDragPreview />
  <TableHandleDropIndicator />
  <TableHandleColumnPositioner>
    <TableHandleColumnPopup>
      <TableHandleColumnMenuRoot>
        <TableHandleColumnMenuTrigger>...</TableHandleColumnMenuTrigger>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem>...</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </TableHandleColumnMenuRoot>
    </TableHandleColumnPopup>
  </TableHandleColumnPositioner>
  <TableHandleRowPositioner>
    <TableHandleRowPopup>
      <TableHandleRowMenuRoot>
        <TableHandleRowMenuTrigger>...</TableHandleRowMenuTrigger>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem>...</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </TableHandleRowMenuRoot>
    </TableHandleRowPopup>
  </TableHandleRowPositioner>
</TableHandleRoot>
```
*/

export * from './index.gen.ts'
