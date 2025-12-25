<script setup lang="ts">
import {
  useEditorDerivedValue,
  type VueNodeViewProps,
} from 'prosekit/vue'

const props = defineProps<VueNodeViewProps>()

const docJSON = useEditorDerivedValue((editor) => {
  return JSON.stringify(editor.getDocJSON(), null, 2)
})
</script>

<template>
  <div data-atom-block="true" data-atom-block-view="true" class="bg-green-500/30">
    <div data-testid="atom-block-view-label">Atom Block View</div>
    <div data-testid="atom-block-view-pos">{{ props.getPos() }}</div>
    <div data-testid="atom-block-view-context">
      <pre>{{ docJSON }}</pre>
    </div>
  </div>
</template>
