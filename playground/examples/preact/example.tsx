import { Suspense } from 'preact/compat'

import { loaders } from './loaders.gen'

export function PreactExample({ story }: { story: string }) {
  const Example = loaders[story as keyof typeof loaders]
  return <Suspense fallback={<div />}>{Example ? <Example /> : null}</Suspense>
}
