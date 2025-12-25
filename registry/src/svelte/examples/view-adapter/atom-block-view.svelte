<script lang="ts">
import {
  useEditorDerivedValue,
  type SvelteNodeViewProps,
} from 'prosekit/svelte'

const props: SvelteNodeViewProps = $props()

const docJSON = useEditorDerivedValue((editor) => {
  return JSON.stringify(editor.getDocJSON(), null, 2)
})
</script>

<div data-atom-block="true" data-atom-block-view="true" class="bg-green-500/30">
  <div data-testid="atom-block-view-label">Atom Block View</div>
  <div data-testid="atom-block-view-pos">{props.getPos()}</div>
  <div data-testid="atom-block-view-context">
    <pre>{$docJSON}</pre>
  </div>
</div>
