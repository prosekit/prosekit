export function combineEventHandlers<
  Handler extends (...args: any[]) => boolean | void,
  Args extends Parameters<Handler> = Parameters<Handler>,
>() {
  let _handlers: Handler[] = []

  function setHandlers(handlers: Handler[]): void {
    _handlers = handlers
  }

  function combinedEventHandler(...args: Args): boolean {
    for (const handler of _handlers) {
      if (handler(...args)) {
        return true
      }
    }
    return false
  }

  return [setHandlers, combinedEventHandler] as const
}
