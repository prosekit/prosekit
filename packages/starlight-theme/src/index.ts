import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { deepmerge } from 'deepmerge-ts'

const defaultConfig: StarlightUserConfig = {
  title: 'starlight-theme',

  components: {
    Header: '@prosekit/starlight-theme/components/Header.astro',
    Search: '@prosekit/starlight-theme/components/Search.astro',
    ThemeProvider: '@prosekit/starlight-theme/components/ThemeProvider.astro',
    ThemeSelect: '@prosekit/starlight-theme/components/ThemeSelect.astro',
    SocialIcons: '@prosekit/starlight-theme/components/SocialIcons.astro',
    SiteTitle: '@prosekit/starlight-theme/components/SiteTitle.astro',
    PageFrame: '@prosekit/starlight-theme/components/PageFrame.astro',
    MobileMenuToggle: '@prosekit/starlight-theme/components/MobileMenuToggle.astro',
    TwoColumnContent: '@prosekit/starlight-theme/components/TwoColumnContent.astro',
  },

  expressiveCode: {
    // Replace the default themes with a custom set of bundled themes:
    // "dracula" (a dark theme) and "solarized-light"
    themes: ['one-dark-pro', 'one-light', 'github-dark', 'github-light', 'github-dark-dimmed'],
    useStarlightUiThemeColors: false,
    styleOverrides: {
      borderRadius: '0.5rem',
      borderWidth: '1px',
      borderColor: 'var(--sl-color-gray-5)',
      frames: {
        tooltipSuccessBackground: 'var(--sl-color-gray-1)',
        tooltipSuccessForeground: 'var(--sl-color-black)',
        frameBoxShadowCssValue: 'none',
        terminalTitlebarBorderBottomColor: 'var(--sl-color-gray-5)',
      },
    },
  },
}

function StarlightIntegration(userConfig: StarlightUserConfig) {
  const merged: StarlightUserConfig = deepmerge(defaultConfig, userConfig)
  return starlight(merged)
}

export default StarlightIntegration
