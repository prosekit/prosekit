import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  useCallback,
  useMemo,
  useState,
} from 'preact/hooks'
import type { NodeJSON } from 'prosekit/core'
import {
  CommitRecorder,
  type Commit,
} from 'prosekit/extensions/commit'

import EditorDiff from './editor-diff'
import EditorMain from './editor-main'

export default function Editor() {
  const [commits, setCommits] = useState<
    { id: string; date: Date; commit: Commit }[]
  >([])
  const [key, setKey] = useState(0)
  const [defaultContent, setDefaultContent] = useState<NodeJSON | undefined>()
  const commitRecorder = useMemo(() => new CommitRecorder(), [])

  const handleCommit = useCallback(() => {
    const commit = commitRecorder.commit()
    if (!commit) return
    const id = Math.random().toString(36).slice(2, 9)
    setCommits((commits) => [{ id, date: new Date(), commit }, ...commits])
  }, [commitRecorder])

  const handleRestore = useCallback(
    (id: string) => {
      const index = commits.findIndex((commit) => commit.id === id)
      if (index === -1) return
      const doc = commits[index].commit.doc
      setDefaultContent(doc)
      setCommits((commits) => commits.slice(index))
      setKey((key) => key + 1)
    },
    [commits],
  )

  return (
    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-4">
        <div class="max-h-md">
          <EditorMain
            key={key}
            defaultContent={defaultContent}
            commitRecorder={commitRecorder}
          />
        </div>
        <button onClick={handleCommit} class="CSS_BUTTON_PRIMARY">
          Save
        </button>
      </div>
      <div class="flex flex-col gap-4">
        {commits.map((commit) => (
          <div key={commit.id}>
            <div class="max-h-md">
              <EditorDiff commit={commit.commit} />
            </div>
            <div class="w-full inline-flex justify-between p-1 text-sm">
              <span class="opacity-50">
                {commit.date.toLocaleTimeString()}
              </span>
              <button
                class="underline opacity-50 hover:opacity-100"
                onClick={() => handleRestore(commit.id)}
              >
                Restore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
