<script setup lang="ts">
import type { VueMarkViewProps } from 'prosekit/vue'
import { onBeforeUnmount, ref } from 'vue'

const props = defineProps<VueMarkViewProps>()

const colors = [
  '#f06292',
  '#ba68c8',
  '#9575cd',
  '#7986cb',
  '#64b5f6',
  '#4fc3f7',
  '#4dd0e1',
  '#4db6ac',
  '#81c784',
  '#aed581',
  '#ffb74d',
  '#ffa726',
  '#ff8a65',
  '#d4e157',
  '#ffd54f',
  '#ffecb3',
]

function pickRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

const color = ref(colors[0])
const href = props.mark.value.attrs.href as string

const interval = setInterval(() => {
  color.value = pickRandomColor()
}, 1000)

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <a
    :ref="props.contentRef"
    :href="href"
    :style="{ color: color, transition: 'color 1s ease-in-out' }"
  >
  </a>
</template>
