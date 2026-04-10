import {
  createSignal,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  useEventListener,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Signal,
  type State,
} from '@aria-ui/core'
import { defaultItemFilter, type ItemFilter, type ListboxRootEvents } from '@aria-ui/elements/listbox'
import { createOverlayStore, OpenChangeEvent, type OverlayStore } from '@aria-ui/elements/overlay'
import { defineDOMEventHandler, defineKeymap, withPriority, type Editor, type Extension, type Priority } from '@prosekit/core'
import { AutocompleteRule, defineAutocomplete, type MatchHandler } from '@prosekit/extensions/autocomplete'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'
import { KeyboardEventTarget } from '../../utils/event.ts'
import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { autocompleteStoreContext, type AutocompleteStore } from './context.ts'
import { defaultQueryBuilder } from './helpers.ts'

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
}

/** @internal */
export const AutocompleteRootPropsDeclaration: PropsDeclaration<AutocompleteRootProps> = /* @__PURE__ */ defineProps<
  AutocompleteRootProps
>({
  editor: { default: null, attribute: false, type: 'json' },
  regex: { default: null, attribute: false, type: 'json' },
  filter: { default: defaultItemFilter, attribute: false, type: 'json' },
})

/**
 * @public
 */
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

/**
 * @public
 */
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

interface AutocompleteRuleDeps {
  reference: Signal<Element | undefined>
  handlers: RuleHandlers
  setQuery: (next: string) => void
  requestOpenChange: (open: boolean) => void
}

/**
 * @internal
 */
export function setupAutocompleteRoot(
  host: HostElement,
  props: State<AutocompleteRootProps>,
): void {
  const getEditor = props.editor.get

  const reference = createSignal<Element | undefined>(undefined)
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

  useAutocompleteExtension(host, getEditor, props.regex.get, {
    reference,
    handlers,
    setQuery,
    requestOpenChange: (open) => overlayStore.requestOpenChange(open),
  })
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
  const extension: Extension = defineDOMEventHandler('keydown', (view, event): boolean => {
    if (
      view.composing
      || event.defaultPrevented
      || !getOpen()
      || !EVENT_KEYS.includes(event.key as (typeof EVENT_KEYS)[number])
    ) {
      return false
    }
    target.dispatchEvent(event)
    return event.defaultPrevented
  })
  useEditorExtension(host, getEditor, withPriority(extension, 4 satisfies typeof Priority.highest))
}

function useAutocompleteExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  getRegex: () => RegExp | null,
  deps: AutocompleteRuleDeps,
) {
  useEffect(host, () => {
    const editor = getEditor()
    const regex = getRegex()

    if (!editor || !regex) {
      return
    }

    const rule = createAutocompleteRule(editor, regex, deps)
    const extension = defineAutocomplete(rule)
    return editor.use(extension)
  })
}

function createAutocompleteRule(
  editor: Editor,
  regex: RegExp,
  deps: AutocompleteRuleDeps,
) {
  const { reference, handlers, setQuery, requestOpenChange } = deps

  const handleEnter: MatchHandler = (options) => {
    const view = getSafeEditorView(editor)
    const span = view?.dom.querySelector('.prosekit-autocomplete-match')

    if (span) {
      reference.set(span)
    }

    handlers.submit = options.deleteMatch
    handlers.dismiss = options.ignoreMatch
    setQuery(defaultQueryBuilder(options.match))
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
 * @public
 */
export class AutocompleteRootElement extends AutocompleteRootElementBase {}

/** @internal */
export function registerAutocompleteRootElement(): void {
  registerCustomElement('prosekit-autocomplete-root', AutocompleteRootElement)
}
