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

export interface TableHandleColumnMenuRootProps extends MenuRootProps {}

/** @internal */
export const TableHandleColumnMenuRootPropsDeclaration: PropsDeclaration<TableHandleColumnMenuRootProps> = defineProps<
  TableHandleColumnMenuRootProps
>(MenuRootPropsDeclaration)

/** @internal */
export function setupTableHandleColumnMenuRoot(
  host: HostElement,
  props: State<TableHandleColumnMenuRootProps>,
): void {
  setupMenuRoot(host, props)
  const getStore = tableHandleStoreContext.consume(host)

  useEffect(host, () => {
    const open = props.open.get() || false
    const store = getStore?.()
    if (!store) return
    store.setIsColumnMenuOpen(open)
  })
}

const TableHandleColumnMenuRootElementBase: HostElementConstructor<TableHandleColumnMenuRootProps> = defineCustomElement(
  setupTableHandleColumnMenuRoot,
  TableHandleColumnMenuRootPropsDeclaration,
)

/**
 * `<prosekit-table-handle-column-menu-root>` custom element.
 *
 * Properties: {@link TableHandleColumnMenuRootProps}
 */
export class TableHandleColumnMenuRootElement extends TableHandleColumnMenuRootElementBase {}

/** @internal */
export function registerTableHandleColumnMenuRootElement(): void {
  registerCustomElement('prosekit-table-handle-column-menu-root', TableHandleColumnMenuRootElement)
}
