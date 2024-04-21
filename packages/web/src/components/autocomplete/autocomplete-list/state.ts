import {
  assignProps,
  createSignal,
  mapSignals,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { useListbox, type ListboxProps } from '@aria-ui/listbox'
import {
  Editor,
  Priority,
  defineDOMEventHandler,
  withPriority,
} from '@prosekit/core'

import { onSubmitContext, openContext, queryContext } from '../context'

import {
  defaultAutocompleteListProps,
  type AutocompleteListProps,
} from './props'

export function useAutocompleteList(
  element: ConnectableElement,
  props?: Partial<AutocompleteListProps>,
): SignalState<AutocompleteListProps> {
  const state = mapSignals(assignProps(defaultAutocompleteListProps, props))

  const open = openContext.consume(element)
  const query = queryContext.consume(element)
  const onSubmit = onSubmitContext.consume(element)

  const onKeydownHandlerAdd = useKeyboardHandler(element, open, state.editor)

  const {
    query: listboxQuery,
    value: listboxValue,
    autoFocus,
  } = useListbox(element, {
    onKeydownHandlerAdd,

    // This function will be called before `onSubmit()`.
    onValueChange: (value) => {
      if (value) {
        onSubmit.value?.()
      }
    },
  })

  useEffect(element, () => {
    listboxQuery.value = query.value
  })

  useEffect(element, () => {
    if (!open.value) {
      listboxValue.value = ''
    }
  })

  // Reset the focused item when the popover is closed or the query changes.
  useEffect(element, () => {
    if (!open.value) {
      autoFocus.value = false
    } else {
      query.value

      let canceled = false

      requestAnimationFrame(() => {
        if (canceled) return
        autoFocus.value = true

        setTimeout(() => {
          if (canceled) return
          autoFocus.value = false
        }, 40)
      })

      return () => {
        canceled = true
      }
    }
  })

  return state
}

function useKeyboardHandler(
  element: ConnectableElement,
  open: ReadonlySignal<boolean>,
  editor: ReadonlySignal<Editor | null>,
): ListboxProps['onKeydownHandlerAdd'] {
  const keydownHandler = createSignal<((event: KeyboardEvent) => void) | null>(
    null,
  )

  let disposeKeydownHandler: VoidFunction | null = null

  useEffect(element, () => {
    const editorValue = editor.value
    const keydownHandlerValue = keydownHandler.value

    if (!editorValue || !keydownHandlerValue) {
      return
    }

    const extension = defineDOMEventHandler(
      'keydown',
      (view, event): boolean => {
        if (view.composing || event.defaultPrevented || !open.value) {
          return false
        }
        keydownHandlerValue(event)
        return event.defaultPrevented
      },
    )

    disposeKeydownHandler?.()
    disposeKeydownHandler = editorValue.use(
      withPriority(extension, Priority.highest),
    )
  })

  return (keydownHandlerValue) => {
    keydownHandler.value = keydownHandlerValue
    return () => {
      disposeKeydownHandler?.()
      disposeKeydownHandler = null
    }
  }
}
