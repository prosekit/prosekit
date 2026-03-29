import type { HostElement } from '@aria-ui-v2/core'
import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui-v2/core'
import { MenuStoreContext } from '@aria-ui-v2/elements/menu'
import { OverlayPositionerPropsDeclaration, setupOverlayPositioner, type OverlayPositionerProps } from '@aria-ui-v2/elements/overlay'
import type { OffsetOptions, Placement } from '@floating-ui/dom'
import { once } from '@ocavue/utils'

export interface TableHandlePopoverPositionerProps extends Omit<OverlayPositionerProps, 'placement' | 'offset'> {
  /**
   * @default "right-start"
   */
  placement: Placement

  /**
   * @default {mainAxis: -4, crossAxis: 4}
   */
  offset: OffsetOptions
}

/** @internal */
export const TableHandlePopoverPositionerPropsDeclaration: PropsDeclaration<TableHandlePopoverPositionerProps> = defineProps<
  TableHandlePopoverPositionerProps
>({
  ...OverlayPositionerPropsDeclaration,
  placement: { default: 'right-start', attribute: 'placement', type: 'string' },
  offset: { default: { mainAxis: -4, crossAxis: 4 }, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupTableHandlePopoverPositioner(
  host: HostElement,
  props: Store<TableHandlePopoverPositionerProps>,
): void {
  const getMenuStore = MenuStoreContext.consume(host)
  const getOverlayStore = () => {
    const result = getMenuStore()?.overlayStore; 
    console.log('DEBUG getOverlayStore called, returning:', result)
    return result }


    useEffect(host, () => {
       const overlayStore = getOverlayStore()
       if (!overlayStore) {
        return 
       }
       console.log("DEBUG getAnchorElement", overlayStore.getAnchorElement())
       console.log("DEBUG isOpen", overlayStore.getIsOpen())

  })

  setupOverlayPositioner(host, props, getOverlayStore)
}

const TableHandlePopoverPositionerElementBase: HostElementConstructor<TableHandlePopoverPositionerProps> = defineCustomElement(
  setupTableHandlePopoverPositioner,
  TableHandlePopoverPositionerPropsDeclaration,
)

/**
 * @public
 */
export class TableHandlePopoverPositionerElement extends TableHandlePopoverPositionerElementBase {}

/**
 * @internal
 */
export const registerTableHandlePopoverPositionerElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-popover-positioner', TableHandlePopoverPositionerElement)
})
