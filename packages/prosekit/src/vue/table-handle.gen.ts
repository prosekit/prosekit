/**
 * ## Anatomy
 *
 * ```jsx
 * import {
 *   TableHandleColumnMenuRoot,
 *   TableHandleColumnMenuTrigger,
 *   TableHandleColumnPopup,
 *   TableHandleColumnPositioner,
 *   TableHandleDragPreview,
 *   TableHandleDropIndicator,
 *   TableHandleRoot,
 *   TableHandleRowMenuRoot,
 *   TableHandleRowMenuTrigger,
 *   TableHandleRowPopup,
 *   TableHandleRowPositioner,
 * } from 'prosekit/vue/table-handle'
 * import {
 *   MenuItem,
 *   MenuPopup,
 *   MenuPositioner,
 * } from 'prosekit/vue/menu'
 *
 * <TableHandleRoot>
 *   <TableHandleDragPreview />
 *   <TableHandleDropIndicator />
 *   <TableHandleColumnPositioner>
 *     <TableHandleColumnPopup>
 *       <TableHandleColumnMenuRoot>
 *         <TableHandleColumnMenuTrigger>...</TableHandleColumnMenuTrigger>
 *         <MenuPositioner>
 *           <MenuPopup>
 *             <MenuItem>...</MenuItem>
 *           </MenuPopup>
 *         </MenuPositioner>
 *       </TableHandleColumnMenuRoot>
 *     </TableHandleColumnPopup>
 *   </TableHandleColumnPositioner>
 *   <TableHandleRowPositioner>
 *     <TableHandleRowPopup>
 *       <TableHandleRowMenuRoot>
 *         <TableHandleRowMenuTrigger>...</TableHandleRowMenuTrigger>
 *         <MenuPositioner>
 *           <MenuPopup>
 *             <MenuItem>...</MenuItem>
 *           </MenuPopup>
 *         </MenuPositioner>
 *       </TableHandleRowMenuRoot>
 *     </TableHandleRowPopup>
 *   </TableHandleRowPositioner>
 * </TableHandleRoot>
 * ```
 *
 * @module prosekit/vue/table-handle
 */

export * from '@prosekit/vue/table-handle'
