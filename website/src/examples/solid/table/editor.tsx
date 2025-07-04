import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import TableHandle from './table-handle'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension(), defaultContent })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT" />
          <TableHandle />
        </div>
      </div>
    </ProseKit>
  )
}

const defaultContent = `
<table><tbody>
  <tr>
    <td>A1</td>
    <td>B1</td>
    <td>C1</td>
    <td>D1</td>
  </tr>
  <tr>
    <td>A2</td>
    <td>B2</td>
    <td>C2</td>
    <td>D2</td>
  </tr>
</tbody></table>
`
