import { UploadTask } from 'prosekit/extensions/file'
import { useEditor } from 'prosekit/solid'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/solid/popover'
import { createSignal, Show, type ParentProps } from 'solid-js'

import Button from './button'
import type { EditorExtension } from './extension'
import { sampleUploader } from './sample-uploader'

export function ImageUploadPopover({
  tooltip,
  disabled,
  children,
}: ParentProps<{
  tooltip: string
  disabled: () => boolean
}>) {
  const [open, setOpen] = createSignal(false)
  const [webUrl, setWebUrl] = createSignal('')
  const [objectUrl, setObjectUrl] = createSignal('')

  const editor = useEditor<EditorExtension>()

  const url = () => webUrl() || objectUrl()

  const handleFileChange = (event: Event & { currentTarget: HTMLInputElement }) => {
    const file = event.currentTarget.files?.[0]

    if (file) {
      const uploadTask = new UploadTask({
        file,
        uploader: sampleUploader,
      })
      setObjectUrl(uploadTask.objectURL)
      setWebUrl('')
    } else {
      setObjectUrl('')
    }
  }

  const handleWebUrlChange = (
    event: InputEvent & { currentTarget: HTMLInputElement },
  ) => {
    const nextUrl = event.currentTarget.value
    if (nextUrl) {
      setWebUrl(nextUrl)
      setObjectUrl('')
    } else {
      setWebUrl('')
    }
  }

  const deferResetState = () => {
    setTimeout(() => {
      setWebUrl('')
      setObjectUrl('')
    }, 300)
  }

  const handleSubmit = () => {
    const src = url()
    if (!src) {
      return
    }
    editor().commands.insertImage({ src })
    deferResetState()
    setOpen(false)
  }

  const handleOpenChange = (event: CustomEvent<boolean>) => {
    if (!event.detail) {
      deferResetState()
    }
    setOpen(event.detail)
  }

  return (
    <PopoverRoot open={open()} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button
          pressed={() => open()}
          disabled={disabled}
          tooltip={tooltip}
        >
          {children}
        </Button>
      </PopoverTrigger>

      <PopoverContent class="CSS_IMAGE_UPLOAD_CARD">
        <Show when={!objectUrl()}>
          <>
            <label>Embed Link</label>
            <input
              class="CSS_IMAGE_UPLOAD_INPUT"
              placeholder="Paste the image link..."
              type="url"
              value={webUrl()}
              onInput={handleWebUrlChange}
            />
          </>
        </Show>

        <Show when={!webUrl()}>
          <>
            <label>Upload</label>
            <input
              class="CSS_IMAGE_UPLOAD_INPUT"
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </>
        </Show>

        <Show when={url()}>
          <button class="CSS_IMAGE_UPLOAD_BUTTON" type="button" onClick={handleSubmit}>
            Insert Image
          </button>
        </Show>
      </PopoverContent>
    </PopoverRoot>
  )
}
