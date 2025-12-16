<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { sampleContent } from '../../sample/sample-doc-full'
import { sampleUploader } from '../../sample/sample-uploader'
import { tags } from '../../sample/sample-tag-data'
import { users } from '../../sample/sample-user-data'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'
import { InlineMenu } from '../../ui/inline-menu'
import { SlashMenu } from '../../ui/slash-menu'
import { TableHandle } from '../../ui/table-handle'
import { TagMenu } from '../../ui/tag-menu'
import { Toolbar } from '../../ui/toolbar'
import { UserMenu } from '../../ui/user-menu'

import { defineExtension } from './extension'

const props: {
  initialContent?: NodeJSON
} = $props()

const extension = defineExtension()
const defaultContent = props.initialContent ?? sampleContent
const editor = createEditor({ extension, defaultContent })
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <Toolbar uploader={sampleUploader} />
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
      <InlineMenu />
      <SlashMenu />
      <UserMenu users={users} />
      <TagMenu tags={tags} />
      <BlockHandle />
      <TableHandle />
      <DropIndicator />
    </div>
  </div>
</ProseKit>
