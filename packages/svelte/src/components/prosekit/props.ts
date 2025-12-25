import type { Editor } from '@prosekit/core'
import type { Snippet } from 'svelte'

export interface ProseKitProps {
  editor: Editor
  children?: Snippet
}
