import 'prosekit/basic/style.css'
import { Themes } from '@prosekit/themes'
import { useCallback, useMemo } from 'preact/hooks'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import { ProseKit, useDocChange } from 'prosekit/preact'

export default function Editor(props: {
  defaultDoc?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}) {
  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension, defaultDoc: props.defaultDoc })
  }, [])

  const handleDocChange = useCallback(
    (doc: ProseMirrorNode) => props.onDocUpdate?.(jsonFromNode(doc)),
    [props.onDocUpdate],
  )
  useDocChange(handleDocChange, { editor })

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
      </div>
    </ProseKit>
  )
}
