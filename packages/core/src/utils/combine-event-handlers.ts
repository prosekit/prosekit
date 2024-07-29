import { toReversed } from './array'

export function combineEventHandlers<
  Handler extends (...args: any[]) => boolean | undefined,
  Args extends Parameters<Handler> = Parameters<Handler>,
>() {
  let _handlers: Handler[] = []

  function setHandlers(handlers: Handler[]): void {
    // The handlers at the end have a higher priority.
    _handlers = toReversed(handlers)
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
