import type { Node, Slice } from '@prosekit/pm/model'
import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { Facet } from '../../facets/facet'
import type { ObjectEntries } from '../../types/object-entries'
import { combineEventHandlers } from '../../utils/combine-event-handlers'
import { groupEntries, type GroupedEntries } from '../../utils/group-entries'
import { pluginFacet, type PluginPayload } from '../plugin'

export type KeyDownHandler = (
  view: EditorView,
  event: KeyboardEvent,
) => boolean | void
export type KeyPressHandler = (
  view: EditorView,
  event: KeyboardEvent,
) => boolean | void
export type TextInputHandler = (
  view: EditorView,
  from: number,
  to: number,
  text: string,
) => boolean | void
export type ClickOnHandler = (
  view: EditorView,
  pos: number,
  node: Node,
  nodePos: number,
  event: MouseEvent,
  direct: boolean,
) => boolean | void
export type ClickHandler = (
  view: EditorView,
  pos: number,
  event: MouseEvent,
) => boolean | void
export type DoubleClickOnHandler = (
  view: EditorView,
  pos: number,
  node: Node,
  nodePos: number,
  event: MouseEvent,
  direct: boolean,
) => boolean | void
export type DoubleClickHandler = (
  view: EditorView,
  pos: number,
  event: MouseEvent,
) => boolean | void
export type TripleClickOnHandler = (
  view: EditorView,
  pos: number,
  node: Node,
  nodePos: number,
  event: MouseEvent,
  direct: boolean,
) => boolean | void
export type TripleClickHandler = (
  view: EditorView,
  pos: number,
  event: MouseEvent,
) => boolean | void
export type PasteHandler = (
  view: EditorView,
  event: ClipboardEvent,
  slice: Slice,
) => boolean | void
export type DropHandler = (
  view: EditorView,
  event: DragEvent,
  slice: Slice,
  moved: boolean,
) => boolean | void
export type ScrollToSelectionHandler = (view: EditorView) => boolean

/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown}
 */
export function defineKeyDownHandler(handler: KeyDownHandler) {
  return editorEventFacet.extension([['keyDown', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress}
 */
export function defineKeyPressHandler(handler: KeyPressHandler) {
  return editorEventFacet.extension([['keyPress', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput}
 */
export function defineTextInputHandler(handler: TextInputHandler) {
  return editorEventFacet.extension([['textInput', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn}
 */
export function defineClickOnHandler(handler: ClickOnHandler) {
  return editorEventFacet.extension([['clickOn', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleClick}
 */
export function defineClickHandler(handler: ClickHandler) {
  return editorEventFacet.extension([['click', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn}
 */
export function defineDoubleClickOnHandler(handler: DoubleClickOnHandler) {
  return editorEventFacet.extension([['doubleClickOn', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick}
 */
export function defineDoubleClickHandler(handler: DoubleClickHandler) {
  return editorEventFacet.extension([['doubleClick', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn}
 */
export function defineTripleClickOnHandler(handler: TripleClickOnHandler) {
  return editorEventFacet.extension([['tripleClickOn', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick}
 */
export function defineTripleClickHandler(handler: TripleClickHandler) {
  return editorEventFacet.extension([['tripleClick', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste}
 */
export function definePasteHandler(handler: PasteHandler) {
  return editorEventFacet.extension([['paste', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop}
 */
export function defineDropHandler(handler: DropHandler) {
  return editorEventFacet.extension([['drop', handler]])
}
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection}
 */
export function defineScrollToSelectionHandler(
  handler: ScrollToSelectionHandler,
) {
  return editorEventFacet.extension([['scrollToSelection', handler]])
}

interface EditorEventMap {
  keyDown: KeyDownHandler
  keyPress: KeyPressHandler
  textInput: TextInputHandler
  clickOn: ClickOnHandler
  click: ClickHandler
  doubleClickOn: DoubleClickOnHandler
  doubleClick: DoubleClickHandler
  tripleClickOn: TripleClickOnHandler
  tripleClick: TripleClickHandler
  paste: PasteHandler
  drop: DropHandler
  scrollToSelection: ScrollToSelectionHandler
}

type EditorEventEntries = ObjectEntries<EditorEventMap>

/**
 * @internal
 */
const editorEventFacet = Facet.define<EditorEventEntries, PluginPayload>({
  converter: () => {
    const [update, plugin] = setupEditorEventPlugin()

    return {
      create: (entries) => {
        update(entries)
        return () => plugin
      },
      update: (entries) => {
        update(entries)
        return null
      },
    }
  },
  next: pluginFacet,
  singleton: true,
})

// prettier-ignore
function setupEditorEventPlugin() {
  const [setKeyDownHandlers, handleKeyDown] = combineEventHandlers<KeyDownHandler>()
  const [setKeyPressHandlers, handleKeyPress] = combineEventHandlers<KeyPressHandler>()
  const [setTextInputHandlers, handleTextInput] = combineEventHandlers<TextInputHandler>()
  const [setClickOnHandlers, handleClickOn] = combineEventHandlers<ClickOnHandler>()
  const [setClickHandlers, handleClick] = combineEventHandlers<ClickHandler>()
  const [setDoubleClickOnHandlers, handleDoubleClickOn] = combineEventHandlers<DoubleClickOnHandler>()
  const [setDoubleClickHandlers, handleDoubleClick] = combineEventHandlers<DoubleClickHandler>()
  const [setTripleClickOnHandlers, handleTripleClickOn] = combineEventHandlers<TripleClickOnHandler>()
  const [setTripleClickHandlers, handleTripleClick] = combineEventHandlers<TripleClickHandler>()
  const [setPasteHandlers, handlePaste] = combineEventHandlers<PasteHandler>()
  const [setDropHandlers, handleDrop] = combineEventHandlers<DropHandler>()
  const [setScrollToSelectionHandlers, handleScrollToSelection] = combineEventHandlers<ScrollToSelectionHandler>()

  const update = (entries: EditorEventEntries[]) => {
    const map: GroupedEntries<EditorEventMap> = groupEntries(entries)

    setKeyDownHandlers(map.keyDown ?? [])
    setKeyPressHandlers(map.keyPress ?? [])
    setTextInputHandlers(map.textInput ?? [])
    setClickOnHandlers(map.clickOn ?? [])
    setClickHandlers(map.click ?? [])
    setDoubleClickOnHandlers(map.doubleClickOn ?? [])
    setDoubleClickHandlers(map.doubleClick ?? [])
    setTripleClickOnHandlers(map.tripleClickOn ?? [])
    setTripleClickHandlers(map.tripleClick ?? [])
    setPasteHandlers(map.paste ?? [])
    setDropHandlers(map.drop ?? [])
    setScrollToSelectionHandlers(map.scrollToSelection ?? [])      
  }

  const plugin = new ProseMirrorPlugin({
    key: new PluginKey('prosekit-editor-handler'),
    props: {
      handleKeyDown,
      handleKeyPress,
      handleTextInput,
      handleClickOn,
      handleClick,
      handleDoubleClickOn,
      handleDoubleClick,
      handleTripleClickOn,
      handleTripleClick,
      handlePaste,
      handleDrop,
      handleScrollToSelection,
    },
  })

  return [update, plugin] as const 
}
