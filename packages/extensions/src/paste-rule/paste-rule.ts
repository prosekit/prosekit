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
export type PasteRuleOptions = {
  /**
   * A function to be called when a paste rule is triggered.
   */
  handler: PasteRuleHandler
}

/**
 * Defines an paste rule. A paste rule can be used to transform pasted or
 * dragged-and-dropped content before it is applied to the document.
 *
 * @param options
 *
 * @public
 */
export function definePasteRule({ handler }: PasteRuleOptions): PlainExtension {
  return definePasteRulePlugin(handler)
}
