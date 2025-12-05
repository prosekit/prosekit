import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { sampleContent } from '../../sample/sample-doc-rtl'
import { sampleUploader } from '../../sample/sample-uploader'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'
import { InlineMenu } from '../../ui/inline-menu'
import { SlashMenu } from '../../ui/slash-menu'
import { TableHandle } from '../../ui/table-handle'
import { Toolbar } from '../../ui/toolbar'

interface EditorProps {
  initialContent?: NodeJSON
}

export default function Editor(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent
  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension, defaultContent })
  }, [defaultContent])

  return (
    <ProseKit editor={editor}>
      <div dir="rtl" className="CSS_EDITOR_VIEWPORT">
        <Toolbar uploader={sampleUploader} />
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
          <InlineMenu />
          <SlashMenu />
          <BlockHandle dir="rtl" />
          <TableHandle dir="rtl" />
          <DropIndicator />
        </div>
      </div>
    </ProseKit>
  )
}
