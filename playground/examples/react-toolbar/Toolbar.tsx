import { Popover } from 'prosekit/react/popover'
import { useState, type FC, type ReactNode } from 'react'

import { ToggleButton } from './ToggleButton'
import { useExampleEditor } from './use-example-editor'

export default function Toolbar() {
  const editor = useExampleEditor({ update: true })

  const [imagePopoverOpen, setImagePopoverOpen] = useState(false)

  return (
    <div className="TOOLBAR">
      <ToggleButton
        available={editor.commands.undo.canApply()}
        onChange={editor.commands.undo}
      >
        <div className="ICON_UNDO" />
      </ToggleButton>

      <ToggleButton
        available={editor.commands.redo.canApply()}
        onChange={editor.commands.redo}
      >
        <div className="ICON_REDO" />
      </ToggleButton>

      <ToggleButton
        active={editor.marks.italic.isActive()}
        available={editor.commands.toggleItalic.canApply()}
        onChange={editor.commands.toggleItalic}
      >
        <div className="ICON_ITALIC" />
      </ToggleButton>

      <ToggleButton
        active={editor.marks.bold.isActive()}
        available={editor.commands.toggleBold.canApply()}
        onChange={editor.commands.toggleBold}
      >
        <div className="ICON_BOLD" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 1 })}
        available={editor.commands.toggleHeading.canApply({ level: 1 })}
        onChange={() => editor.commands.toggleHeading({ level: 1 })}
      >
        <div className="ICON_H1" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 2 })}
        available={editor.commands.toggleHeading.canApply({ level: 2 })}
        onChange={() => editor.commands.toggleHeading({ level: 2 })}
      >
        <div className="ICON_H2" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.heading.isActive({ level: 3 })}
        available={editor.commands.toggleHeading.canApply({ level: 3 })}
        onChange={() => editor.commands.toggleHeading({ level: 3 })}
      >
        <div className="ICON_H3" />
      </ToggleButton>

      <ImagePopover
        open={imagePopoverOpen}
        onClose={() => setImagePopoverOpen(false)}
      >
        <ToggleButton
          active={false}
          available={editor.commands.insertImage.canApply()}
          onChange={() => {
            setImagePopoverOpen((open) => !open)
          }}
        >
          <div className="ICON_IMAGE" />
        </ToggleButton>
      </ImagePopover>
    </div>
  )
}

const ImagePopover: FC<{
  open: boolean
  onClose: VoidFunction
  children: ReactNode
}> = ({ open, onClose, children }) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const [webUrl, setWebUrl] = useState('')
  const [objectUrl, setObjectUrl] = useState('')
  const url = webUrl || objectUrl

  const editor = useExampleEditor()

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

  const handleClose = () => {
    setWebUrl('')
    setObjectUrl('')
    onClose()
  }

  const handleSubmit = () => {
    editor.commands.insertImage({ src: url })
    setTimeout(handleClose, 100)
  }

  return (
    <>
      <div ref={setAnchorElement}>{children}</div>

      <Popover reference={anchorElement ?? undefined} active={open}>
        <div className="IMAGE_UPLOAD_CARD">
          <div>Select a local image file or enter a web image URL.</div>

          {objectUrl ? null : (
            <div>
              <label>Web Image URL</label>
              <input
                className="IMAGE_UPLOAD_INPUT"
                placeholder="https://placehold.co/128"
                type="url"
                onChange={handleWebUrlChange}
              />
            </div>
          )}

          {webUrl ? null : (
            <div>
              <label>Local Image</label>
              <input
                className="IMAGE_UPLOAD_INPUT"
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          )}

          <button
            className="IMAGE_UPLOAD_BUTTON"
            disabled={!url}
            onClick={handleSubmit}
          >
            Upload Image
          </button>
        </div>
      </Popover>
    </>
  )
}
