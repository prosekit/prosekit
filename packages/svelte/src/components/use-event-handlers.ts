export function useEventHandlers(
  element: HTMLElement,
  eventHandlers: Record<string, (...args: any[]) => any>,
) {
  const disposes: VoidFunction[] = []

  const update = (eventHandlers: Record<string, (...args: any[]) => any>) => {
    disposes.forEach((dispose) => dispose())
    disposes.length = 0
    for (const [name, handler] of Object.entries(eventHandlers)) {
      element.addEventListener(name, handler)
      disposes.push(() => element.removeEventListener(name, handler))
    }
  }

  update(eventHandlers)

  return {
    update(eventHandlers: Record<string, (...args: any[]) => any>): void {
      update(eventHandlers)
    },
    destroy(): void {
      update({})
    },
  }
}
