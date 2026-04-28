import { defineProps, type PropsDeclaration } from '@aria-ui/core'
import { OverlayPositionerPropsDeclaration, type OverlayPositionerProps } from '@aria-ui/elements/overlay'
import type { Editor } from '@prosekit/core'

/**
 * @internal
 */
export interface SharedTableHandlePositionerProps extends Omit<OverlayPositionerProps, 'hoist' | 'flip' | 'shift' | 'hide' | 'offset'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: OverlayPositionerProps['hoist']

  /**
   * @default false
   * @hidden
   */
  flip: OverlayPositionerProps['flip']

  /**
   * @default false
   * @hidden
   */
  shift: OverlayPositionerProps['shift']

  /**
   * @default true
   * @hidden
   */
  hide: OverlayPositionerProps['hide']

  /**
   * @default 0
   * @hidden
   */
  offset: OverlayPositionerProps['offset']
}

/** @internal */
export const SharedTableHandlePositionerPropsDeclaration: PropsDeclaration<SharedTableHandlePositionerProps> = defineProps<
  SharedTableHandlePositionerProps
>({
  ...OverlayPositionerPropsDeclaration,
  editor: { default: null, attribute: false },
  hoist: { default: false, attribute: false },
  flip: { default: false, attribute: false },
  shift: { default: false, attribute: false },
  hide: { default: true, attribute: false },
  offset: { default: 0, attribute: false },
})
