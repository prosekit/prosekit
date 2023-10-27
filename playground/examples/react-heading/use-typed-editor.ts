import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'

export const useTypedEditor = useEditor<EditorExtension>
