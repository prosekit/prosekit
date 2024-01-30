---
# https://vitepress.dev/reference/default-theme-home-page

layout: home

hero:
  name: ProseKit
  text: Ultimate Rich Text Editor
  tagline: Headless and Framework Agnostic WYSIWYG Editor Toolkit for the Web.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/get-started
    - theme: alt
      text: Explore Examples
      link: /examples
  image:
    src: /assets/logo.svg

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

<style>
.VPHero.has-image * {
  text-wrap: balance;
}

.VPHero.has-image .main .name {
  max-width: 100%;
}

.VPHero.has-image .main .text {
  max-width: 100%;
}

.VPHero.has-image .main .tagline {
  max-width: 100%;
}

@media (min-width: 960px) {
  .VPHero.has-image .text {
    font-size: 50px;
  }

  .VPHero.has-image .VPImage {
    max-width: 100%;
    max-height: 100%;
    height: 300px;
    padding-left: 32px;
  }

  .VPHero.has-image .image-container {
    transform: translate(0px, -32px);
  }
}
</style>
