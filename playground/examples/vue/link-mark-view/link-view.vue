<script lang="ts" setup>
import type { VueMarkViewProps } from 'prosekit/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

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

const props = defineProps<VueMarkViewProps>()

const color = ref(colors[0])
const href = computed(() => props.mark.value.attrs.href as string)

onMounted(() => {
  const interval = setInterval(() => {
    color.value = pickRandomColor()
  }, 1000)

  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <a
    :ref="contentRef"
    :href="href"
    :style="{ color: color, transition: 'color 1s ease-in-out' }"
  ></a>
</template>
