import {
  createComputed,
  createSignal,
  useAnimationFrame,
  useAttribute,
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
import type { AutocompletePopoverProps } from './props'

export function useAutocompletePopover(
  host: ConnectableElement,
  state: SignalState<AutocompletePopoverProps>,
): void {
  const { editor, regex, ...overlayState } = state

  const reference = createSignal<Element | null>(null)
  const query = createSignal<string>('')
  const onDismiss = createSignal<VoidFunction | null>(null)
  const onSubmit = createSignal<VoidFunction | null>(null)
  const presence = createComputed(() => !!reference.get())

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

  useAttribute(host, 'data-state', () => (presence.get() ? 'open' : 'closed'))
  usePresence(host, presence)

  const firstRendering = useFirstRendering(host)

  useEffect(host, () => {
    const queryValue = query.get()

    if (!firstRendering.peek()) {
      state.onQueryChange.peek()?.(queryValue)
    }
  })

  useAnimationFrame(host, () => {
    const presenceValue = presence.get()
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
    const editorValue = editor.get()
    const regexValue = regex.get()

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
      reference.set(span)
    }

    query.set(defaultQueryBuilder(options.match))
    onDismiss.set(options.ignoreMatch)
    onSubmit.set(options.deleteMatch)
  }

  const handleLeave = () => {
    reference.set(null)
    query.set('')
    onDismiss.set(null)
    onSubmit.set(null)
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
    if (!enabled.get()) {
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
