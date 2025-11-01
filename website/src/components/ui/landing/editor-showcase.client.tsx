import { ExampleEditor } from 'prosekit-registry/react/examples/full'
import React from 'react'

export const EditorShowcaseClient: React.FC = () => {
  return (
    <div className="size-full [&>*>*]:animate-in [&>*>*]:fade-in">
      <ExampleEditor />
    </div>
  )
}
