import { createTextBlockEnterRule, type EnterRule } from 'prosemirror-enter-rules'

export const MATH_BLOCK_ENTER_REGEXP: RegExp = /^\$\$$/

export const mathBlockEnterRule: EnterRule = /* @__PURE__ */ createTextBlockEnterRule({
  regex: MATH_BLOCK_ENTER_REGEXP,
  type: 'mathBlock',
})
