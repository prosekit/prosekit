import { useEditor } from 'prosekit/solid'

import type { EditorExtension } from './extension'

export const useTypedEditor = useEditor<EditorExtension>
