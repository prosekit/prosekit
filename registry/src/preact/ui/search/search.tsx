import {
  useMemo,
  useState,
} from 'preact/hooks'
import {
  defineSearchQuery,
  type SearchCommandsExtension,
} from 'prosekit/extensions/search'
import {
  useEditor,
  useExtension,
} from 'prosekit/preact'

import { Button } from '../button'

export default function Search(props: { onClose?: VoidFunction }) {
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

  const editor = useEditor<SearchCommandsExtension>()

  const isEnter = (event: KeyboardEvent) => {
    return (
      event.key === 'Enter'
      && !event.shiftKey
      && !event.metaKey
      && !event.altKey
      && !event.ctrlKey
      && !event.isComposing
    )
  }

  const isShiftEnter = (event: KeyboardEvent) => {
    return (
      event.key === 'Enter'
      && event.shiftKey
      && !event.metaKey
      && !event.altKey
      && !event.ctrlKey
      && !event.isComposing
    )
  }

  const handleSearchKeyDown = (event: KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor.commands.findNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor.commands.findPrev()
    }
  }

  const handleReplaceKeyDown = (event: KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor.commands.replaceNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor.commands.replaceAll()
    }
  }

  return (
    <div className="CSS_SEARCH">
      <Button tooltip="Toggle Replace" onClick={toggleReplace}>
        <span
          data-rotate={showReplace ? '' : undefined}
          className="CSS_ICON_CHEVRON_RIGHT CSS_TOGGLE_ROTATE"
        />
      </Button>
      <input
        placeholder="Search"
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
        onKeyDown={handleSearchKeyDown}
        className="CSS_SEARCH_INPUT"
      />
      <div className="CSS_SEARCH_CONTROLLER">
        <Button
          tooltip="Previous (Shift Enter)"
          onClick={editor.commands.findPrev}
        >
          <span className="CSS_ICON_ARROW_LEFT" />
        </Button>
        <Button tooltip="Next (Enter)" onClick={editor.commands.findNext}>
          <span className="CSS_ICON_ARROW_RIGHT" />
        </Button>
        <Button tooltip="Close" onClick={props.onClose}>
          <span className="CSS_ICON_CLOSE" />
        </Button>
      </div>
      {showReplace && (
        <input
          placeholder="Replace"
          type="text"
          value={replaceText}
          onChange={(event) => setReplaceText(event.currentTarget.value)}
          onKeyDown={handleReplaceKeyDown}
          className="CSS_SEARCH_INPUT"
        />
      )}
      {showReplace && (
        <div className="CSS_SEARCH_CONTROLLER">
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
