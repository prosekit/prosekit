/**

@module

## Anatomy

```jsx
import {
  MenuItem,
  MenuPopup,
  MenuPositioner,
  MenuRoot,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
} from 'prosekit/react/menu'

<MenuRoot>
  <MenuTrigger>...</MenuTrigger>
  <MenuPositioner>
    <MenuPopup>
      <MenuItem>...</MenuItem>
      <MenuSubmenuRoot>
        <MenuSubmenuTrigger>...</MenuSubmenuTrigger>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem>...</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuSubmenuRoot>
    </MenuPopup>
  </MenuPositioner>
</MenuRoot>
```
*/

'use client'

export * from './index.gen.ts'
