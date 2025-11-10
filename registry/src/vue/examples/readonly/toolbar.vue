<script setup lang="ts">
import { Button } from '../../ui/button'

import { useReadonly } from './use-readonly'

const { readonly, setReadonly } = useReadonly()
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button :pressed="readonly" @click="setReadonly(true)">
      Readonly
    </Button>

    <Button :pressed="!readonly" @click="setReadonly(false)">
      Editable
    </Button>
  </div>
</template>
