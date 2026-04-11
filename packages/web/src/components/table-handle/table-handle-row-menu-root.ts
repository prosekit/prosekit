import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { MenuRootPropsDeclaration, setupMenuRoot, type MenuRootProps } from '@aria-ui/elements/menu'

import { tableHandleStoreContext } from './store.ts'

export interface TableHandleRowMenuRootProps extends MenuRootProps {}

/** @internal */
export const TableHandleRowMenuRootPropsDeclaration: PropsDeclaration<TableHandleRowMenuRootProps> = defineProps<
  TableHandleRowMenuRootProps
>(MenuRootPropsDeclaration)

/** @internal */
export function setupTableHandleRowMenuRoot(
  host: HostElement,
  props: State<TableHandleRowMenuRootProps>,
): void {
  setupMenuRoot(host, props)
  const getStore = tableHandleStoreContext.consume(host)

  useEffect(host, () => {
    const open = props.open.get() || false
    const store = getStore?.()
    if (!store) return
    store.setIsRowMenuOpen(open)
  })
}

const TableHandleRowMenuRootElementBase: HostElementConstructor<TableHandleRowMenuRootProps> = defineCustomElement(
  setupTableHandleRowMenuRoot,
  TableHandleRowMenuRootPropsDeclaration,
)

/**
 * `<prosekit-table-handle-row-menu-root>` custom element.
 *
 * Properties: {@link TableHandleRowMenuRootProps}
 */
export class TableHandleRowMenuRootElement extends TableHandleRowMenuRootElementBase {}

/** @internal */
export function registerTableHandleRowMenuRootElement(): void {
  registerCustomElement('prosekit-table-handle-row-menu-root', TableHandleRowMenuRootElement)
}
