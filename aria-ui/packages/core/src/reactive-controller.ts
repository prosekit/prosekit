export interface ReactiveControllerHost {
  addController(controller: ReactiveController): void
  removeController(controller: ReactiveController): void
}

export interface ReactiveController {
  hostConnected?(): void
  hostDisconnected?(): void
}
