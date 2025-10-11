import type { ComponentChild } from 'preact'
import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { useEditor } from 'prosekit/preact'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/preact/popover'

import Button from './button'
import type { EditorExtension } from './extension'
import { sampleUploader } from './sample-uploader'

export function ImageUploadPopover({
  tooltip,
  disabled,
  children,
}: {
  tooltip: string
  disabled: boolean
  children: ComponentChild
}) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const editor = useEditor<EditorExtension>()

  const handleFileChange = (
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const file = event.currentTarget.files?.[0]

    if (file) {
      setFile(file)
      setUrl('')
    } else {
      setFile(null)
    }
  }

  const handleUrlChange = (
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const url = event.currentTarget.value

    if (url) {
      setUrl(url)
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
    if (url) {
      editor.commands.insertImage({ src: url })
    } else if (file) {
      editor.commands.uploadImage({ file, uploader: sampleUploader })
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
    <PopoverRoot open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button pressed={open} disabled={disabled} tooltip={tooltip}>
          {children}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="CSS_IMAGE_UPLOAD_CARD">
        {file ? null : (
          <>
            <label>Embed Link</label>
            <input
              className="CSS_IMAGE_UPLOAD_INPUT"
              placeholder="Paste the image link..."
              type="url"
              value={url}
              onChange={handleUrlChange}
            />
          </>
        )}

        {url ? null : (
          <>
            <label>Upload</label>
            <input
              className="CSS_IMAGE_UPLOAD_INPUT"
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </>
        )}

        {url
          ? (
            <button className="CSS_IMAGE_UPLOAD_BUTTON" onClick={handleSubmit}>
              Insert Image
            </button>
          )
          : null}

        {file
          ? (
            <button className="CSS_IMAGE_UPLOAD_BUTTON" onClick={handleSubmit}>
              Upload Image
            </button>
          )
          : null}
      </PopoverContent>
    </PopoverRoot>
  )
}
