<script lang="ts">
import EditorComponent from './editor-component.svelte'

let nextKey = $state(1)
let editorKeys = $state<number[]>([])

function addEditor() {
  const key = nextKey
  nextKey += 1
  editorKeys = [...editorKeys, key]
}

function removeEditor(key: number) {
  editorKeys = editorKeys.filter((k) => k !== key)
}
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2">
    <button class="border p-2" onclick={addEditor}>
      Add editor
    </button>
    {#each editorKeys as key (key)}
      <button
        class="border p-2"
        onclick={() => removeEditor(key)}
      >
        Unmount No.{key}
      </button>
    {/each}
  </div>
  {#each editorKeys as key (key)}
    <div>
      <EditorComponent placeholder={`Editor No.${key}`} />
    </div>
  {/each}
</div>
