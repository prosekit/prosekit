'use client'

import type { ReactMarkViewProps } from '@prosekit/react-binding'
import type { ReactNode } from 'react'

type LinkViewProps = ReactMarkViewProps & {
  children?: ReactNode
}

export function LinkView(props: LinkViewProps) {
  const href = String(props.mark.attrs.href ?? '')

  return (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="underline underline-offset-4"
    >
      {props.children}
    </a>
  )
}
