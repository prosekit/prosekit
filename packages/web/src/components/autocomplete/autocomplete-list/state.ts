import {
  createSignal,
  mapSignals,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import {
  defaultListboxProps,
  useListbox,
  type ListboxProps,
} from '@aria-ui/listbox'
import {
  Editor,
  Priority,
  defineDOMEventHandler,
  withPriority,
} from '@prosekit/core'

import { omit } from '../../../utils/omit'
import { onSubmitContext, openContext, queryContext } from '../context'

import { type AutocompleteListProps } from './props'

export function useAutocompleteList(
  element: ConnectableElement,
  state: SignalState<AutocompleteListProps>,
): void {
  const open = openContext.consume(element)
  const query = queryContext.consume(element)
  const onSubmit = onSubmitContext.consume(element)

  const onKeydownHandlerAdd = useKeyboardHandler(element, open, state.editor)

  const onValueChange = (value: string) => {
    if (value) {
      onSubmit.peek()?.()
    }
  }

  const listboxState: SignalState<ListboxProps> = {
    ...mapSignals({
      ...omit(defaultListboxProps, ['filter']),
      onKeydownHandlerAdd,
      onValueChange,
    }),
    filter: state.filter,
  }

  useListbox(element, listboxState)

  useEffect(element, () => {
    listboxState.query.set(query.get())
  })

  useEffect(element, () => {
    if (!open.get()) {
      listboxState.value.set('')
      query.set('')
    }
  })

  // Reset the focused item when the popover is open
  useEffect(element, () => {
    if (!open.get()) {
      listboxState.autoFocus.set(false)
    } else {
      let canceled = false

      requestAnimationFrame(() => {
        if (canceled) return
        listboxState.autoFocus.set(true)
      })

      return () => {
        canceled = true
      }
    }
  })

  // The autocomplet list should not be focusable because the editor will get
  // the focus during typing.
  useEffect(element, () => {
    element.tabIndex = -1
  })
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
    const editorValue = editor.get()
    const keydownHandlerValue = keydownHandler.get()

    if (!editorValue || !keydownHandlerValue) {
      return
    }

    const extension = defineDOMEventHandler(
      'keydown',
      (view, event): boolean => {
        if (view.composing || event.defaultPrevented || !open.get()) {
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
    keydownHandler.set(keydownHandlerValue)
    return () => {
      disposeKeydownHandler?.()
      disposeKeydownHandler = null
    }
  }
}
