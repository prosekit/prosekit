import { toReversed } from './array'

export function combineEventHandlers<
  Handler extends (...args: any[]) => boolean | void,
  Args extends Parameters<Handler> = Parameters<Handler>,
>() {
  let handlers: Handler[] = []

  function setHandlers(eventHandlers: Handler[]): void {
    // The handlers at the end have a higher priority.
    handlers = toReversed(eventHandlers)
  }

  function combinedEventHandler(...args: Args): boolean {
    for (const handler of handlers) {
      if (handler(...args)) {
        return true
      }
    }
    return false
  }

  return [setHandlers, combinedEventHandler] as const
}
