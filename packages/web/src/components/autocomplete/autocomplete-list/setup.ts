import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SetupOptions,
  type TypedEventTarget,
} from '@aria-ui/core'
import {
  listboxProps,
  useListbox,
  type ListboxProps,
} from '@aria-ui/listbox/elements'
import {
  defineDOMEventHandler,
  Priority,
  withPriority,
  type Editor,
} from '@prosekit/core'

import { getStateWithDefaults } from '../../../utils/get-default-state'
import {
  onSubmitContext,
  openContext,
  queryContext,
} from '../context'

import type {
  AutocompleteListEvents,
  AutocompleteListProps,
} from './types'

export function useAutocompleteList(
  element: ConnectableElement,
  { state, emit }: SetupOptions<AutocompleteListProps, AutocompleteListEvents>,
): void {
  const open = openContext.consume(element)
  const query = queryContext.consume(element)
  const onSubmit = onSubmitContext.consume(element)

  const keydownTarget = useKeyDownTarget(element, open, state.editor)

  const listboxState = getStateWithDefaults<ListboxProps>(
    { filter: state.filter, eventTarget: createSignal(keydownTarget) },
    listboxProps,
  )

  useEffect(element, () => {
    element.addEventListener('valueChange', () => {
      if (onSubmit) {
        onSubmit.get()?.()
      }
    })
  })

  useListbox(element, { state: listboxState, emit })

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

  // The autocomplete list should not be focusable because the editor will get
  // the focus during typing.
  useEffect(element, () => {
    element.tabIndex = -1
  })
}

function useKeyDownTarget(
  element: ConnectableElement,
  open: ReadonlySignal<boolean>,
  editor: ReadonlySignal<Editor | null>,
): TypedEventTarget<'keydown'> {
  const keydownHandlers: ((event: KeyboardEvent) => void)[] = []

  useEffect(element, () => {
    const editorValue = editor.get()

    if (!editorValue) {
      return
    }

    const extension = defineDOMEventHandler(
      'keydown',
      (view, event): boolean => {
        if (view.composing || event.defaultPrevented || !open.get()) {
          return false
        }
        keydownHandlers.forEach((handler) => handler(event))
        return event.defaultPrevented
      },
    )

    return editorValue.use(withPriority(extension, Priority.highest))
  })

  return {
    addEventListener: (type, listener) => {
      if (type === 'keydown') {
        keydownHandlers.push(listener)
      }
    },
    removeEventListener: (type, listener) => {
      if (type === 'keydown') {
        const index = keydownHandlers.indexOf(listener)
        if (index !== -1) {
          keydownHandlers.splice(index, 1)
        }
      }
    },
  }
}
