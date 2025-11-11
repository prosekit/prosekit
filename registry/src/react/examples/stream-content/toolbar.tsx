import { useEditor } from 'prosekit/react'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={false}
        disabled={!editor.commands.streamContent?.canExec()}
        onClick={() => editor.commands.streamContent?.()}
        tooltip="开始流式内容展示"
      >
        流式内容
      </Button>
    </div>
  )
}

