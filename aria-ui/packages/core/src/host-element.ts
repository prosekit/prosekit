import { HTMLElement } from 'server-dom-shim'

import type { ReactiveController, ReactiveControllerHost } from './reactive-controller.ts'

export class HostElement extends HTMLElement implements ReactiveControllerHost {
  private _controllers: Set<ReactiveController> | undefined
  private _connected = false

  addController(controller: ReactiveController): void {
    const controllers = (this._controllers ??= new Set())
    if (controllers.has(controller)) {
      throw new Error('Controller is already added to the host')
    }
    controllers.add(controller)

    if (this._connected) {
      controller.hostConnected?.()
    }
  }

  removeController(controller: ReactiveController): void {
    this._controllers?.delete(controller)
  }

  connectedCallback(): void {
    this._connected = true
    const controllers = Array.from(this._controllers ?? [])
    controllers.forEach((c) => c.hostConnected?.())
  }

  disconnectedCallback(): void {
    this._connected = false
    const controllers = Array.from(this._controllers ?? [])
    controllers.forEach((c) => c.hostDisconnected?.())
  }
}
