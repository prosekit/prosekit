# Installation

ProseKit Components are styled using [Tailwind CSS](https://tailwindcss.com/) or [UnoCSS](https://unocss.dev/). Pick the one that you like.

## Tailwind CSS

1. **Add Tailwind CSS**

   Install Tailwind CSS following the [official guide](https://tailwindcss.com/docs/installation).

2. **Add dependencies**

   ```shell
   npm install prosekit tailwindcss-animate @egoist/tailwindcss-icons @iconify-json/lucide
   ```

3. **Configure `tailwind.config.js`**

   Add the following plugins to your Tailwind CSS config.

   <!-- prettier-ignore -->
   ```js
   const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons') // [!code highlight]
   const animate = require('tailwindcss-animate') // [!code highlight]

   /** @type {import('tailwindcss').Config} */
   module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}'],
     plugins: [
       iconsPlugin({ collections: getIconCollections(['lucide']) }), // [!code highlight]
       animate, // [!code highlight]
     ],
   }
   ```

4. **That's it**

   You can now start [adding the editor](/components/editor) to your project.

## UnoCSS

1. **Add UnoCSS**

   Install UnoCSS following the [official guide](https://unocss.dev/integrations/).

2. **Add dependencies**

   ```shell
   npm install prosekit unocss-preset-animations @iconify-json/lucide
   ```

3. **Configure `unocss.config.ts`**

   Add the following presets to your UnoCSS config.

   ```ts
   import { defineConfig, presetIcons, presetWind } from 'unocss'
   import { presetAnimations } from 'unocss-preset-animations'

   export default defineConfig({
     presets: [presetIcons(), presetWind(), presetAnimations()], // [!code highlight]
   })
   ```

4. **That's it**

   You can now start [adding the editor](/components/editor) to your project.
