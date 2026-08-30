/**
 * Whether the current platform is an Apple platform (e.g., macOS, iOS, iPadOS)
 *
 * https://github.com/ProseMirror/prosemirror-keymap/blob/1.2.3/src/keymap.ts#L5
 *
 * @internal
 */
export const isApple: boolean = typeof navigator !== 'undefined'
  ? /Mac|iP(?:hone|[ao]d)/.test(navigator.platform)
  : false

/**
 * Whether the current browser uses Apple's WebKit engine: Safari on any
 * platform, every iOS browser, and WKWebView hosts. Matches the check that
 * prosemirror-view uses for its Safari-specific code paths. Blink reports a
 * `"Google Inc."` vendor, and Node.js's global `navigator` has no `vendor`
 * field at all.
 *
 * https://github.com/ProseMirror/prosemirror-view/blob/1.42.3/src/browser.ts#L17
 *
 * @internal
 */
export const isWebKit: boolean = typeof navigator !== 'undefined'
  && navigator.vendor != null
  && navigator.vendor.includes('Apple Computer')
