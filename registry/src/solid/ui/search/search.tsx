import {
  defineSearchQuery,
  type SearchCommandsExtension,
} from 'prosekit/extensions/search'
import {
  useEditor,
  useExtension,
} from 'prosekit/solid'
import {
  createMemo,
  createSignal,
  type JSX,
} from 'solid-js'

import { Button } from '../button'

export default function Search(props: { onClose?: VoidFunction }): JSX.Element {
  const [showReplace, setShowReplace] = createSignal(false)
  const toggleReplace = () => setShowReplace((value) => !value)

  const [searchText, setSearchText] = createSignal('')
  const [replaceText, setReplaceText] = createSignal('')

  const extension = createMemo(() => {
    if (!searchText()) {
      return null
    }
    return defineSearchQuery({ search: searchText(), replace: replaceText() })
  })

  useExtension(extension)

  const editor = useEditor<SearchCommandsExtension>({ update: true })

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
      editor().commands.findNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor().commands.findPrev()
    }
  }

  const handleReplaceKeyDown = (event: KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor().commands.replaceNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor().commands.replaceAll()
    }
  }

  return (
    <div class="CSS_SEARCH">
      <Button tooltip="Toggle Replace" onClick={toggleReplace}>
        <span
          attr:data-rotate={showReplace() ? '' : undefined}
          class="CSS_ICON_CHEVRON_RIGHT CSS_TOGGLE_ROTATE"
        />
      </Button>
      <input
        placeholder="Search"
        type="text"
        value={searchText()}
        onInput={(event) => setSearchText(event.currentTarget.value)}
        onKeyDown={handleSearchKeyDown}
        class="CSS_SEARCH_INPUT"
      />
      <div class="CSS_SEARCH_CONTROLLER">
        <Button
          tooltip="Previous (Shift Enter)"
          onClick={() => editor().commands.findPrev()}
        >
          <span class="CSS_ICON_ARROW_LEFT" />
        </Button>
        <Button tooltip="Next (Enter)" onClick={() => editor().commands.findNext()}>
          <span class="CSS_ICON_ARROW_RIGHT" />
        </Button>
        <Button tooltip="Close" onClick={() => props.onClose?.()}>
          <span class="CSS_ICON_CLOSE" />
        </Button>
      </div>
      {showReplace() && (
        <input
          placeholder="Replace"
          type="text"
          value={replaceText()}
          onInput={(event) => setReplaceText(event.currentTarget.value)}
          onKeyDown={handleReplaceKeyDown}
          class="CSS_SEARCH_INPUT"
        />
      )}
      {showReplace() && (
        <div class="CSS_SEARCH_CONTROLLER">
          <Button tooltip="Replace (Enter)" onClick={() => editor().commands.replaceNext()}>
            Replace
          </Button>
          <Button
            tooltip="Replace All (Shift Enter)"
            onClick={() => editor().commands.replaceAll()}
          >
            All
          </Button>
        </div>
      )}
    </div>
  )
}
