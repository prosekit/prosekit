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
} from 'prosekit/svelte/menu'

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

export * from './index.gen.ts'
