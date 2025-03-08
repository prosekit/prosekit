import React from 'react'

import Editor from '../../../examples/react/full/editor'

export const EditorShowcaseClient: React.FC = () => {
  return (
    <div className="size-full [&>*>*]:animate-in [&>*>*]:fade-in">
      <Editor />
    </div>
  )
}
