import type { ComponentChild } from 'preact'
import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { UploadTask } from 'prosekit/extensions/file'
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
  const [webUrl, setWebUrl] = useState('')
  const [objectUrl, setObjectUrl] = useState('')
  const url = webUrl || objectUrl

  const editor = useEditor<EditorExtension>()

  const handleFileChange = (
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
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
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const url = event.currentTarget.value

    if (url) {
      setWebUrl(url)
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
    editor.commands.insertImage({ src: url })
    deferResetState()
    setOpen(false)
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
        {objectUrl ? null : (
          <>
            <label>Embed Link</label>
            <input
              className="CSS_IMAGE_UPLOAD_INPUT"
              placeholder="Paste the image link..."
              type="url"
              value={webUrl}
              onChange={handleWebUrlChange}
            />
          </>
        )}

        {webUrl ? null : (
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
      </PopoverContent>
    </PopoverRoot>
  )
}
