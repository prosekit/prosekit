<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/svelte/popover'
import Button from './button.svelte'
import type { EditorExtension } from './extension'
import { sampleUploader } from '../common/sample-uploader'

export let disabled: boolean
export let tooltip: string

let open = false
let url = ''
let file: File | null = null
const editor = useEditor<EditorExtension>()

const handleFileChange = (event: Event) => {
  const nextFile = (event.target as HTMLInputElement)?.files?.[0] ?? null

  file = nextFile
  if (nextFile) {
    url = ''
  }
}

const handleUrlChange = (event: Event) => {
  const nextUrl = (event.target as HTMLInputElement)?.value ?? ''

  url = nextUrl
  if (nextUrl) {
    file = null
  }
}

const deferResetState = () => {
  setTimeout(() => {
    url = ''
    file = null
  }, 300)
}

const handleSubmit = () => {
  if (url) {
    $editor.commands.insertImage({ src: url })
  } else if (file) {
    $editor.commands.uploadImage({ file, uploader: sampleUploader })
  }
  deferResetState()
  open = false
}

const handleOpenChange = (openValue: boolean) => {
  if (!openValue) {
    deferResetState()
  }
  open = openValue
}
</script>

<PopoverRoot {open} on:OpenChange={handleOpenChange}>
  <PopoverTrigger>
    <Button pressed={open} {disabled} {tooltip}>
      <slot />
    </Button>
  </PopoverTrigger>

  <PopoverContent class="CSS_IMAGE_UPLOAD_CARD">
    {#if !file}
      <label for="embed-link-input">Embed Link</label>
      <input
        class="CSS_IMAGE_UPLOAD_INPUT"
        placeholder="Paste the image link..."
        type="url"
        value={url}
        on:input={handleUrlChange}
        id="embed-link-input"
      />
    {/if}
    {#if !url}
      <label for="upload-input">Upload</label>
      <input
        class="CSS_IMAGE_UPLOAD_INPUT"
        accept="image/*"
        type="file"
        on:change={handleFileChange}
      />
    {/if}
    {#if url}
      <button class="CSS_IMAGE_UPLOAD_BUTTON" on:click={handleSubmit}>
        Insert Image
      </button>
    {/if}
    {#if file}
      <button class="CSS_IMAGE_UPLOAD_BUTTON" on:click={handleSubmit}>
        Upload Image
      </button>
    {/if}
  </PopoverContent>
</PopoverRoot>
