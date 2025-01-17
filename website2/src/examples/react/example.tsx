import { Suspense } from 'react'

import { loaders } from './loaders.gen'

export function ReactExample({ story }: { story: string }) {
  const Example = loaders[story as keyof typeof loaders]
  return <Suspense fallback={<div />}>{Example ? <Example /> : null}</Suspense>
}
