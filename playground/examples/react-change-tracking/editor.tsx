import 'prosekit/basic/style.css'
import './style.css'

import { Themes } from '@prosekit/themes'
import { useCallback, useMemo, useState } from 'react'

import { CommitRecorder, type Commit } from './commit'
import EditorDiff from './editor-diff'
import EditorMain from './editor-main'

export default function Editor() {
  const [commits, setCommits] = useState<
    { id: string; date: Date; commit: Commit }[]
  >([])
  const commitRecorder = useMemo(() => new CommitRecorder(), [])
  const handleCommit = useCallback(() => {
    const commit = commitRecorder.commit()
    if (!commit) {
      return
    }
    const id = Math.random().toString(36).slice(2, 9)
    setCommits((prev) => [{ id, date: new Date(), commit }, ...prev])
  }, [commitRecorder])

  return (
    <div className="flex flex-col gap-4">
      <div className="max-h-md">
        <EditorMain commitRecorder={commitRecorder} />
      </div>
      <button onClick={handleCommit} className={Themes.TOGGLE_BUTTON}>
        Commit
      </button>
      {commits.map((commit) => (
        <div key={commit.id}>
          <div>{commit.date.toLocaleTimeString()}</div>
          <div className="max-h-md">
            <EditorDiff commit={commit.commit} />
          </div>
        </div>
      ))}
    </div>
  )
}
