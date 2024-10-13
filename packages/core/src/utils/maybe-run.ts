/**
 * @internal
 */
export function maybeRun<
  MaybeFn,
  Result = MaybeFn extends (...args: any[]) => void
    ? ReturnType<MaybeFn>
    : MaybeFn,
>(
  value: MaybeFn,
  ...args: MaybeFn extends (...args: any[]) => void
    ? Parameters<MaybeFn>
    : never
): Result {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return (typeof value === 'function' ? value(...args) : value) as Result
}
