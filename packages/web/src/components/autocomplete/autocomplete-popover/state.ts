import {
  assignProps,
  createComputed,
  createSignal,
  mapSignals,
  useAnimationFrame,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type Signal,
  type SignalState,
} from '@aria-ui/core'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { usePresence } from '@aria-ui/presence'
import {
  Priority,
  defineKeymap,
  withPriority,
  type Editor,
} from '@prosekit/core'
import {
  AutocompleteRule,
  defineAutocomplete,
  type MatchHandler,
} from '@prosekit/extensions/autocomplete'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import { useFirstRendering } from '../../../hooks/use-first-rendering'
import { onSubmitContext, openContext, queryContext } from '../context'

import { defaultQueryBuilder } from './helpers'
import {
  defaultAutocompletePopoverProps,
  type AutocompletePopoverProps,
} from './props'

export function useAutocompletePopover(
  host: ConnectableElement,
  props?: Partial<AutocompletePopoverProps>,
) {
  const state = mapSignals(assignProps(defaultAutocompletePopoverProps, props))
  useAutocompletePopoverState(host, state)
  return state
}

function useAutocompletePopoverState(
  host: ConnectableElement,
  state: SignalState<AutocompletePopoverProps>,
) {
  const { editor, regex, ...overlayState } = state

  const reference = createSignal<Element | null>(null)
  const query = createSignal<string>('')
  const onDismiss = createSignal<VoidFunction | null>(null)
  const onSubmit = createSignal<VoidFunction | null>(null)
  const presence = createComputed(() => !!reference.value)

  queryContext.provide(host, query)
  onSubmitContext.provide(host, onSubmit)
  openContext.provide(host, presence)

  useEscapeKeydown(host, editor, createKeymapHandler(onDismiss, presence))

  useAutocompleteExtension(
    host,
    editor,
    regex,
    reference,
    query,
    onDismiss,
    onSubmit,
  )

  useOverlayPositionerState(host, overlayState, { reference })

  usePresence(host, presence)

  const firstRendering = useFirstRendering(host)

  useEffect(host, () => {
    const queryValue = query.value

    if (!firstRendering.peek()) {
      state.onQueryChange.peek()?.(queryValue)
    }
  })

  useAnimationFrame(host, () => {
    const presenceValue = presence.value
    const onOpenChangeValue = state.onOpenChange.peek()

    if (!onOpenChangeValue) {
      return
    }
    return () => {
      onOpenChangeValue(presenceValue)
    }
  })
}

function useAutocompleteExtension(
  host: ConnectableElement,

  editor: ReadonlySignal<Editor | null>,
  regex: ReadonlySignal<RegExp | null>,

  reference: Signal<Element | null>,
  query: Signal<string>,
  onDismiss: Signal<VoidFunction | null>,
  onSubmit: Signal<VoidFunction | null>,
) {
  useEffect(host, () => {
    const editorValue = editor.value
    const regexValue = regex.value

    if (!editorValue || !regexValue) {
      return
    }

    return addAutocompleteExtension(
      editorValue,
      regexValue,

      reference,
      query,
      onDismiss,
      onSubmit,
    )
  })
}

function addAutocompleteExtension(
  editor: Editor,
  regex: RegExp,

  reference: Signal<Element | null>,
  query: Signal<string>,
  onDismiss: Signal<VoidFunction | null>,
  onSubmit: Signal<VoidFunction | null>,
): VoidFunction {
  const handleEnter: MatchHandler = (options) => {
    const span = editor.view.dom.querySelector('.prosemirror-prediction-match')

    if (span) {
      reference.value = span
    }

    query.value = defaultQueryBuilder(options.match)
    onDismiss.value = options.ignoreMatch
    onSubmit.value = options.deleteMatch
  }

  const handleLeave = () => {
    reference.value = null
    query.value = ''
    onDismiss.value = null
    onSubmit.value = null
  }

  const rule = new AutocompleteRule({
    regex,
    onEnter: handleEnter,
    onLeave: handleLeave,
  })
  const extension = defineAutocomplete(rule)
  return editor.use(extension)
}

function createKeymapHandler(
  handler: ReadonlySignal<VoidFunction | null>,
  enabled: ReadonlySignal<boolean>,
) {
  return () => {
    if (!enabled.value) {
      return false
    }

    const fn = handler.peek()
    if (!fn) return false
    fn()
    return true
  }
}

function useEscapeKeydown(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: () => boolean,
) {
  const keymap = { Escape: handler }
  const extension = withPriority(defineKeymap(keymap), Priority.highest)
  return useEditorExtension(host, editor, extension)
}
