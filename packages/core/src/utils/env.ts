/**
 * https://github.com/ProseMirror/prosemirror-keymap/blob/1.2.3/src/keymap.ts#L5
 *
 * @internal
 */
export const isApple: boolean = typeof navigator !== 'undefined'
  ? /Mac|iP(?:hone|[ao]d)/.test(navigator.platform)
  : false

/**
 * https://github.com/ProseMirror/prosemirror-view/blob/1.42.1/src/browser.ts#L17
 *
 * @internal
 */
export const isSafari: boolean = typeof navigator !== 'undefined'
  ? /Apple Computer/.test(navigator.vendor)
  : false
