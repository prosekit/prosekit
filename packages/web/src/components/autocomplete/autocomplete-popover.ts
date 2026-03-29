import {
  computed,
  createSignal,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Signal,
  type Store,
} from '@aria-ui-v2/core'
import {
  createOverlayStore,
  OverlayPositionerPropsDeclaration,
  setupOverlayPositioner,
  type OverlayPositionerProps,
} from '@aria-ui-v2/elements/overlay'
import { useAttribute, usePresence } from '@aria-ui-v2/utils'
import { once } from '@ocavue/utils'
import { defineKeymap, withPriority, type Editor, type Priority } from '@prosekit/core'
import { AutocompleteRule, defineAutocomplete, type MatchHandler } from '@prosekit/extensions/autocomplete'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'
import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { AutocompleteStore, autocompleteStoreContext } from './context.ts'
import { defaultQueryBuilder } from './helpers.ts'

export interface AutocompletePopoverProps extends OverlayPositionerProps {
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
   * The placement of the popover, relative to the text cursor.
   *
   * @default "bottom-start"
   */
  placement: OverlayPositionerProps['placement']

  /**
   * The distance between the popover and the hovered block.
   *
   * @default 4
   */
  offset: OverlayPositionerProps['offset']

  /**
   * @default true
   */
  inline: OverlayPositionerProps['inline']

  /**
   * @default true
   */
  hoist: OverlayPositionerProps['hoist']

  /**
   * @default true
   */
  fitViewport: OverlayPositionerProps['fitViewport']

  /**
   * @default "The body element"
   */
  boundary: OverlayPositionerProps['boundary']

  /**
   * @default 8
   */
  overflowPadding: OverlayPositionerProps['overflowPadding']
}

const body = typeof document !== 'undefined' && document.querySelector('body')
const defaultBoundary = body || 'clippingAncestors'

/** @internal */
export const AutocompletePopoverPropsDeclaration: PropsDeclaration<AutocompletePopoverProps> = /* @__PURE__ */ defineProps<
  AutocompletePopoverProps
>({
  ...OverlayPositionerPropsDeclaration,
  editor: { default: null, attribute: false, type: 'json' },
  regex: { default: null, attribute: false, type: 'json' },
  placement: { default: 'bottom-start', attribute: 'placement', type: 'string' },
  offset: { default: 4, attribute: false, type: 'json' },
  inline: { default: true, attribute: 'inline', type: 'boolean' },
  hoist: { default: true, attribute: 'hoist', type: 'boolean' },
  fitViewport: { default: true, attribute: 'fit-viewport', type: 'boolean' },
  boundary: { default: defaultBoundary, attribute: false, type: 'json' },
  overflowPadding: { default: 8, attribute: 'overflow-padding', type: 'number' },
})

/**
 * @public
 */
export class AutocompletePopoverOpenChangeEvent extends Event {
  open: boolean
  constructor(open: boolean) {
    super('openChange', { bubbles: true })
    this.open = open
  }
}

/**
 * @public
 */
export class AutocompletePopoverQueryChangeEvent extends Event {
  query: string
  constructor(query: string) {
    super('queryChange', { bubbles: true })
    this.query = query
  }
}

/**
 * @public
 */
export interface AutocompletePopoverEvents {
  /**
   * Fired when the open state changes.
   */
  openChange: AutocompletePopoverOpenChangeEvent

  /**
   * Fired when the query changes.
   */
  queryChange: AutocompletePopoverQueryChangeEvent
}

/**
 * @internal
 */
export function setupAutocompletePopover(
  host: HostElement,
  props: Store<AutocompletePopoverProps>,
): void {
  const getEditor = props.editor.get

  const reference = createSignal<Element | undefined>(undefined)
  const onDismiss = createSignal<VoidFunction | null>(null)
  const onSubmit = createSignal<VoidFunction | null>(null)

  const store = new AutocompleteStore()
  const presence = computed(() => !!reference.get())

  store.onSubmit.set(null)
  autocompleteStoreContext.provide(host, store)

  // Sync presence → store.open
  useEffect(host, () => {
    store.open.set(presence())
  })

  // Sync onSubmit signal → store
  useEffect(host, () => {
    store.onSubmit.set(onSubmit.get())
  })

  useEscapeKeydown(host, getEditor, createKeymapHandler(() => onDismiss.get(), presence))

  useAutocompleteExtension(
    host,
    getEditor,
    props.regex.get,
    reference,
    store.query,
    onDismiss,
    onSubmit,
  )

  // Create overlay store for positioning
  const overlayStore = createOverlayStore(
    presence,
    () => {},
    () => true,
    () => false,
    (event) => host.dispatchEvent(event),
  )

  // Sync anchor element
  useEffect(host, () => {
    overlayStore.setAnchorElement(reference.get())
  })

  setupOverlayPositioner(host, props, () => overlayStore)

  useAttribute(host, 'data-state', () => (presence() ? 'open' : 'closed'))
  usePresence(host, presence)

  // Emit events
  let firstRendering = true
  requestAnimationFrame(() => {
    firstRendering = false
  })

  useEffect(host, () => {
    const queryValue = store.query.get()
    if (!firstRendering) {
      host.dispatchEvent(new AutocompletePopoverQueryChangeEvent(queryValue))
    }
  })

  useEffect(host, () => {
    const presenceValue = presence()
    requestAnimationFrame(() => {
      host.dispatchEvent(new AutocompletePopoverOpenChangeEvent(presenceValue))
    })
  })
}

function useAutocompleteExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  getRegex: () => RegExp | null,
  reference: Signal<Element | undefined>,
  query: Signal<string>,
  onDismiss: Signal<VoidFunction | null>,
  onSubmit: Signal<VoidFunction | null>,
) {
  useEffect(host, () => {
    const editor = getEditor()
    const regex = getRegex()

    if (!editor || !regex) {
      return
    }

    const rule = createAutocompleteRule(
      editor,
      regex,
      reference,
      query,
      onDismiss,
      onSubmit,
    )
    const extension = defineAutocomplete(rule)
    return editor.use(extension)
  })
}

function createAutocompleteRule(
  editor: Editor,
  regex: RegExp,
  reference: Signal<Element | undefined>,
  query: Signal<string>,
  onDismiss: Signal<VoidFunction | null>,
  onSubmit: Signal<VoidFunction | null>,
) {
  const handleEnter: MatchHandler = (options) => {
    const view = getSafeEditorView(editor)
    const span = view?.dom.querySelector('.prosekit-autocomplete-match')

    if (span) {
      reference.set(span)
    }

    query.set(defaultQueryBuilder(options.match))
    onDismiss.set(options.ignoreMatch)
    onSubmit.set(options.deleteMatch)
  }

  const handleLeave = () => {
    reference.set(undefined)
    query.set('')
  }

  return new AutocompleteRule({
    regex,
    onEnter: handleEnter,
    onLeave: handleLeave,
  })
}

function createKeymapHandler(
  getHandler: () => VoidFunction | null,
  getEnabled: () => boolean,
) {
  return (): boolean => {
    if (!getEnabled()) {
      return false
    }

    const fn = getHandler()
    if (!fn) return false
    fn()
    return true
  }
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

const AutocompletePopoverElementBase: HostElementConstructor<AutocompletePopoverProps> = defineCustomElement(
  setupAutocompletePopover,
  AutocompletePopoverPropsDeclaration,
)

/**
 * @public
 */
export class AutocompletePopoverElement extends AutocompletePopoverElementBase {}

/** @internal */
export const registerAutocompletePopoverElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-autocomplete-popover', AutocompletePopoverElement)
})
