import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { sampleContent } from '../../sample/sample-doc-heading'
import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

interface EditorProps {
  defaultContent?: NodeJSON
}

export default function Editor(props: EditorProps) {
  const defaultContent = props.defaultContent ?? sampleContent
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [defaultContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <Toolbar />
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
