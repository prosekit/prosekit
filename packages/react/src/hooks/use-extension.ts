import { type Extension } from '@prosekit/core'
import { useEffect, useMemo } from 'react'

import { extractReactExtension } from '../extensions/react-extension'

import { useEditor } from './use-editor'
import { useReactPayload } from './use-react-payload'

interface UseExtensionProps<T extends Extension = Extension> {
  extension: T
}

export function useExtension({ extension }: UseExtensionProps) {
  const payload = useMemo(() => {
    const reactExtensions = extractReactExtension(extension)
    const reactOptions = reactExtensions.map((extension) => extension.options)
    const payloadObject: Record<string, unknown[]> = {}

    for (const { type, payload } of reactOptions) {
      ;(payloadObject[type] ??= []).push(payload)
    }

    return payloadObject
  }, [extension])

  useReactPayload(payload)

  const editor = useEditor()

  useEffect(() => {
    return editor.use(extension)
  }, [editor, extension])
}
