import {
  createSignal,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Signal,
  type State,
} from '@aria-ui/core'
import { defaultItemFilter, type ItemFilter, type ListboxRootEvents } from '@aria-ui/elements/listbox'
import { createOverlayStore, OpenChangeEvent, type OverlayStore } from '@aria-ui/elements/overlay'
import { useEventListener } from '@aria-ui/utils'
import type { ReferenceElement } from '@floating-ui/dom'
import { defineDOMEventHandler, defineKeymap, union, withPriority, type Editor, type Extension, type Priority } from '@prosekit/core'
import { AutocompleteRule, defineAutocomplete, type MatchHandler } from '@prosekit/extensions/autocomplete'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'
import { KeyboardEventTarget } from '../../utils/event.ts'
import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'
import { resolveAnchor, type AnchorReference } from '../../utils/resolve-anchor.ts'

import { autocompleteStoreContext, type AutocompleteStore } from './context.ts'
import { createCompositionEndTracker, defaultQueryBuilder, shouldIgnoreKeydownNearComposition, type QueryBuilder } from './helpers.ts'

export { OpenChangeEvent }

export interface AutocompleteRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The regular expression to match the query text to autocomplete.
   *
   * @default null
   */
  regex: RegExp | null

  /**
   * The filter function to determine if an item should be shown in the
   * listbox.
   *
   * @default defaultItemFilter
   */
  filter: ItemFilter | null

  /**
   * Builds the query string from the regex match found before the cursor. The
   * query is exposed via the `queryChange` event and used by the built-in item
   * filter. The default builder lowercases the match and strips punctuation.
   * Provide a custom builder to control the query, for example to preserve the
   * casing and punctuation the user typed.
   *
   * @default defaultQueryBuilder
   */
  queryBuilder: QueryBuilder

  /**
   * The reference to position the popup against. This can be a DOM element, a
   * Floating UI virtual element, or a function that returns either of them.
   * By default, the popup will be positioned against the text content that
   * triggers the autocomplete.
   *
   * @default null
   */
  anchor: AnchorReference

  /**
   * Whether the autocomplete match should follow the text cursor when it
   * moves without editing, growing and shrinking the query as the cursor
   * moves over existing text (for example with arrow keys).
   *
   * @default false
   */
  followCursor: boolean
}

/** @internal */
export const AutocompleteRootPropsDeclaration: PropsDeclaration<AutocompleteRootProps> = /* @__PURE__ */ defineProps<
  AutocompleteRootProps
>({
  editor: { default: null, attribute: false },
  regex: { default: null, attribute: false },
  filter: { default: defaultItemFilter, attribute: false },
  queryBuilder: { default: defaultQueryBuilder, attribute: false },
  anchor: { default: null, attribute: false },
  followCursor: { default: false, attribute: 'follow-cursor', type: 'boolean' },
})

export class QueryChangeEvent extends Event {
  /**
   * The current query string.
   */
  readonly detail: string

  constructor(query: string) {
    super('queryChange', { bubbles: true })
    this.detail = query
  }
}

export interface AutocompleteRootEvents extends ListboxRootEvents {
  /**
   * Fired when the open state changes.
   */
  openChange: OpenChangeEvent

  /**
   * Fired when the query changes.
   */
  queryChange: QueryChangeEvent
}

interface RuleHandlers {
  submit?: VoidFunction
  dismiss?: VoidFunction
}

/**
 * @internal
 */
export function setupAutocompleteRoot(
  host: HostElement,
  props: State<AutocompleteRootProps>,
): void {
  const getEditor = props.editor.get

  const reference = createSignal<ReferenceElement | undefined>(undefined)
  const open = createSignal(false)
  const query = createSignal('')
  const keyboardTarget = new KeyboardEventTarget()
  const eventTarget = createSignal<EventTarget | null>(keyboardTarget)
  const handlers: RuleHandlers = {}

  // Create overlay store for positioning. The open state is managed by the
  // overlay store via requestOpenChange(), which dispatches OpenChangeEvent and
  // updates the open signal.
  const overlayStore: OverlayStore = createOverlayStore(
    open.get,
    open.set,
    () => false,
    () => false,
    (event) => host.dispatchEvent(event),
  )

  useEffect(host, () => {
    overlayStore.setAnchorElement(reference.get())
  })

  const autocompleteStore: AutocompleteStore = {
    overlayStore,
    query,
    eventTarget,
    filter: props.filter,
  }

  autocompleteStoreContext.provide(host, autocompleteStore)

  useEventListener(host, 'valueChange', () => {
    handlers.submit?.()
  })

  useKeyboardBridge(host, getEditor, open.get, keyboardTarget)

  useEscapeKeydown(host, getEditor, () => {
    if (!open.get() || !handlers.dismiss) return false
    handlers.dismiss()
    return true
  })

  const setQuery = (next: string): void => {
    if (query.get() === next) return
    query.set(next)
    host.dispatchEvent(new QueryChangeEvent(next))
  }

  const getAnchor = (): ReferenceElement | null => {
    const customAnchor = resolveAnchor(props.anchor.get())
    if (customAnchor) {
      return customAnchor
    }
    const view = getSafeEditorView(getEditor())
    return view?.dom.querySelector('.prosekit-autocomplete-match') || null
  }

  useAutocompleteExtension(
    host,
    getEditor,
    props.regex.get,
    getAnchor,
    reference,
    handlers,
    setQuery,
    props.queryBuilder.get,
    props.followCursor.get,
    (open) => overlayStore.requestOpenChange(open),
  )
}

const EVENT_KEYS = [
  'ArrowDown',
  'ArrowRight',
  'ArrowUp',
  'ArrowLeft',
  'Home',
  'End',
  'Enter',
] as const

function useKeyboardBridge(
  host: HostElement,
  getEditor: () => Editor | null,
  getOpen: () => boolean,
  target: EventTarget,
): void {
  const tracker = createCompositionEndTracker()
  const compositionEndExtension: Extension = defineDOMEventHandler('compositionend', (_view, event): boolean => {
    tracker.endedAt = event.timeStamp
    return false
  })
  const keydownExtension: Extension = defineDOMEventHandler('keydown', (view, event): boolean => {
    if (shouldIgnoreKeydownNearComposition(event, view.composing, tracker)) {
      return false
    }
    if (
      event.defaultPrevented
      || !getOpen()
      || !EVENT_KEYS.includes(event.key as (typeof EVENT_KEYS)[number])
    ) {
      return false
    }
    target.dispatchEvent(event)
    return event.defaultPrevented
  })
  const extension = union(keydownExtension, compositionEndExtension)
  useEditorExtension(host, getEditor, withPriority(extension, 4 satisfies typeof Priority.highest))
}

function useAutocompleteExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  getRegex: () => RegExp | null,
  getAnchor: () => ReferenceElement | null,
  reference: Signal<ReferenceElement | undefined>,
  handlers: RuleHandlers,
  setQuery: (next: string) => void,
  getQueryBuilder: () => QueryBuilder,
  getFollowCursor: () => boolean,
  requestOpenChange: (open: boolean) => void,
) {
  useEffect(host, () => {
    const editor = getEditor()
    const regex = getRegex()
    const followCursor = getFollowCursor()

    if (!editor || !regex) {
      return
    }

    const rule = createAutocompleteRule(
      regex,
      getAnchor,
      reference,
      handlers,
      setQuery,
      getQueryBuilder,
      followCursor,
      requestOpenChange,
    )
    const extension = defineAutocomplete(rule)
    return editor.use(extension)
  })
}

function createAutocompleteRule(
  regex: RegExp,
  getAnchor: () => ReferenceElement | null,
  reference: Signal<ReferenceElement | undefined>,
  handlers: RuleHandlers,
  setQuery: (next: string) => void,
  getQueryBuilder: () => QueryBuilder,
  followCursor: boolean,
  requestOpenChange: (open: boolean) => void,
) {
  const handleEnter: MatchHandler = (options) => {
    const anchor = getAnchor()
    reference.set(anchor || undefined)

    handlers.submit = options.deleteMatch
    handlers.dismiss = options.ignoreMatch
    setQuery(getQueryBuilder()(options.match))
    requestOpenChange(true)
  }

  const handleLeave = () => {
    reference.set(undefined)
    setQuery('')
    handlers.submit = undefined
    handlers.dismiss = undefined
    requestOpenChange(false)
  }

  return new AutocompleteRule({
    regex,
    onEnter: handleEnter,
    onLeave: handleLeave,
    followCursor,
  })
}

function useEscapeKeydown(
  host: HostElement,
  getEditor: () => Editor | null,
  handler: () => boolean,
): void {
  const keymap = { Escape: handler }
  const extension = withPriority(defineKeymap(keymap), 4 satisfies typeof Priority.highest)
  useEditorExtension(host, getEditor, extension)
}

const AutocompleteRootElementBase: HostElementConstructor<AutocompleteRootProps> = defineCustomElement(
  setupAutocompleteRoot,
  AutocompleteRootPropsDeclaration,
)

/**
 * `<prosekit-autocomplete-root>` custom element.
 *
 * Properties: {@link AutocompleteRootProps}
 *
 * Events: {@link AutocompleteRootEvents}
 */
export class AutocompleteRootElement extends AutocompleteRootElementBase {}

/** @internal */
export function registerAutocompleteRootElement(): void {
  registerCustomElement('prosekit-autocomplete-root', AutocompleteRootElement)
}
