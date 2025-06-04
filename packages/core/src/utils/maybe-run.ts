import type { AnyFunction } from '../types/any-function'

/**
 * @internal
 */
function maybeRun<Fn extends AnyFunction>(fn: Fn, ...args: Parameters<Fn>): ReturnType<Fn>
function maybeRun<T>(value: T): T
function maybeRun(value: any, ...args: any[]): any {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return typeof value === 'function' ? value(...args) : value
}

export { maybeRun }
