---
layout: page
---

<script setup>
import { useData } from 'vitepress'
import { ExamplePlaygroundLazy } from '../components/example-playground-lazy'

const { params } = useData()
const preact = params.value.collection
const story = params.value.story
</script>

<ExamplePlaygroundLazy collection="preact" story="minimal" :expand="true" />
