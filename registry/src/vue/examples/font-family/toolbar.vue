<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/vue'
import { onMounted } from 'vue'

import type { EditorExtension } from './extension'

const fonts = [
  { label: 'Arial', family: 'Arial, sans-serif' },
  { label: 'Times New Roman', family: 'Times New Roman, serif' },
  { label: 'Courier New', family: 'Courier New, monospace' },
  { label: 'Georgia', family: 'Georgia, serif' },
  { label: 'Verdana', family: 'Verdana, sans-serif' },
  { label: 'Comic Sans MS', family: 'Comic Sans MS, cursive' },
  { label: 'Impact', family: 'Impact, sans-serif' },
  { label: 'Inter', family: 'Inter, sans-serif', google: true },
  { label: 'Playfair Display', family: 'Playfair Display, serif', google: true },
  { label: 'Merriweather', family: 'Merriweather, serif', google: true },
]

function loadGoogleFonts() {
  const linkId = 'prosekit-google-fonts'
  if (document.getElementById(linkId)) return
  const link = document.createElement('link')
  link.id = linkId
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Merriweather:wght@400;700&family=Playfair+Display:wght@400;700&display=swap'
  document.head.appendChild(link)
}

function getToolbarState(editor: Editor<EditorExtension>) {
  let activeFont = ''
  for (const font of fonts) {
    if (editor.marks.fontFamily.isActive({ family: font.family })) {
      activeFont = font.family
      break
    }
  }

  const handleChange = (value: string) => {
    if (!value) {
      editor.commands.removeFontFamily()
      return
    }
    const font = fonts.find((f) => f.family === value)
    if (font?.google) {
      loadGoogleFonts()
    }
    editor.commands.addFontFamily({ family: value })
  }

  return { activeFont, handleChange }
}

const state = useEditorDerivedValue(getToolbarState)

onMounted(() => {
  loadGoogleFonts()
})
</script>

<template>
  <div class="CSS_TOOLBAR">
    <select
      :value="state.activeFont"
      @change="state.handleChange(($event.target as HTMLSelectElement).value)"
      class="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
    >
      <option value="">
        Default Font
      </option>
      <option
        v-for="font in fonts"
        :key="font.family"
        :value="font.family"
        :style="{ fontFamily: font.family }"
      >
        {{ font.label }}
      </option>
    </select>
  </div>
</template>
