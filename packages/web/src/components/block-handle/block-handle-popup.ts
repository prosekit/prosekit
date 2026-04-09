import {
  defineCustomElement,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '@aria-ui/elements/overlay'

import { blockHandleOverlayStoreContext } from './context.ts'

/**
 * @public
 */
export interface BlockHandlePopupProps extends OverlayPopupProps {}

/** @internal */
export const BlockHandlePopupPropsDeclaration: PropsDeclaration<BlockHandlePopupProps> = OverlayPopupPropsDeclaration

/** @internal */
export function setupBlockHandlePopup(
  host: HostElement,
  _props: State<BlockHandlePopupProps>,
): void {
  const getOverlayStore = blockHandleOverlayStoreContext.consume(host)
  setupOverlayPopup(host, getOverlayStore)
}

const BlockHandlePopupElementBase: HostElementConstructor<BlockHandlePopupProps> = defineCustomElement(
  setupBlockHandlePopup,
  BlockHandlePopupPropsDeclaration,
)

/**
 * @public
 */
export class BlockHandlePopupElement extends BlockHandlePopupElementBase {}

/** @internal */
export function registerBlockHandlePopupElement(): void {
  registerCustomElement('prosekit-block-handle-popup', BlockHandlePopupElement)
}
