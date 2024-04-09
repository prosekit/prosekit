import { useEditor } from 'prosekit/react'
import { PopoverContent } from 'prosekit/react/popover-content'
import { PopoverRoot } from 'prosekit/react/popover-root'
import { PopoverTrigger } from 'prosekit/react/popover-trigger'
import { useState, type FC, type ReactNode } from 'react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export const ImageUploadPopover: FC<{
  tooltip: string
  disabled: boolean
  children: ReactNode
}> = ({ tooltip, disabled, children }) => {
  const [open, setOpen] = useState(false)
  const [webUrl, setWebUrl] = useState('')
  const [objectUrl, setObjectUrl] = useState('')
  const url = webUrl || objectUrl

  const editor = useEditor<EditorExtension>()

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      setObjectUrl(URL.createObjectURL(file))
      setWebUrl('')
    } else {
      setObjectUrl('')
    }
  }

  const handleWebUrlChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const url = event.target.value

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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      deferResetState()
    }
    setOpen(open)
  }

  return (
    <PopoverRoot open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Toggle pressed={open} disabled={disabled} tooltip={tooltip}>
          {children}
        </Toggle>
      </PopoverTrigger>

      <PopoverContent className="IMAGE_UPLOAD_CARD">
        {objectUrl ? null : (
          <>
            <label>Embed Link</label>
            <input
              className="IMAGE_UPLOAD_INPUT"
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
              className="IMAGE_UPLOAD_INPUT"
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </>
        )}

        {url ? (
          <button className="IMAGE_UPLOAD_BUTTON" onClick={handleSubmit}>
            Insert Image
          </button>
        ) : null}
      </PopoverContent>
    </PopoverRoot>
  )
}
