'use client'

import type { ReactNodeViewProps } from 'prosekit/react'
import { Suspense } from 'react'

import { AsyncBlockViewContent, EmojiContent } from '../../sample/async-block-view-content.tsx'

function LocalFallback() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-xs text-amber-950">
      loading
    </span>
  )
}

export function AsyncBlockView(props: ReactNodeViewProps) {
  const seed = String(props.node.attrs.seed ?? 'seed-0')

  return (
    <AsyncBlockViewContent
      dataView="react"
      description="This version only works because the node view installs its own local Suspense boundary inside the portal subtree."
      emoji={(
        <Suspense fallback={<LocalFallback />}>
          <EmojiContent seed={seed} />
        </Suspense>
      )}
      label="`prosekit/react` node view"
      seed={seed}
      setSeed={(nextSeed) => {
        props.setAttrs({ seed: nextSeed })
      }}
      testId="react-suspense-view-button"
    />
  )
}
