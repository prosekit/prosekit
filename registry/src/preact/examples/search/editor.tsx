import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/search/style.css'

import { useMemo } from 'preact/hooks'
import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { sampleContent } from '../../sample/sample-doc-search'
import { Search } from '../../ui/search'

import { defineExtension } from './extension'

interface EditorProps {
  defaultContent?: NodeJSON
}

export default function Editor(props: EditorProps) {
  const defaultContent = props.defaultContent ?? sampleContent
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({
      extension,
      defaultContent,
    })
  }, [defaultContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <Search />
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
