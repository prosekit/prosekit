import { useState } from 'react'

import EditorComponent from './editor-component'

export default function Page() {
  const [room] = useState(() => {
    return Math.random().toString(36).substring(2, 15)
  })

  return (
    <div className="h-full flex flex-col gap-2">
      <EditorComponent room={room} />
      <EditorComponent room={room} />
    </div>
  )
}
