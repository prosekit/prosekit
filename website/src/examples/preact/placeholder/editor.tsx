import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { useMemo } from 'preact/hooks'
import { useCallback } from 'preact/hooks'
import {
  createEditor,
  jsonFromNode,
  type NodeJSON,
} from 'prosekit/core'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/preact'

import { defineExtension } from './extension'

export default function Editor({
  defaultContent,
  onDocUpdate,
}: {
  defaultContent?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}) {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent })
  }, [defaultContent])

  const handleDocChange = useCallback(
    (doc: ProseMirrorNode) => onDocUpdate?.(jsonFromNode(doc)),
    [onDocUpdate],
  )
  useDocChange(handleDocChange, { editor })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
