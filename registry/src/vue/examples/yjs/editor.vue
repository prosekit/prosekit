<script setup lang="ts">
import { ref } from 'vue'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import EditorComponent from './editor-component.vue'

const room = ref(Math.random().toString(36).substring(2, 15))

const doc = new Y.Doc()
const provider = new WebsocketProvider(
  'wss://demos.yjs.dev/ws',
  `github.com/prosekit/room_${room.value}`,
  doc,
)
</script>

<template>
  <div class="h-full flex flex-col gap-2">
    <EditorComponent :doc="doc" :awareness="provider.awareness" />
    <EditorComponent :doc="doc" :awareness="provider.awareness" />
  </div>
</template>
