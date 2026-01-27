import type { yCursorPlugin } from 'y-prosemirror'

// TODO: Remove `import type { Awareness } from 'y-protocols/awareness'` from examples.

/**
 * @internal
 *
 * The type `Awareness` is not exported by `y-prosemirror` so we need to define it like this.
 */
export type Awareness = Parameters<typeof yCursorPlugin>[0]
