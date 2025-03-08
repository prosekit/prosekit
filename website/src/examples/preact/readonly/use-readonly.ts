import {
  useMemo,
  useState,
} from 'preact/hooks'
import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/preact'

export function useReadonly() {
  const [readonly, setReadonly] = useState(true)

  const extension = useMemo(() => {
    return readonly ? defineReadonly() : null
  }, [readonly])
  useExtension(extension)

  return { readonly, setReadonly }
}
