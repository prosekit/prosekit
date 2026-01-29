/** @jsxImportSource react */

import { clsx } from 'clsx/lite'
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
  type FC,
} from 'react'

import { EditorFallback } from './editor-fallback'

// loading: fallback visible, editor loading in background
// ready: crossfading from fallback to editor
// complete: fallback unmounted, editor fully visible
type Phase = 'loading' | 'ready' | 'complete'

const LazyExampleEditor = lazy(() =>
  import('prosekit-registry/react/examples/full').then((mod) => ({
    default: mod.ExampleEditor,
  }))
)

const EditorLoaded: FC<{ onReady: () => void }> = ({ onReady }) => {
  useEffect(onReady, [onReady])
  return <LazyExampleEditor />
}

export const ExampleEditorClient: FC = () => {
  const [phase, setPhase] = useState<Phase>('loading')
  const handleReady = useCallback(() => setPhase('ready'), [])
  const handleComplete = useCallback(() => setPhase('complete'), [])

  return (
    <div className="relative h-full">
      {phase !== 'complete' && (
        <div
          className={clsx('absolute inset-0 transition-opacity duration-300', phase === 'ready' && 'opacity-0')}
          onTransitionEnd={handleComplete}
        >
          <EditorFallback />
        </div>
      )}
      <div
        className={clsx('absolute inset-0 transition-opacity duration-300', phase === 'loading' && 'opacity-0')}
      >
        <Suspense>
          <EditorLoaded onReady={handleReady} />
        </Suspense>
      </div>
    </div>
  )
}
