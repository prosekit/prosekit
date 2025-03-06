/// <reference types="astro/client" />

// This is a workaround to avoid type checking errors.
declare module 'astro:content' {
  export interface RenderResult {
    Content: {
      isAstroComponentFactory?: boolean
    }
  }
}
