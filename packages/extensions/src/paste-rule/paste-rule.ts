import type { PlainExtension } from '@prosekit/core'
import type { Slice } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

import { definePasteRulePlugin } from './paste-rule-plugin'

/**
 * @public
 *
 * Options for {@link PasteRuleHandler}.
 */
export interface PasteRuleHandlerOptions {
  /**
   * The slice to be pasted.
   */
  slice: Slice

  /**
   * The editor view.
   */
  view: EditorView

  /**
   * Whether the pasted content is treated as plain text. This is true when the
   * `Shift` key is held when pasting.
   */
  plain: boolean
}

/**
 * @public
 *
 * Can be used to transform pasted or dragged-and-dropped content before it is
 * applied to the document.
 */
export type PasteRuleHandler = (options: PasteRuleHandlerOptions) => Slice

/**
 * Options for {@link definePasteRule}.
 *
 * @public
 */
export interface PasteRuleOptions {
  /**
   * A function to be called when a paste rule is triggered.
   */
  handler: PasteRuleHandler
}

/**
 * Defines a paste rule. This rule allows you to modify pasted or dragged
 * content before it is inserted into the document.
 *
 * @param options
 *
 * @public
 */
export function definePasteRule({ handler }: PasteRuleOptions): PlainExtension {
  return definePasteRulePlugin(handler)
}
