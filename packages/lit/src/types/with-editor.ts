import type { Editor } from '@prosekit/core'

export type WithEditor<T> = T & { editor?: Editor | undefined | null }
