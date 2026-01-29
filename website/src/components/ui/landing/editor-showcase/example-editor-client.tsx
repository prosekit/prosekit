/** @jsxImportSource react */

import { ExampleEditor } from 'prosekit-registry/react/examples/full'
import {
  useEffect,
  type FC,
} from 'react'

export const ExampleEditorClient: FC = () => {
  useEffect(() => {
    const fallback = document.getElementById('editor-fallback')
    const client = document.getElementById('editor-client')
    if (!fallback || !client) return

    client.classList.remove('opacity-0')

    fallback.addEventListener('transitionend', () => fallback.remove(), {
      once: true,
    })
  }, [])

  return <ExampleEditor />
}
