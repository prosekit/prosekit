export function combineEventHandlers<
  Handler extends (...args: any[]) => boolean | void,
  Args extends Parameters<Handler> = Parameters<Handler>,
>(): [
  setHandlers: (eventHandlers: Handler[]) => void,
  combinedEventHandler: (...args: Args) => boolean,
] {
  let handlers: Handler[] = []

  function setHandlers(eventHandlers: Handler[]): void {
    handlers = eventHandlers
  }

  function combinedEventHandler(...args: Args): boolean {
    // The handlers at the end have a higher priority.
    for (let i = handlers.length - 1; i >= 0; i--) {
      if (handlers[i](...args)) {
        return true
      }
    }
    return false
  }

  return [setHandlers, combinedEventHandler] as const
}
