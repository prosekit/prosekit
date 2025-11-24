/**
 * https://github.com/ProseMirror/prosemirror-keymap/blob/1.2.3/src/keymap.ts#L5
 *
 * @internal
 */
export const isApple: boolean = typeof navigator !== 'undefined'
  ? /Mac|iP(hone|[ao]d)/.test(navigator.platform)
  : false
