---
layout: page
---

<script setup>
import { useData } from 'vitepress'
import { ExamplePlaygroundLazy } from '../components/example-playground-lazy'

const { params } = useData()
const example = params.value.example
</script>

<ExamplePlaygroundLazy :example="example" :expand="true" />
