import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import BlockHandle from './block-handle'
import { defineExtension } from './extension'

const defaultContent = `
<ul>
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>A1</span>
  </li>
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>A2</span>
  </li>
    <li data-list-kind="task">
    <input type="checkbox" />
    <span>A3</span>
  </li>
    <li data-list-kind="task">
    <input type="checkbox" />
    <span>A4</span>
  </li>
    <li data-list-kind="task">
    <input type="checkbox" />
    <span>A5</span>
  </li>
    <li data-list-kind="task">
    <input type="checkbox" />
    <span>A6</span>
  </li>  
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>A7</span>
    <ul>
      <li data-list-kind="task">
        <input type="checkbox" />
        <span>B1</span>
      </li>
      <li data-list-kind="task">
        <input type="checkbox" />
        <span>B2</span>
      </li>
    </ul>
  </li>
</ul>
`

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
          <BlockHandle></BlockHandle>
        </div>
      </div>
    </ProseKit>
  )
}
