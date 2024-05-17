export * from 'prosemirror-model'
export { Node as ProseMirrorNode } from 'prosemirror-model'
export { Fragment as ProseMirrorFragment } from 'prosemirror-model'

declare module '@prosekit/pm/model' {
  export interface AttributeSpec {
    default?: any
    splittable?: boolean
  }
}
