import { useEditor } from 'prosekit/solid'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/solid/popover'
import {
  createSignal,
  Show,
  type ParentProps,
} from 'solid-js'

import Button from './button'
import type { EditorExtension } from './extension'
import { sampleUploader } from './sample-uploader'

export function ImageUploadPopover(
  props: ParentProps<{
    tooltip: string
    disabled: () => boolean
  }>,
) {
  const [open, setOpen] = createSignal(false)
  const [url, setUrl] = createSignal('')
  const [file, setFile] = createSignal<File | null>(null)

  const editor = useEditor<EditorExtension>()

  const handleFileChange = (event: Event & { currentTarget: HTMLInputElement }) => {
    const file = event.currentTarget.files?.[0]

    if (file) {
      setFile(file)
      setUrl('')
    } else {
      setFile(null)
    }
  }

  const handleUrlChange = (
    event: InputEvent & { currentTarget: HTMLInputElement },
  ) => {
    const nextUrl = event.currentTarget.value
    if (nextUrl) {
      setUrl(nextUrl)
      setFile(null)
    } else {
      setUrl('')
    }
  }

  const deferResetState = () => {
    setTimeout(() => {
      setUrl('')
      setFile(null)
    }, 300)
  }

  const handleSubmit = () => {
    const src = url()
    const nextFile = file()

    if (src) {
      editor().commands.insertImage({ src })
    } else if (nextFile) {
      editor().commands.uploadImage({ file: nextFile, uploader: sampleUploader })
    }
    setOpen(false)
    deferResetState()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      deferResetState()
    }
    setOpen(nextOpen)
  }

  return (
    <PopoverRoot open={open()} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button
          pressed={() => open()}
          disabled={props.disabled}
          tooltip={props.tooltip}
        >
          {props.children}
        </Button>
      </PopoverTrigger>

      <PopoverContent class="CSS_IMAGE_UPLOAD_CARD">
        <Show when={!file()}>
          <>
            <label>Embed Link</label>
            <input
              class="CSS_IMAGE_UPLOAD_INPUT"
              placeholder="Paste the image link..."
              type="url"
              value={url()}
              onInput={handleUrlChange}
            />
          </>
        </Show>

        <Show when={!url()}>
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

        <Show when={file()}>
          <button class="CSS_IMAGE_UPLOAD_BUTTON" type="button" onClick={handleSubmit}>
            Upload Image
          </button>
        </Show>
      </PopoverContent>
    </PopoverRoot>
  )
}
