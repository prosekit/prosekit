---
# https://vitepress.dev/reference/default-theme-home-page

layout: home

hero:
  name: ProseKit
  text: The Ultimate Toolkit for Text Editing
  tagline: A Flexible and Modular Rich-Text Solutions for Modern Web.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Explore Examples
      link: /examples

features:
  - title: Framework Agnostic
    details: Enjoy seamless support for React, Vue, Svelte, Solid, Lit and vanilla JS.
  - title: Composable
    details: Create your custom editor with desired extensions, effortlessly overriding any behavior.
  - title: Plug-and-Play
    details: Unstyled components for rapid integration and smooth user experience.
  - title: Flexible
    details: Adapt the editor to your unique needs with an intuitive API.
---

<script setup>
import { DemoEditor } from './components/demo-editor-dynamic'
</script>

<DemoEditor />
