import {
  assignProps,
  createSignal,
  mapSignals,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type Signal,
  type SingalState,
} from '@aria-ui/core'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { defineKeymap, type Editor } from '@prosekit/core'
import {
  AutocompleteRule,
  defineAutocomplete,
  type MatchHandler,
} from '@prosekit/extensions/autocomplete'

import { useEditorExtension } from '../../hooks/use-editor-extension'

import { onSubmitContext, queryContext } from './context-v2'
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

export function useAutocompletePopoverState(
  host: ConnectableElement,
  state: SingalState<AutocompletePopoverProps>,
) {
  const { editor, regex, ...overlayState } = state

  const reference = createSignal<Element | null>(null)
  const query = createSignal<string>('')
  const onDismiss = createSignal<VoidFunction | null>(null)
  const onSubmit = createSignal<VoidFunction | null>(null)

  queryContext.provide(host, query)
  onSubmitContext.provide(host, onSubmit)

  useEditorExtension(
    host,
    editor,
    defineKeymap({ Escape: createKeymapHandler(onDismiss) }),
  )

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
}

export function useAutocompleteExtension(
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

function createKeymapHandler(handler: ReadonlySignal<VoidFunction | null>) {
  return () => {
    const fn = handler.peek()
    if (!fn) return false
    fn()
    return true
  }
}
