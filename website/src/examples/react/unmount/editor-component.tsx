import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import ExtensionComponent from './extension-component'

export default function EditorComponent({
  placeholder,
}: {
  placeholder: string
}) {
  const editor = useMemo(() => {
    return createEditor({ extension: defineBasicExtension() })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
      <ExtensionComponent placeholder={placeholder} />
    </ProseKit>
  )
}
