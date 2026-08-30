const nav = typeof navigator !== 'undefined' ? navigator : undefined
const platform = nav?.platform || ''
const vendor = nav?.vendor || ''

/**
 * Whether the current platform is an Apple platform (e.g., macOS, iOS, iPadOS)
 *
 * https://github.com/ProseMirror/prosemirror-keymap/blob/1.2.3/src/keymap.ts#L5
 *
 * @internal
 */
export const isApple: boolean = platform
  ? /Mac|iP(?:hone|[ao]d)/.test(platform)
  : false

/**
 * Whether the current browser uses Apple's WebKit engine: Safari on any
 * platform, every iOS browser, and WKWebView hosts.
 *
 * https://code.haverbeke.berlin/prosemirror/prosemirror-view/src/tag/1.42.3/src/browser.ts#L17
 *
 * @internal
 */
export const isWebKit: boolean = vendor ? /Apple Computer/.test(vendor) : false
