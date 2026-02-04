import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import './style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo, useState } from 'react'

import { sampleContent } from '../../sample/sample-doc-notion'
import { tags } from '../../sample/sample-tag-data'
import { users } from '../../sample/sample-user-data'
import { DropIndicator } from '../../ui/drop-indicator'
import { InlineMenu } from '../../ui/inline-menu'
import { TableHandle } from '../../ui/table-handle'
import { TagMenu } from '../../ui/tag-menu'
import { UserMenu } from '../../ui/user-menu'

import BlockHandle from './block-handle'
import { defineExtension } from './extension'
import { SlashMenu } from './slash-menu'

interface EditorProps {
  initialContent?: NodeJSON
}

export default function Editor(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent })
  }, [defaultContent])

  const [slashMenuOpen, setSlashMenuOpen] = useState(false)

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT" data-prosekit-example="notion">
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
          <InlineMenu />
          <SlashMenu onOpenChange={setSlashMenuOpen} />
          <UserMenu users={users} />
          <TagMenu tags={tags} />
          <BlockHandle enabled={!slashMenuOpen} />
          <TableHandle />
          <DropIndicator />
        </div>
      </div>
    </ProseKit>
  )
}
