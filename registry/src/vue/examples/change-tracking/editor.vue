<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { NodeJSON } from 'prosekit/core'
import { CommitRecorder, type Commit } from 'prosekit/extensions/commit'
import { ref } from 'vue'

import EditorDiff from './editor-diff.vue'
import EditorMain from './editor-main.vue'

const commits = ref<{ id: string; date: Date; commit: Commit }[]>([])
const key = ref(0)
const initialContent = ref<NodeJSON | undefined>()
const commitRecorder = new CommitRecorder()

function handleCommit() {
  const commit = commitRecorder.commit()
  if (!commit) return
  const id = Math.random().toString(36).slice(2, 9)
  commits.value = [{ id, date: new Date(), commit }, ...commits.value]
}

function handleRestore(id: string) {
  const index = commits.value.findIndex((commit) => commit.id === id)
  const commit = commits.value[index]
  if (index === -1 || !commit) return
  const doc = commit.commit.doc
  initialContent.value = doc
  commits.value = commits.value.slice(index)
  key.value = key.value + 1
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <div class="flex flex-col gap-4">
      <div class="max-h-md">
        <EditorMain
          :key="key"
          :initial-content="initialContent"
          :commit-recorder="commitRecorder"
        />
      </div>
      <button class="CSS_BUTTON_PRIMARY" @click="handleCommit">
        Save
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="commit in commits" :key="commit.id">
        <div class="max-h-md">
          <EditorDiff :commit="commit.commit" />
        </div>
        <div class="w-full inline-flex justify-between p-1 text-sm">
          <span class="opacity-50">
            {{ commit.date.toLocaleTimeString() }}
          </span>
          <button
            class="underline opacity-50 hover:opacity-100"
            @click="() => handleRestore(commit.id)"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
