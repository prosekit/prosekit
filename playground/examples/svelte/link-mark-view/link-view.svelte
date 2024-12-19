<script lang="ts">
import type { SvelteMarkViewProps } from 'prosekit/svelte'

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

let color = colors[0]
let interval: ReturnType<typeof setInterval>

export let mark: SvelteMarkViewProps['mark']
export let contentRef: SvelteMarkViewProps['contentRef']

const href = mark.attrs.href as string

$: {
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => {
    color = pickRandomColor()
  }, 1000)
}

onDestroy(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<a
  {href}
  bind:this={contentRef}
  style="color: {color}; transition: color 1s ease-in-out"
></a>
