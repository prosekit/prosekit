/** @jsxImportSource react */

import { clsx } from 'clsx/lite'
import { lazy, Suspense, useCallback, useEffect, useState, type FC } from 'react'

import { dynamicImportEditorModule } from './dynamic-import'
import { EditorFallback } from './editor-fallback'

// loading: fallback visible, editor loading in background
// ready: crossfading from fallback to editor
// complete: fallback unmounted, editor fully visible
type Phase = 'loading' | 'ready' | 'complete'

const LazyExampleEditor = lazy(() =>
  dynamicImportEditorModule().then((mod) => ({
    default: mod.ExampleEditor,
  }))
)

const EditorLoaded: FC<{ onReady: () => void }> = ({ onReady }) => {
  useEffect(onReady, [onReady])
  return <LazyExampleEditor />
}

export const ExampleEditorClient: FC<{ fallbackHTML: string }> = ({ fallbackHTML }) => {
  const [phase, setPhase] = useState<Phase>('loading')
  const handleReady = useCallback(() => setPhase('ready'), [])
  const handleComplete = useCallback(() => setPhase('complete'), [])
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative h-full">
      {phase !== 'complete' && (
        <div
          className={clsx(
            'absolute inset-0 transition-opacity duration-200 ease-linear',
            phase === 'loading' ? 'opacity-50' : 'opacity-0',
          )}
          onTransitionEnd={handleComplete}
        >
          <EditorFallback fallbackHTML={fallbackHTML} />
        </div>
      )}
      <div
        className={clsx(
          'absolute inset-0 transition-opacity duration-200 ease-linear',
          phase === 'loading' ? 'opacity-0' : 'opacity-100',
        )}
      >
        {mounted && (
          <Suspense>
            <EditorLoaded onReady={handleReady} />
          </Suspense>
        )}
      </div>
    </div>
  )
}
