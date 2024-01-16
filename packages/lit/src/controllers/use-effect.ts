import type { ReactiveControllerHost } from 'lit'

export function useEffect<T>(
  host: ReactiveControllerHost,
  getValue: () => T,
  onChange: (value: T) => void,
) {
  let value = getValue()

  const hostUpdated = () => {
    const v = getValue()
    if (v !== value) {
      value = v
      onChange(value)
    }
  }

  host.addController({ hostUpdated })
}
