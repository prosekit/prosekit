import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { useMemo } from 'preact/hooks'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { sampleContent } from '../../sample/sample-doc-rtl.ts'
import { sampleUploader } from '../../sample/sample-uploader.ts'
import { BlockHandle } from '../../ui/block-handle/index.ts'
import { DropIndicator } from '../../ui/drop-indicator/index.ts'
import { InlineMenu } from '../../ui/inline-menu/index.ts'
import { SlashMenu } from '../../ui/slash-menu/index.ts'
import { TableHandle } from '../../ui/table-handle/index.ts'
import { Toolbar } from '../../ui/toolbar/index.ts'

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
