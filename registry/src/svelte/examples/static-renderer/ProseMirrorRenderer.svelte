<script lang="ts">
import type { SvelteASTNode } from 'prosekit/static-renderer/svelte'

let { node }: { node: SvelteASTNode } = $props()
</script>

{#snippet renderNode(currentNode: SvelteASTNode)}
  {#if typeof currentNode === 'string'}
    {currentNode}
  {:else if currentNode && currentNode.tag}
    <svelte:element this={currentNode.tag} {...currentNode.props}>
      {#if currentNode.children}
        {#each currentNode.children as child}
          {@render renderNode(child)}
        {/each}
      {/if}
    </svelte:element>
  {/if}
{/snippet}

{@render renderNode(node)}
