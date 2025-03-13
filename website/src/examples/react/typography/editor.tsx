import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defaultTypographyContent } from './default-typography-content'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineBasicExtension(), defaultContent: defaultTypographyContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}
