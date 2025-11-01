<script lang="ts">
import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'
import { useEditor } from 'prosekit/svelte'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/svelte/popover'

import { Button } from '../button'

interface Props {
  uploader: Uploader<string>
  tooltip: string
  disabled: boolean
  children?: import('svelte').Snippet
}

const props: Props = $props()

let open = $state(false)
let url = $state('')
let file = $state<File | null>(null)

const editor = useEditor<ImageExtension>()

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0]

  if (selectedFile) {
    file = selectedFile
    url = ''
  } else {
    file = null
  }
}

function handleUrlChange(event: Event) {
  const target = event.target as HTMLInputElement
  const inputUrl = target.value

  if (inputUrl) {
    url = inputUrl
    file = null
  } else {
    url = ''
  }
}

function deferResetState() {
  setTimeout(() => {
    url = ''
    file = null
  }, 300)
}

function handleSubmit() {
  if (url) {
    $editor.commands.insertImage({ src: url })
  } else if (file) {
    $editor.commands.uploadImage({ file, uploader: props.uploader })
  }
  open = false
  deferResetState()
}

function handleOpenChange(isOpen: boolean) {
  if (!isOpen) {
    deferResetState()
  }
  open = isOpen
}
</script>

<PopoverRoot {open} onOpenChange={handleOpenChange}>
  <PopoverTrigger>
    <Button pressed={open} disabled={props.disabled} tooltip={props.tooltip}>
      {@render props.children?.()}
    </Button>
  </PopoverTrigger>

  <PopoverContent class="CSS_IMAGE_UPLOAD_CARD">
    {#if !file}
      <label>Embed Link</label>
      <input
        class="CSS_IMAGE_UPLOAD_INPUT"
        placeholder="Paste the image link..."
        type="url"
        value={url}
        oninput={handleUrlChange}
      />
    {/if}

    {#if !url}
      <label>Upload</label>
      <input
        class="CSS_IMAGE_UPLOAD_INPUT"
        accept="image/*"
        type="file"
        onchange={handleFileChange}
      />
    {/if}

    {#if url}
      <button class="CSS_IMAGE_UPLOAD_BUTTON" onclick={handleSubmit}>
        Insert Image
      </button>
    {/if}

    {#if file}
      <button class="CSS_IMAGE_UPLOAD_BUTTON" onclick={handleSubmit}>
        Upload Image
      </button>
    {/if}
  </PopoverContent>
</PopoverRoot>
