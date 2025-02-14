export * from 'prosemirror-view'

declare global {
  interface Node {
    /** @internal */
    // @ts-expect-error: Remove the pmViewDesc property to avoid it from showing in the docs.
    pmViewDesc?: undefined
  }
}
