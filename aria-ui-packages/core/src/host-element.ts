import { HTMLElement } from 'server-dom-shim'

import type { ReactiveController, ReactiveControllerHost } from './reactive-controller.ts'

export class HostElement extends HTMLElement implements ReactiveControllerHost {
  private _controllers: Set<ReactiveController> | undefined

  addController(controller: ReactiveController): void {
    const controllers = (this._controllers ??= new Set())
    controllers.add(controller)

    if (this.isConnected) {
      controller.hostConnected?.()
    }
  }

  removeController(controller: ReactiveController): void {
    this._controllers?.delete(controller)
  }

  connectedCallback(): void {
    const controllers = Array.from(this._controllers ?? [])
    controllers.forEach((c) => c.hostConnected?.())
  }

  disconnectedCallback(): void {
    const controllers = Array.from(this._controllers ?? [])
    controllers.forEach((c) => c.hostDisconnected?.())
  }
}
