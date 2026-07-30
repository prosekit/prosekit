import { isSafari } from '@prosekit/core'

/**
 * Builds the query string from the regex match found before the cursor. The
 * returned query is exposed via the `queryChange` event and used by the
 * built-in item filter.
 */
export type QueryBuilder = (match: RegExpExecArray) => string

const NEAR_COMPOSITION_END_MS = 500

/**
 * @internal
 */
export interface CompositionEndTracker {
  endedAt: number
}

/**
 * @internal
 */
export function createCompositionEndTracker(): CompositionEndTracker {
  return { endedAt: -Infinity }
}

/**
 * Whether a keydown event belongs to an IME composition and thus must not be
 * treated as a real key press.
 *
 * Chromium and Firefox fire the keydown that commits a composition while the
 * composition is still active (`isComposing: true`, `keyCode: 229`). WebKit
 * fires `compositionend` first and delivers the committing keydown afterwards
 * as a plain key press, so on Safari a keydown close to the last
 * `compositionend` is ignored once, mirroring prosemirror-view's
 * `inOrNearComposition`.
 *
 * @internal
 */
export function shouldIgnoreKeydownNearComposition(
  event: KeyboardEvent,
  composing: boolean,
  tracker: CompositionEndTracker,
  safari: boolean = isSafari,
): boolean {
  // eslint-disable-next-line unicorn/prefer-keyboard-event-key -- keyCode 229 marks an IME-processed keydown; `key` carries no equivalent signal
  if (composing || event.isComposing || event.keyCode === 229) {
    return true
  }
  if (safari && Math.abs(event.timeStamp - tracker.endedAt) < NEAR_COMPOSITION_END_MS) {
    tracker.endedAt = -Infinity
    return true
  }
  return false
}

export function defaultQueryBuilder(match: RegExpExecArray): string {
  return match[0]
    .toLowerCase()
    .replaceAll(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '')
    .replaceAll(/\s{2,}/g, ' ')
    .trim()
}
