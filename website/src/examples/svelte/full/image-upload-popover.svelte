<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/svelte/popover'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

export let disabled: boolean
export let tooltip: string

let open = false
let webUrl = ''
let objectUrl = ''
$: url = webUrl || objectUrl
const editor = useEditor<EditorExtension>()

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]

  if (file) {
    objectUrl = URL.createObjectURL(file)
    webUrl = ''
  } else {
    objectUrl = ''
  }
}

const handleWebUrlChange = (event: Event) => {
  const url = (event.target as HTMLInputElement)?.value

  if (url) {
    webUrl = url
    objectUrl = ''
  } else {
    webUrl = ''
  }
}

const deferResetState = () => {
  setTimeout(() => {
    webUrl = ''
    objectUrl = ''
  }, 300)
}

const handleSubmit = () => {
  $editor.commands.insertImage({ src: url })
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
    {#if !objectUrl}
      <label for="embed-link-input">Embed Link</label>
      <input
        class="CSS_IMAGE_UPLOAD_INPUT"
        placeholder="Paste the image link..."
        type="url"
        value={webUrl}
        on:input={handleWebUrlChange}
        id="embed-link-input"
      />
    {/if}
    {#if !webUrl}
      <label for="upload-input">Upload</label>
      <input
        class="CSS_IMAGE_UPLOAD_INPUT"
        accept="image/*"
        type="file"
        on:input={handleFileChange}
      />
    {/if}
    {#if url}
      <button class="CSS_IMAGE_UPLOAD_BUTTON" on:click={handleSubmit}>
        Insert Image
      </button>
    {/if}
  </PopoverContent>
</PopoverRoot>
