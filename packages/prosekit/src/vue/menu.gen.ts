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
 * } from 'prosekit/vue/menu'
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
 * @module prosekit/vue/menu
 */

export * from '@prosekit/vue/menu'
