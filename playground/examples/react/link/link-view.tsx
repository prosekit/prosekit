import type { LinkAttrs } from 'prosekit/extensions/link'
import type { ReactMarkViewProps } from 'prosekit/react'

export default function LinkView(props: ReactMarkViewProps) {
  const attrs = props.mark.attrs as LinkAttrs
  const href = attrs.href

  return (
    <span className="border border-red-500 p-2">
      <a href={href} className="border border-blue-500 p-1">
        <span
          className="border border-yellow-500 p-0"
          ref={props.contentRef}
        ></span>
      </a>
    </span>
  )
}
