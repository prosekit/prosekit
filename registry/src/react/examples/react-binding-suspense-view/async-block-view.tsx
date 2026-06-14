'use client'

import type { ReactNodeViewProps } from '@prosekit/react-binding'

import { AsyncBlockViewContent, EmojiContent } from '../../sample/async-block-view-content.tsx'

export function AsyncBlockView(props: ReactNodeViewProps) {
  const seed = String(props.node.attrs.seed ?? 'seed-0')

  return (
    <AsyncBlockViewContent
      dataView="react-binding"
      description="This atom suspends for 800ms the first time each seed is rendered, and the editor-level Suspense boundary catches it."
      domProps={props.domProps}
      emoji={<EmojiContent seed={seed} />}
      label="`react-binding` node view"
      seed={seed}
      setSeed={(nextSeed) => {
        props.setAttrs({ seed: nextSeed })
      }}
      testId="react-binding-suspense-view-button"
      viewRef={props.viewRef}
    />
  )
}
