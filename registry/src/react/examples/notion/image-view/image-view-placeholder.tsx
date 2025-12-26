import { useEditor } from 'prosekit/react'

import { sampleUploader } from '../../../sample/sample-uploader'
import type { EditorExtension } from '../extension'

interface Props {
  getPos: () => number | undefined
  selected: boolean
}

export default function ImageViewPlaceholder(props: Props) {
  const editor = useEditor<EditorExtension>()

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const pos = props.getPos()
    if (typeof pos !== 'number') return

    editor.commands.uploadImage({ file, uploader: sampleUploader, pos, replace: true })

    // Reset input so the same file can be selected again
    event.target.value = ''
  }

  return (
    <label
      className="flex w-full cursor-pointer items-center rounded-lg gap-3 px-4 py-3 transition-colors data-selected:outline-blue-500 outline-1 outline-transparent bg-gray-500/10 text-current/40 hover:bg-gray-500/20 hover:text-current/60"
      aria-label="Add an image"
      data-selected={props.selected ? '' : undefined}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <span className="block i-lucide-image size-4" />
      <span className="text-sm font-medium">Add an image</span>
    </label>
  )
}
