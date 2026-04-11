/**
 * ## Anatomy
 *
 * ```jsx
 * import {
 *   MenuItem,
 *   MenuPopup,
 *   MenuPositioner,
 *   MenuRoot,
 *   MenuSubmenuRoot,
 *   MenuSubmenuTrigger,
 *   MenuTrigger,
 * } from 'prosekit/react/menu'
 *
 * <MenuRoot>
 *   <MenuTrigger>...</MenuTrigger>
 *   <MenuPositioner>
 *     <MenuPopup>
 *       <MenuItem>...</MenuItem>
 *       <MenuSubmenuRoot>
 *         <MenuSubmenuTrigger>...</MenuSubmenuTrigger>
 *         <MenuPositioner>
 *           <MenuPopup>
 *             <MenuItem>...</MenuItem>
 *           </MenuPopup>
 *         </MenuPositioner>
 *       </MenuSubmenuRoot>
 *     </MenuPopup>
 *   </MenuPositioner>
 * </MenuRoot>
 * ```
 *
 * @module prosekit/react/menu
 */

export * from '@prosekit/react/menu'
