import type { PlainExtension } from '@prosekit/core'
import type { Slice } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

import { definePasteRule } from './paste-rule'

/**
 * @public
 *
 * Options for {@link MarkPasteRuleHandler}.
 */
export interface MarkPasteRuleHandlerOptions {
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
 */
export type MarkPasteRuleHandler = (options: MarkPasteRuleHandlerOptions) => Slice

/**
 * Options for {@link defineMarkPasteRule}.
 *
 * @public
 */
export type MarkPasteRuleOptions = {
  /**
   * A function to be called when a paste rule is triggered.
   */
  handler: MarkPasteRuleHandler
}

/**
 * Defines a mark paste rule. This rule allows you to modify pasted or dragged
 * content by applying marks to it before it is inserted into the document.
 *
 * @param options
 *
 * @public
 */
export function defineMarkPasteRule(options: MarkPasteRuleOptions): PlainExtension {
  return definePasteRule(options)
}
