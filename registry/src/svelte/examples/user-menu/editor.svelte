<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { tags } from '../../sample/sample-tag-data.ts'
import { users } from '../../sample/sample-user-data.ts'
import { TagMenu } from '../../ui/tag-menu/index.ts'
import { UserMenu } from '../../ui/user-menu/index.ts'

import { defineExtension } from './extension.ts'

const extension = defineExtension()
const editor = createEditor({ extension })
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
      <UserMenu {users} />
      <TagMenu {tags} />
    </div>
  </div>
</ProseKit>
