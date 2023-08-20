<script lang="ts">
import { getExampleEditor } from './get-example-editor'

const editor = getExampleEditor()
const onToggleItalic = () => editor.commands.toggleItalic()
</script>

<button on:mousedown|preventDefault={onToggleItalic}>Toggle italic</button>
