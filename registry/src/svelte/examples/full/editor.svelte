<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { untrack } from 'svelte'

import { sampleContent } from '../../sample/sample-doc-full.ts'
import { sampleUploader } from '../../sample/sample-uploader.ts'
import { tags } from '../../sample/sample-tag-data.ts'
import { users } from '../../sample/sample-user-data.ts'
import { BlockHandle } from '../../ui/block-handle/index.ts'
import { DropIndicator } from '../../ui/drop-indicator/index.ts'
import { InlineMenu } from '../../ui/inline-menu/index.ts'
import { SlashMenu } from '../../ui/slash-menu/index.ts'
import { TableHandle } from '../../ui/table-handle/index.ts'
import { TagMenu } from '../../ui/tag-menu/index.ts'
import { Toolbar } from '../../ui/toolbar/index.ts'
import { UserMenu } from '../../ui/user-menu/index.ts'

import { defineExtension } from './extension.ts'

const props: {
  initialContent?: NodeJSON
} = $props()

const extension = defineExtension()
const defaultContent = untrack(() => props.initialContent ?? sampleContent)
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
