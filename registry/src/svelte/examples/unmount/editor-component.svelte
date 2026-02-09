<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { InlineMenu } from '../../ui/inline-menu'
import ExtensionComponent from './extension-component.svelte'

const props = $props<{
  placeholder: string
}>()

const extension = defineBasicExtension()
const editor = createEditor({ extension })
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
      <InlineMenu />
    </div>
  </div>
  <ExtensionComponent placeholder={props.placeholder} />
</ProseKit>
