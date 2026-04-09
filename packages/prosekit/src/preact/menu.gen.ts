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
 * } from 'prosekit/preact/menu'
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
 * @module prosekit/preact/menu
 */

export * from '@prosekit/preact/menu'
