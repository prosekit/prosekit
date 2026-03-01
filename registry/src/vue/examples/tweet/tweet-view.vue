<script setup lang="ts">
import type { VueNodeViewProps } from 'prosekit/vue'
import Tweet from 'vue-tweet'

const props = defineProps<VueNodeViewProps>()

const tweetId = props.node.value.attrs.tweetId as string
</script>

<template>
  <div>
    <div>
      <strong>
        Rendered in Vue using library
        {{ ' ' }}
        <span>
          <a href="https://github.com/DannyFeliz/vue-tweet" target="_blank" rel="noopener noreferrer">vue-tweet</a>
        </span>
      </strong>
    </div>
    <Tweet :tweet-id="tweetId" />
  </div>
</template>
