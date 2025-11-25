import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'
import { useEditor } from 'prosekit/solid'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/solid/popover'
import {
  createSignal,
  createUniqueId,
  Show,
  type JSX,
} from 'solid-js'

import { Button } from '../button'

export default function ImageUploadPopover(props: {
  uploader: Uploader<string>
  tooltip: string
  disabled: boolean
  children: JSX.Element
}): JSX.Element {
  const [open, setOpen] = createSignal(false)
  const [url, setUrl] = createSignal('')
  const [file, setFile] = createSignal<File | null>(null)
  const ariaId = createUniqueId()

  const editor = useEditor<ImageExtension>()

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const selectedFile = target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
      setUrl('')
    } else {
      setFile(null)
    }
  }

  const handleUrlChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const inputUrl = target.value

    if (inputUrl) {
      setUrl(inputUrl)
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
    if (url()) {
      editor().commands.insertImage({ src: url() })
    } else if (file()) {
      editor().commands.uploadImage({ file: file()!, uploader: props.uploader })
    }
    setOpen(false)
    deferResetState()
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      deferResetState()
    }
    setOpen(isOpen)
  }

  return (
    <PopoverRoot open={open()} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button pressed={open()} disabled={props.disabled} tooltip={props.tooltip}>
          {props.children}
        </Button>
      </PopoverTrigger>

      <PopoverContent class="CSS_IMAGE_UPLOAD_CARD">
        <Show when={!file()}>
          <label for={`id-link-${ariaId}`}>Embed Link</label>
          <input
            id={`id-link-${ariaId}`}
            class="CSS_IMAGE_UPLOAD_INPUT"
            placeholder="Paste the image link..."
            type="url"
            value={url()}
            onInput={handleUrlChange}
          />
        </Show>

        <Show when={!url()}>
          <label for={`id-upload-${ariaId}`}>Upload</label>
          <input
            id={`id-upload-${ariaId}`}
            class="CSS_IMAGE_UPLOAD_INPUT"
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
        </Show>

        <Show when={url()}>
          <button class="CSS_IMAGE_UPLOAD_BUTTON" onClick={handleSubmit}>
            Insert Image
          </button>
        </Show>

        <Show when={file()}>
          <button class="CSS_IMAGE_UPLOAD_BUTTON" onClick={handleSubmit}>
            Upload Image
          </button>
        </Show>
      </PopoverContent>
    </PopoverRoot>
  )
}
