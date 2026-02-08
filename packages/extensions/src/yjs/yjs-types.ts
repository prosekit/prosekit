import type { yCursorPlugin } from 'y-prosemirror'

/**
 * @internal
 *
 * The type `Awareness` is not exported by `y-prosemirror` so we need to define it like this.
 */
export type Awareness = Parameters<typeof yCursorPlugin>[0]
