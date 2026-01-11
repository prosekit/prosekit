import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { NodeJSON } from 'prosekit/core'
import {
  CommitRecorder,
  type Commit,
} from 'prosekit/extensions/commit'
import {
  createSignal,
  For,
  type JSX,
} from 'solid-js'

import EditorDiff from './editor-diff'
import EditorMain from './editor-main'

export default function Editor(): JSX.Element {
  const [commits, setCommits] = createSignal<
    { id: string; date: Date; commit: Commit }[]
  >([])
  const [key, setKey] = createSignal(0)
  const [initialContent, setInitialContent] = createSignal<NodeJSON | undefined>()
  const commitRecorder = new CommitRecorder()

  const handleCommit = () => {
    const commit = commitRecorder.commit()
    if (!commit) return
    const id = Math.random().toString(36).slice(2, 9)
    setCommits((commits) => [{ id, date: new Date(), commit }, ...commits])
  }

  const handleRestore = (id: string) => {
    const commitIndex = commits().findIndex((commit) => commit.id === id)
    const commit = commits()[commitIndex]
    if (commitIndex === -1 || !commit) return
    const doc = commit.commit.doc
    setInitialContent(doc)
    setCommits((commits) => commits.slice(commitIndex))
    setKey((key) => key + 1)
  }

  return (
    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-4">
        <div class="max-h-md">
          <For each={[key()]}>
            {() => (
              <EditorMain
                initialContent={initialContent()}
                commitRecorder={commitRecorder}
              />
            )}
          </For>
        </div>
        <button onClick={handleCommit} class="CSS_BUTTON_PRIMARY">
          Save
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <For each={commits()}>
          {(commit) => (
            <div>
              <div class="max-h-md">
                <EditorDiff commit={commit.commit} />
              </div>
              <div class="w-full inline-flex justify-between p-1 text-sm">
                <span class="opacity-50">{commit.date.toLocaleTimeString()}</span>
                <button
                  class="underline opacity-50 hover:opacity-100"
                  onClick={() => handleRestore(commit.id)}
                >
                  Restore
                </button>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
