import { createTextBlockEnterRule, type EnterRule } from 'prosemirror-enter-rules'

export const MATH_BLOCK_ENTER_REGEXP: RegExp = /^\$\$$/

/**
 * An {@link EnterRule} that converts a textblock node that only contains `$$` into a math
 * block node when Enter is pressed.
 *
 * @public
 */
export const mathBlockEnterRule: EnterRule = /* @__PURE__ */ createTextBlockEnterRule({
  regex: MATH_BLOCK_ENTER_REGEXP,
  type: 'mathBlock',
})
