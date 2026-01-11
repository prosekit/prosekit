import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

import { tags } from '../../sample/sample-tag-data'
import { users } from '../../sample/sample-user-data'
import { TagMenu } from '../../ui/tag-menu'
import { UserMenu } from '../../ui/user-menu'

import { defineExtension } from './extension'

export default function Editor(): JSX.Element {
  const extension = defineExtension()
  const editor = createEditor({ extension })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
          <UserMenu users={users} />
          <TagMenu tags={tags} />
        </div>
      </div>
    </ProseKit>
  )
}
