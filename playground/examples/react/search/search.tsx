import { Themes } from '@prosekit/themes'
import { clsx } from 'prosekit/core'
import { defineSearchQuery } from 'prosekit/extensions/search'
import { useEditor, useExtension } from 'prosekit/react'
import { useMemo, useState } from 'react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Search({ onClose }: { onClose?: VoidFunction }) {
  const [showReplace, setShowReplace] = useState(false)
  const toggleReplace = () => setShowReplace((value) => !value)

  const [searchText, setSearchText] = useState('')
  const [replaceText, setReplaceText] = useState('')

  const extension = useMemo(() => {
    if (!searchText) {
      return null
    }
    return defineSearchQuery({ search: searchText, replace: replaceText })
  }, [searchText, replaceText])

  useExtension(extension)

  const editor = useEditor<EditorExtension>()

  const isEnter = (event: React.KeyboardEvent) => {
    return (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.metaKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.nativeEvent.isComposing
    )
  }

  const isShiftEnter = (event: React.KeyboardEvent) => {
    return (
      event.key === 'Enter' &&
      event.shiftKey &&
      !event.metaKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.nativeEvent.isComposing
    )
  }

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor.commands.findNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor.commands.findPrev()
    }
  }

  const handleReplaceKeyDown = (event: React.KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor.commands.replaceNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor.commands.replaceAll()
    }
  }

  return (
    <div className={Themes.SEARCH}>
      <Button tooltip="Toggle Replace" onClick={toggleReplace}>
        <span
          className={clsx(
            Themes.ICON_CHEVRON_RIGHT,
            showReplace
              ? 'rotate-90 transition-transform'
              : 'transition-transform',
          )}
        />
      </Button>
      <input
        placeholder="Search"
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onKeyDown={handleSearchKeyDown}
        className={Themes.SEARCH_INPUT}
      />
      <div className={Themes.SEARCH_CONTROLLER}>
        <Button
          tooltip="Previous (Shift Enter)"
          onClick={editor.commands.findPrev}
        >
          <span className={Themes.ICON_ARROW_LEFT} />
        </Button>
        <Button tooltip="Next (Enter)" onClick={editor.commands.findNext}>
          <span className={Themes.ICON_ARROW_RIGHT} />
        </Button>
        <Button tooltip="Close" onClick={onClose}>
          <span className={Themes.ICON_CLOSE} />
        </Button>
      </div>
      {showReplace && (
        <input
          placeholder="Replace"
          type="text"
          value={replaceText}
          onChange={(event) => setReplaceText(event.target.value)}
          onKeyDown={handleReplaceKeyDown}
          className={Themes.SEARCH_INPUT}
        />
      )}
      {showReplace && (
        <div className={Themes.SEARCH_CONTROLLER}>
          <Button
            tooltip="Replace (Enter)"
            onClick={editor.commands.replaceNext}
          >
            Replace
          </Button>
          <Button
            tooltip="Replace All (Shift Enter)"
            onClick={editor.commands.replaceAll}
          >
            All
          </Button>
        </div>
      )}
    </div>
  )
}
