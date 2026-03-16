import { getDocumentElement, getEventTarget } from '@zag-js/dom-query'

import type { HostElement } from './host-element.ts'
import type { ReactiveController } from './reactive-controller.ts'
import { createSignal, type Signal } from './signal.ts'

type ContextCallback<T> = (value: T) => void

class ContextRequestEvent<T> extends Event {
  public constructor(
    public readonly key: string | symbol,
    public readonly callback: ContextCallback<T>,
  ) {
    super('aria-ui:context-request', { bubbles: true, composed: true })
  }
}

class ContextProviderEvent extends Event {
  constructor(public readonly key: string | symbol) {
    super('aria-ui:context-provider', { bubbles: true, composed: true })
  }
}

declare global {
  interface HTMLElementEventMap {
    'aria-ui:context-request': ContextRequestEvent<unknown>
    'aria-ui:context-provider': ContextProviderEvent
  }
}

/**
 * A context is a way to provide and consume signals in a HTML tree.
 *
 * @group Contexts
 */
export interface Context<T> {
  /**
   * Provides a signal to all children of the element.
   */
  provide(element: HTMLElement, value: T): void

  /**
   * Receives the signal from a parent element.
   */
  consume(element: HTMLElement): () => T | undefined
}

class ContextImpl<T> implements Context<T> {
  public constructor(private readonly key: string | symbol) {
    this.provide = this.provide.bind(this)
    this.consume = this.consume.bind(this)
  }

  public provide(element: HostElement, value: T): void {
    const consumers = new Map<ContextCallback<unknown>, EventTarget>()

    const handleRequest = (event: ContextRequestEvent<unknown>) => {
      if (event.key !== this.key) return

      const consumer = getEventTarget(event)

      if (
        // Don't consume the event if it's dispatched from the same element.
        element === consumer
        || consumers.has(event.callback)
        || !consumer
      ) {
        return
      }

      event.stopPropagation()
      event.callback(value)
      consumers.set(event.callback, consumer)
    }

    /**
     * When we get a provider request event, that means a child of this element
     * has just woken up. If it's a provider of our context, then we may need to
     * re-parent our subscriptions, because is a more specific provider than us
     * for its subtree.
     */
    const handleProvider = (event: ContextProviderEvent) => {
      if (event.key !== this.key) return

      const provider = getEventTarget(event)

      if (!provider) {
        return
      }

      if (
        // Don't consume the event if it's dispatched from the same element.
        element === provider
      ) {
        return
      }

      event.stopPropagation()

      // Re-parent all of our subscriptions in case this new child provider
      // should take them over.
      const previousConsumers = Array.from(consumers.entries())
      consumers.clear()

      for (const [callback, consumer] of previousConsumers) {
        consumer.dispatchEvent(new ContextRequestEvent<T>(this.key, callback))
      }
    }

    const controller: ReactiveController = {
      hostConnected: () => {
        ensureAttachRoot(getDocumentElement(element))
        element.addEventListener('aria-ui:context-request', handleRequest)
        element.addEventListener('aria-ui:context-provider', handleProvider)
        element.dispatchEvent(new ContextProviderEvent(this.key))
      },
      hostDisconnected: () => {
        element.removeEventListener('aria-ui:context-request', handleRequest)
        element.removeEventListener('aria-ui:context-provider', handleProvider)
      },
    }

    element.addController(controller)
  }

  public consume(element: HostElement): () => T | undefined {
    const controller = new ConsumerController<T>(this.key, element)
    element.addController(controller)
    return () => controller.signal.get()
  }
}

class ConsumerController<T> implements ReactiveController {
  readonly signal: Signal<T | undefined>

  // `onRequest` is a class property. This ensures that this callback won't be
  // garbage collected before the controller is garbage collected.
  private readonly onRequest: (value: T) => void = (value: T) => {
    this.signal.set(value)
  }

  public constructor(
    private readonly key: string | symbol,
    private host: HostElement,
  ) {
    this.signal = createSignal<T | undefined>(undefined)
    this.onRequest = (value: T) => this.signal.set(value)
  }

  hostConnected() {
    ensureAttachRoot(getDocumentElement(this.host))

    this.host.dispatchEvent(new ContextRequestEvent(this.key, this.onRequest))
  }
}

/**
 * Creates a new context.
 *
 * @param key The key to use for the context.
 * @param defaultValue The default value to return if the signal is not provided.
 *
 * @group Contexts
 */
export function createContext<T>(key: string | symbol): Context<T> {
  return new ContextImpl<T>(
    typeof key === 'string' ? `aria-ui:context:${key}` : key,
  )
}

const attachedRoots = new WeakSet<HTMLElement>()

function ensureAttachRoot(root: HTMLElement) {
  if (attachedRoots.has(root)) {
    return
  }

  attachedRoots.add(root)
  attachRoot(root)
}

/**
 * Gathers unsatisfied context requests and re-dispatch them when new providers
 * which satisfy matching context keys are available.
 *
 * This allows providers to be added to a DOM tree, or upgraded, after the
 * consumers.
 */
function attachRoot(element: HTMLElement) {
  interface PendingRequests {
    callbacks: WeakMap<HTMLElement, WeakSet<ContextCallback<unknown>>>
    requests: Array<{
      elementRef: WeakRef<HTMLElement>
      callbackRef: WeakRef<ContextCallback<unknown>>
    }>
  }

  const store = new Map<string | symbol, PendingRequests>()

  const popPendingRequests = (key: string | symbol): PendingRequests | void => {
    const pendingRequestData = store.get(key)
    if (pendingRequestData === undefined) {
      return
    }
    store.delete(key)
    return pendingRequestData
  }

  const getPendingRequests = (key: string | symbol): PendingRequests => {
    let pendingRequestData = store.get(key)
    if (pendingRequestData === undefined) {
      pendingRequestData = {
        callbacks: new WeakMap(),
        requests: [],
      }
      store.set(key, pendingRequestData)
    }
    return pendingRequestData
  }

  const onContextProvider = (event: ContextProviderEvent) => {
    const pendingRequestData = popPendingRequests(event.key)
    if (pendingRequestData === undefined) {
      // No pending requests for this context at this time

      return
    }

    // Loop over all pending requests and re-dispatch them from their source
    const { requests } = pendingRequestData
    for (const { elementRef, callbackRef } of requests) {
      const element = elementRef.deref()
      const callback = callbackRef.deref()

      if (element === undefined) {
        continue
      }
      if (callback === undefined) {
        continue
      }

      // Re-dispatch if we still have the element and callback

      element.dispatchEvent(new ContextRequestEvent(event.key, callback))
    }
  }

  const onContextRequest = (event: ContextRequestEvent<unknown>) => {
    const element = getEventTarget<HTMLElement>(event)
    if (!element) {
      return
    }

    const callback = event.callback

    const pendingRequestData = getPendingRequests(event.key)

    let callbacks = pendingRequestData.callbacks.get(element)
    if (callbacks === undefined) {
      callbacks = new WeakSet()
      pendingRequestData.callbacks.set(element, callbacks)
    }

    if (callbacks.has(callback)) {
      // We're already tracking this element/callback pair
      return
    }

    callbacks.add(callback)
    pendingRequestData.requests.push({
      elementRef: new WeakRef(element),
      callbackRef: new WeakRef(callback),
    })
  }

  element.addEventListener('aria-ui:context-request', onContextRequest)
  element.addEventListener('aria-ui:context-provider', onContextProvider)
}
